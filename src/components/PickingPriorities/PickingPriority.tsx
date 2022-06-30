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
  getAllPickingPrioritiesAction,
  getDetailedPickingPrioritiesAction,
  getSearchAllPickingPrioritiesAction,
} from "../../app/reducers/picking-priority/actions"
import {
  selectPickingPriorities,
  selectPickingPrioritiesList,
} from "../../app/reducers/picking-priority/selectors"
import {
  PickingPrioritiesContentType,
  PickingPriorityEnums,
} from "../../app/reducers/picking-priority/types"
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
import Details from "./Details"
import { PickingPrioritiesForm } from "./PickingPrioritiesForm"

export const tableColumns: Array<Column<PickingPrioritiesContentType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.route"),
    accessor: "route",
  },
  {
    Header: () => i18n.t("columns.priority"),
    accessor: "priority",
  },
  {
    Header: () => i18n.t("columns.state_title"),
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

const PickingPriority: React.FC = () => {
  const isPickingPrioritiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingPriorityEnums.getAllPickingPriorities)
  )
  const isDetailedPickingPrioritiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PickingPriorityEnums.getDetailedPickingPriorities
    )
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PickingPriorityEnums.getAllPickingPriorities)
  )

  const isFetchingPostPickingPriority = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingPriorityEnums.postPickingPriorities)
  )
  const fetchErrorPostPickingPriority = useAppSelector((state) =>
    namedRequestError(state, PickingPriorityEnums.postPickingPriorities)
  )
  const isFetchingPutPickingPriority = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingPriorityEnums.putPickingPriorities)
  )
  const fetchErrorPutPickingPriority = useAppSelector((state) =>
    namedRequestError(state, PickingPriorityEnums.putPickingPriorities)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [query, setQuery] = useState<string>(EmptyString)
  const [detailsModal, setDetailModal] = useState<boolean>(false)

  const data = useAppSelector(selectPickingPrioritiesList)
  const { number, total_pages } = useAppSelector(selectPickingPriorities)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllPickingPrioritiesAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllPickingPrioritiesAction({
          page: 1,
          state: query,
        })
      )
    }
  }

  const handleClickRow = (args: PickingPrioritiesContentType) => {
    setSelectedRow(args.id)
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllPickingPrioritiesAction({ page: number + 1, state: query }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostPickingPriority === "success" ||
      isFetchingPutPickingPriority === "success"
    ) {
      dispatch(getSearchAllPickingPrioritiesAction({ page: 1 }))
    }
  }

  useEffect(() => {
    if (isFetchingPostPickingPriority === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PickingPriorityEnums.postPickingPriorities))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutPickingPriority === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PickingPriorityEnums.putPickingPriorities))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostPickingPriority === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostPickingPriority?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PickingPriorityEnums.postPickingPriorities))
          },
        },
      ])
    if (isFetchingPutPickingPriority === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutPickingPriority?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PickingPriorityEnums.putPickingPriorities))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostPickingPriority,
    fetchErrorPutPickingPriority,
    isFetchingPostPickingPriority,
    isFetchingPutPickingPriority,
  ])

  useEffect(() => {
    dispatch(getSearchAllPickingPrioritiesAction({ page: 1 }))
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
        {isDetailedPickingPrioritiesFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <PickingPrioritiesForm
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
                dispatch(
                  getDetailedPickingPrioritiesAction(selectedRow.toString())
                )
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
      {isPickingPrioritiesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<PickingPrioritiesContentType>
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
              {t("buttons.showMore")}
            </MoreButton>
          )}
        </>
      )}
    </>
  )
}

export default PickingPriority
