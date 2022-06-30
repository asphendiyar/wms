import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import { RiFileExcel2Line } from "react-icons/ri"
import { Column } from "react-table"
import {
  appColors,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllMeasureUnitsAction,
  getDetailedMeasureUnitsAction,
} from "../../app/reducers/measure-units/actions"
import { selectMeasureUnitsList } from "../../app/reducers/measure-units/selectors"
import {
  MeasureUnitEnums,
  MeasureUnitsContentType,
} from "../../app/reducers/measure-units/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { LoadingIcon } from "../Common/LoadingIcon"
import Modal from "../Common/Modal"
import {
  ActionGroupWrapper,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"
import { MeasureUnitsForm } from "./MeasureUnitsForm"

export const tableColumns: Array<Column<MeasureUnitsContentType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.created_date"),
    accessor: "created_date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.updated_date"),
    accessor: "updated_date",
    Cell: (row) => normalizeDate(row.value),
  },
]

const MeasureUnit: React.FC = () => {
  const isMeasureUnitsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, MeasureUnitEnums.getAllMeasureUnits)
  )
  const isDetailedMeasureUnitsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, MeasureUnitEnums.getDetailedMeasureUnits)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, MeasureUnitEnums.getAllMeasureUnits)
  )
  const isFetchingPostMeasureUnit = useAppSelector((state) =>
    namedRequestsInProgress(state, MeasureUnitEnums.postMeasureUnits)
  )
  const fetchErrorPostMeasureUnit = useAppSelector((state) =>
    namedRequestError(state, MeasureUnitEnums.postMeasureUnits)
  )
  const isFetchingPutMeasureUnit = useAppSelector((state) =>
    namedRequestsInProgress(state, MeasureUnitEnums.putMeasureUnits)
  )
  const fetchErrorPutMeasureUnit = useAppSelector((state) =>
    namedRequestError(state, MeasureUnitEnums.putMeasureUnits)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [query, setQuery] = useState<string>(EmptyString)

  let data = useAppSelector(selectMeasureUnitsList)

  data = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  const handleClickRow = (args: MeasureUnitsContentType) => {
    dispatch(getDetailedMeasureUnitsAction(args.code))
    setSelectedRow(args.code)
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostMeasureUnit === "success" ||
      isFetchingPutMeasureUnit === "success"
    ) {
      dispatch(getAllMeasureUnitsAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostMeasureUnit === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(MeasureUnitEnums.postMeasureUnits))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutMeasureUnit === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(MeasureUnitEnums.putMeasureUnits))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostMeasureUnit === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostMeasureUnit?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(MeasureUnitEnums.postMeasureUnits))
          },
        },
      ])
    if (isFetchingPutMeasureUnit === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutMeasureUnit?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(MeasureUnitEnums.putMeasureUnits))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostMeasureUnit,
    fetchErrorPutMeasureUnit,
    isFetchingPostMeasureUnit,
    isFetchingPutMeasureUnit,
  ])
  useEffect(() => {
    dispatch(getAllMeasureUnitsAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <Modal
        open={createModal}
        title={`${!editMode ? t("buttons.new") : t("buttons.edit")}`}
        onClose={handleCloseFormModal}
        className={"side"}
      >
        {isDetailedMeasureUnitsFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <MeasureUnitsForm
            onClose={handleCloseFormModal}
            editMode={editMode}
          />
        )}
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByCode")}
            type={"text"}
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          <IconButton
            onClick={() => {
              setCreateModal(true)
              setEditMode(false)
            }}
            popupText={t("buttons.new")}
          >
            <AiOutlinePlus />
          </IconButton>
          <IconButton
            onClick={() => {
              if (selectedRow) {
                dispatch(getDetailedMeasureUnitsAction(selectedRow))
                setCreateModal(true)
                setEditMode(true)
              } else
                setAlertList([
                  ...alertList,
                  {
                    id: randomNumberIdGenerator(),
                    title: t("alerts.warning"),
                    message: t("alerts.warningMessage"),
                    icon: AiOutlineWarning,
                    bgColor: appColors.warning,
                  },
                ])
            }}
            popupText={t("buttons.edit")}
          >
            <AiOutlineEdit />
          </IconButton>
          <IconButton onClick={() => null} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      {isMeasureUnitsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<MeasureUnitsContentType>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"code"}
              columnIndex={1}
            />
          </TableWrapper>
        </>
      )}
    </>
  )
}

export default MeasureUnit
