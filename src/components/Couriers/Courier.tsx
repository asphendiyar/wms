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
  checkPrivilege,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllCouriersAction,
  getDetailedCouriersAction,
  getSearchAllCouriersAction,
} from "../../app/reducers/couriers/actions"
import {
  selectCouriers,
  selectCouriersList,
} from "../../app/reducers/couriers/selectors"
import {
  CourierEnums,
  CouriersTableData,
} from "../../app/reducers/couriers/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { LoadingIcon } from "../Common/LoadingIcon"
import Modal from "../Common/Modal"
import {
  ActionGroupWrapper,
  MoreButton,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"
import { CouriersForm } from "./CouriersForm"
import Details from "./Details"

export const tableColumns: Array<Column<CouriersTableData>> = [
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.create_manifest"),
    accessor: "create_manifest",
  },
  {
    Header: () => i18n.t("columns.create_parcel"),
    accessor: "create_parcel",
  },
  {
    Header: () => i18n.t("columns.barcode_parcel"),
    accessor: "barcode_parcel",
  },
  {
    Header: () => i18n.t("columns.create_service"),
    accessor: "create_service",
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

const Courier: React.FC = () => {
  const isCouriersFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.getAllCouriers)
  )
  const isDetailedCouriersFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.getDetailedCouriers)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, CourierEnums.getAllCouriers)
  )

  const isFetchingPostCourier = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.postCouriers)
  )
  const fetchErrorPostCourier = useAppSelector((state) =>
    namedRequestError(state, CourierEnums.postCouriers)
  )
  const isFetchingPutCourier = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.putCouriers)
  )
  const fetchErrorPutCourier = useAppSelector((state) =>
    namedRequestError(state, CourierEnums.putCouriers)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [query, setQuery] = useState<string>(EmptyString)
  const [detailsModal, setDetailModal] = useState<boolean>(false)

  const data = useAppSelector(selectCouriersList)
  const { number, total_pages } = useAppSelector(selectCouriers)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllCouriersAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllCouriersAction({
          page: 1,
          state: query,
        })
      )
    }
  }

  const handleClickRow = (args: CouriersTableData) => {
    setSelectedRow(args.code)
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllCouriersAction({ page: number + 1, state: query }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostCourier === "success" ||
      isFetchingPutCourier === "success"
    ) {
      dispatch(getSearchAllCouriersAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostCourier === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(CourierEnums.postCouriers))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutCourier === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(CourierEnums.putCouriers))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostCourier === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostCourier?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(CourierEnums.postCouriers))
          },
        },
      ])
    if (isFetchingPutCourier === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutCourier?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(CourierEnums.putCouriers))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostCourier,
    fetchErrorPutCourier,
    isFetchingPostCourier,
    isFetchingPutCourier,
  ])

  useEffect(() => {
    dispatch(getSearchAllCouriersAction({ page: 1 }))
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
        {isDetailedCouriersFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <CouriersForm onClose={handleCloseFormModal} editMode={editMode} />
        )}
      </Modal>
      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details code={selectedRow} id={0} />
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByState")}
            type={"text"}
            value={query}
            onChange={handleChange}
            onKeyPress={handleSearchKeyDown}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          {checkPrivilege("CouriersBrw", "Browse") && (
            <IconButton
              onClick={() => {
                selectedRow
                  ? setDetailModal(true)
                  : setAlertList([
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
              popupText={t("buttons.details")}
            >
              <DetailsIcon />
            </IconButton>
          )}
          {checkPrivilege("CouriersBrw", "Modify") && (
            <IconButton
              onClick={() => {
                setCreateModal(true)
                setEditMode(false)
              }}
              popupText={t("buttons.new")}
            >
              <AiOutlinePlus />
            </IconButton>
          )}
          {checkPrivilege("CouriersBrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedCouriersAction(selectedRow))
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
          )}

          <IconButton onClick={() => null} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>
      {isCouriersFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<CouriersTableData>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"code"}
              columnIndex={1}
            />
          </TableWrapper>
          {total_pages !== number && data.length !== 0 && (
            <MoreButton onClick={handleClickMoreBtn}>
              {t("buttons.showMore")}
            </MoreButton>
          )}
        </>
      )}
    </>
  )
}

export default Courier
