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
  getAllBackgroundTasksAction,
  getDetailedBackgroundTasksAction,
  getSearchAllBackgroundTasksAction,
} from "../../app/reducers/background-tasks/actions"
import {
  selectBackgroundTasks,
  selectBackgroundTasksList,
} from "../../app/reducers/background-tasks/selectors"
import {
  BackgroundTaskEnums,
  BackgroundTasksTableData,
} from "../../app/reducers/background-tasks/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox"
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
import { BackgroundTasksForm } from "./BackgroundTasksForm"
import Details from "./Details"

export const tableColumns: Array<Column<BackgroundTasksTableData>> = [
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type_title",
  },
  {
    Header: () => i18n.t("columns.manual_start"),
    accessor: "manual_start",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
  {
    Header: () => i18n.t("columns.period"),
    accessor: "period",
  },
  {
    Header: () => i18n.t("columns.last_run_at"),
    accessor: "last_run_at",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.next_run_at"),
    accessor: "next_run_at",
    Cell: (row) => normalizeDate(row.value),
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

const BackgroundTask: React.FC = () => {
  const isBackgroundTasksFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, BackgroundTaskEnums.getAllBackgroundTasks)
  )
  const isFetchingDetailedBT = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      BackgroundTaskEnums.getDetailedBackgroundTasks
    )
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, BackgroundTaskEnums.getAllBackgroundTasks)
  )

  const isFetchingPostBT = useAppSelector((state) =>
    namedRequestsInProgress(state, BackgroundTaskEnums.postBackgroundTasks)
  )
  const fetchErrorPostBT = useAppSelector((state) =>
    namedRequestError(state, BackgroundTaskEnums.postBackgroundTasks)
  )
  const isFetchingPutBT = useAppSelector((state) =>
    namedRequestsInProgress(state, BackgroundTaskEnums.putBackgroundTasks)
  )
  const fetchErrorPutBT = useAppSelector((state) =>
    namedRequestError(state, BackgroundTaskEnums.putBackgroundTasks)
  )

  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [query, setQuery] = useState<string>(EmptyString)
  const [detailsModal, setDetailModal] = useState<boolean>(false)

  const data = useAppSelector(selectBackgroundTasksList)
  const { number, total_pages } = useAppSelector(selectBackgroundTasks)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllBackgroundTasksAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllBackgroundTasksAction({
          page: 1,
          state: query,
        })
      )
    }
  }

  const handleClickRow = (args: BackgroundTasksTableData) => {
    setSelectedRow(args.id)
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllBackgroundTasksAction({ page: number + 1, state: query }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (isFetchingPostBT === "success" || isFetchingPutBT === "success") {
      dispatch(getSearchAllBackgroundTasksAction({ page: number }))
    }
  }

  useEffect(() => {
    if (isFetchingPostBT === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(BackgroundTaskEnums.postBackgroundTasks))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutBT === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(BackgroundTaskEnums.putBackgroundTasks))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostBT === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostBT?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(BackgroundTaskEnums.postBackgroundTasks))
          },
        },
      ])
    if (isFetchingPutBT === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutBT?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(BackgroundTaskEnums.putBackgroundTasks))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchErrorPostBT, fetchErrorPutBT, isFetchingPostBT, isFetchingPutBT])

  useEffect(() => {
    dispatch(getSearchAllBackgroundTasksAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Modal
        open={createModal}
        title={`${!editMode ? t("buttons.new") : t("buttons.edit")}`}
        onClose={handleCloseFormModal}
        className={"side"}
      >
        {isFetchingDetailedBT === "pending" ? (
          <LoadingIcon />
        ) : (
          <BackgroundTasksForm
            onClose={handleCloseFormModal}
            editMode={editMode}
          />
        )}
      </Modal>
      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details id={selectedRow || 0} />
      </Modal>
      <Alert alertList={alertList} timeout={5000} autoDelete />
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
          {checkPrivilege("JobsBrw", "Browse") && (
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

          {checkPrivilege("JobsBrw", "Create") && (
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
          {checkPrivilege("JobsBrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedBackgroundTasksAction(selectedRow))

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

      {isBackgroundTasksFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<BackgroundTasksTableData>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"id"}
              columnIndex={1}
            />
          </TableWrapper>
          {total_pages !== number && data.length !== 0 && (
            <MoreButton onClick={handleClickMoreBtn}>
              {t("button.showMore")}
            </MoreButton>
          )}
        </>
      )}
    </>
  )
}

export default BackgroundTask
