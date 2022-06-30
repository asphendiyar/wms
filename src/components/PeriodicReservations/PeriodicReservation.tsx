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
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllPeriodicReservationsAction,
  getDetailedPeriodicReservationsAction,
  getSearchAllPeriodicReservationsAction,
} from "../../app/reducers/periodic-reservations/actions"
import {
  selectPeriodicReservations,
  selectPeriodicReservationsList,
} from "../../app/reducers/periodic-reservations/selectors"
import {
  PeriodicReservationEnums,
  PeriodicReservationsContentType,
} from "../../app/reducers/periodic-reservations/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
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
import { PeriodicReservationsForm } from "./PeriodicReservationsForm"

export const tableColumns: Array<Column<PeriodicReservationsContentType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.functional_zone_id"),
    accessor: "functional_zone_id",
  },
  {
    Header: () => i18n.t("columns.partner_id"),
    accessor: "partner_id",
  },
  {
    Header: () => i18n.t("columns.route"),
    accessor: "route",
  },
  {
    Header: () => i18n.t("columns.started_date"),
    accessor: "start_date",
  },
  {
    Header: () => i18n.t("columns.end_date"),
    accessor: "end_date",
  },
]

const PeriodicReservation: React.FC = () => {
  const isPeriodicReservationsFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.getAllPeriodicReservations
    )
  )
  const isDetailedPeriodicReservationsFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.getDetailedPeriodicReservations
    )
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(
      state,
      PeriodicReservationEnums.getAllPeriodicReservations
    )
  )

  const isFetchingPostPeriodicReservation = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.postPeriodicReservations
    )
  )
  const fetchErrorPostPeriodicReservation = useAppSelector((state) =>
    namedRequestError(state, PeriodicReservationEnums.postPeriodicReservations)
  )
  const isFetchingPutPeriodicReservation = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.putPeriodicReservations
    )
  )
  const fetchErrorPutPeriodicReservation = useAppSelector((state) =>
    namedRequestError(state, PeriodicReservationEnums.putPeriodicReservations)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [query, setQuery] = useState<string>(EmptyString)
  const [detailsModal, setDetailModal] = useState<boolean>(false)

  const data = useAppSelector(selectPeriodicReservationsList)
  const { number, total_pages } = useAppSelector(selectPeriodicReservations)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllPeriodicReservationsAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllPeriodicReservationsAction({
          page: 1,
          warehouse_id: query,
        })
      )
    }
  }

  const handleClickRow = (args: PeriodicReservationsContentType) => {
    setSelectedRow(args.id)
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getAllPeriodicReservationsAction({
        page: number + 1,
        warehouse_id: query,
      })
    )
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostPeriodicReservation === "success" ||
      isFetchingPutPeriodicReservation === "success"
    ) {
      dispatch(getSearchAllPeriodicReservationsAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostPeriodicReservation === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(
              filterRequests(PeriodicReservationEnums.postPeriodicReservations)
            )
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutPeriodicReservation === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(
              filterRequests(PeriodicReservationEnums.putPeriodicReservations)
            )
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostPeriodicReservation === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostPeriodicReservation?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(
              filterRequests(PeriodicReservationEnums.postPeriodicReservations)
            )
          },
        },
      ])
    if (isFetchingPutPeriodicReservation === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutPeriodicReservation?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(
              filterRequests(PeriodicReservationEnums.putPeriodicReservations)
            )
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostPeriodicReservation,
    fetchErrorPutPeriodicReservation,
    isFetchingPostPeriodicReservation,
    isFetchingPutPeriodicReservation,
  ])
  useEffect(() => {
    dispatch(getSearchAllPeriodicReservationsAction({ page: 1 }))
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
        {isDetailedPeriodicReservationsFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <PeriodicReservationsForm
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
            placeholder={t("placeholders.searchByWarehouseID")}
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
          {checkPrivilege("PermReservationsBrw", "Browse") && (
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
          {checkPrivilege("PermReservationsBrw", "Create") && (
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
          {checkPrivilege("PermReservationsBrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedPeriodicReservationsAction(selectedRow))
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
          <IconButton onClick={() => null} popupText="Удалить">
            <DeleteIcon />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      <TableWrapper height="calc(100vh - 234px)">
        <CustomTable<PeriodicReservationsContentType>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRow={selectedRow || EmptyString}
          selectedRowChecker={"id"}
          columnIndex={1}
        />
      </TableWrapper>

      {isPeriodicReservationsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        total_pages !== number && (
          <MoreButton onClick={handleClickMoreBtn}>
            {t("buttons.showMore")}
          </MoreButton>
        )
      )}
    </>
  )
}

export default PeriodicReservation
