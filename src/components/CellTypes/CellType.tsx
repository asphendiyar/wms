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
import {
  appColors,
  checkPrivilege,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getAllCellTypesAction,
  getDetailedCellTypesAction,
  getSearchAllCellTypesAction,
} from "../../app/reducers/cell-types/actions"
import {
  selectCellTypes,
  selectCellTypesList,
} from "../../app/reducers/cell-types/selectors"
import {
  CellTypeEnums,
  CellTypesContentType,
} from "../../app/reducers/cell-types/types"
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
import { CellTypeForm } from "./CellTypeForm"
import { tableColumns } from "./columns"
import Details from "./Details"

const CellType: React.FC = () => {
  const data = useAppSelector(selectCellTypesList)
  const { total_pages, number } = useAppSelector(selectCellTypes)

  const isCellTypeFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.getAllCellTypes)
  )
  const isFetchingDetailedCellTypes = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.getDetailedCellTypes)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, CellTypeEnums.getAllCellTypes)
  )

  const isFetchingPostCellType = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.postCellTypes)
  )
  const fetchErrorPostCellType = useAppSelector((state) =>
    namedRequestError(state, CellTypeEnums.postCellTypes)
  )
  const isFetchingPutCellType = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.putCellTypes)
  )
  const fetchErrorPutCellType = useAppSelector((state) =>
    namedRequestError(state, CellTypeEnums.putCellTypes)
  )
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const [codeQuery, setCodeQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: CellTypesContentType) => {
    setSelectedRow(args.code)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllCellTypesAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllCellTypesAction({
          page: 1,
          code: codeQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllCellTypesAction({
        page: 1,
        code: codeQuery,
      })
    )
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllCellTypesAction({ page: number + 1, code: codeQuery }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostCellType === "success" ||
      isFetchingPutCellType === "success"
    ) {
      dispatch(getSearchAllCellTypesAction({ page: 1 }))
    }
  }

  useEffect(() => {
    if (isFetchingPostCellType === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(CellTypeEnums.postCellTypes))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutCellType === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(CellTypeEnums.putCellTypes))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostCellType === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostCellType?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(CellTypeEnums.postCellTypes))
          },
        },
      ])
    if (isFetchingPutCellType === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutCellType?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(CellTypeEnums.putCellTypes))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostCellType,
    fetchErrorPutCellType,
    isFetchingPostCellType,
    isFetchingPutCellType,
  ])

  useEffect(() => {
    dispatch(getSearchAllCellTypesAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className={"side"}
      >
        <Details code={selectedRow} />
      </Modal>
      <Modal
        open={createModal}
        title={`${!editMode ? t("buttons.new") : t("buttons.edit")}`}
        onClose={handleCloseFormModal}
        className={"side"}
      >
        {isFetchingDetailedCellTypes === "pending" ? (
          <LoadingIcon />
        ) : (
          <CellTypeForm onClose={handleCloseFormModal} editMode={editMode} />
        )}
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByCode")}
            type={"text"}
            value={codeQuery}
            onChange={handleChange}
            onKeyPress={handleSearchKeyDown}
          />
          <StyledIcon
            onClick={handleSearchClick}
            className={"search-input__icon"}
          >
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          {checkPrivilege("LocTypeBrw", "Browse") && (
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
          {checkPrivilege("LocTypeBrw", "Create") && (
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
          {checkPrivilege("LocTypeBrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedCellTypesAction(selectedRow))

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
      {isCellTypeFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<CellTypesContentType>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"code"}
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

export default CellType
