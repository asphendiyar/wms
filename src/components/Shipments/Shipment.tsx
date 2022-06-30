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
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  getAllShipmentsAction,
  getDetailedShipmentAction,
  getSearchAllShipmentsAction,
  patchOpenShipmentsAction,
} from "../../app/reducers/shipments/actions"
import {
  selectShipments,
  selectShipmentsList,
} from "../../app/reducers/shipments/selectors"
import {
  ShipmentEnums,
  ShipmentsContentType,
} from "../../app/reducers/shipments/types"
import { ReactComponent as CheckIcon } from "../../assets/icons/checkIcon.svg"
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import { ReactComponent as OpenOutboundIcon } from "../../assets/icons/open_inbound.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox"
import { LoadingIcon } from "../Common/LoadingIcon"
import Modal from "../Common/Modal"
import ModalConfirmModal from "../Common/Modal/ConfirmModal"
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
import { ShipmentsForm } from "./ShipmentForm"

export const tableColumns: Array<Column<ShipmentsContentType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.note"),
    accessor: "note",
  },
  {
    Header: () => i18n.t("columns.ramp"),
    accessor: "ramp",
  },
  {
    Header: () => i18n.t("columns.date"),
    accessor: "date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.is_picking_allowed"),
    accessor: "is_picking_allowed",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
  {
    Header: () => i18n.t("columns.route"),
    accessor: "route",
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

const Shipment: React.FC = () => {
  const data = useAppSelector(selectShipmentsList)
  const { total_pages, number } = useAppSelector(selectShipments)

  const isShipmentsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.getAllShipments)
  )

  const isDetailedShipmentFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.getDetailedShipments)
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, ShipmentEnums.getAllShipments)
  )
  const isFetchingPostShipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.postShipments)
  )
  const fetchErrorPostShipment = useAppSelector((state) =>
    namedRequestError(state, ShipmentEnums.postShipments)
  )
  const isFetchingPutShipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.putShipments)
  )
  const fetchErrorPutShipment = useAppSelector((state) =>
    namedRequestError(state, ShipmentEnums.putShipments)
  )
  const isFetchingPatchCollectShipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.patchOpenShipment)
  )
  const fetchErrorPatchCollectShipment = useAppSelector((state) =>
    namedRequestError(state, ShipmentEnums.patchOpenShipment)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [query, setQuery] = useState<string>(EmptyString)
  const [patchOpenModal, setPatchOpenModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickMoreBtn = () => {
    dispatch(getAllShipmentsAction({ page: number + 1, warehouse_id: query }))
  }

  const handleClosePatchOpenModal = () => {
    selectedRow && dispatch(patchOpenShipmentsAction(selectedRow.toString()))
    setPatchOpenModal(false)
    dispatch(getSearchAllShipmentsAction({ page: 1 }))
  }

  const handleClickRow = (args: ShipmentsContentType) => {
    setSelectedRow(args.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllShipmentsAction({ page: 1 }))
    }
  }
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllShipmentsAction({
          page: 1,
          warehouse_id: query,
        })
      )
    }
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostShipment === "success" ||
      isFetchingPutShipment === "success" ||
      isFetchingPatchCollectShipment === "success"
    ) {
      dispatch(getSearchAllShipmentsAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostShipment === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ShipmentEnums.postShipments))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutShipment === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ShipmentEnums.putShipments))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPatchCollectShipment === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ShipmentEnums.patchOpenShipment))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostShipment === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostShipment?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ShipmentEnums.postShipments))
          },
        },
      ])
    if (isFetchingPutShipment === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutShipment?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ShipmentEnums.putShipments))
          },
        },
      ])
    if (isFetchingPatchCollectShipment === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPatchCollectShipment?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ShipmentEnums.patchOpenShipment))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostShipment,
    fetchErrorPutShipment,
    isFetchingPostShipment,
    isFetchingPutShipment,
    isFetchingPatchCollectShipment,
    fetchErrorPatchCollectShipment,
  ])
  useEffect(() => {
    number === 0 && dispatch(getAllShipmentsAction({ page: number + 1 }))
  }, [dispatch, number])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <ModalConfirmModal
        headerText={t("buttons.start") + "?"}
        message={t("confirmations.startShipment")}
        opened={patchOpenModal}
        onAllClose={handleClosePatchOpenModal}
        onClose={() => setPatchOpenModal(false)}
      />
      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className={"side"}
      >
        <Details id={selectedRow || 0} />
      </Modal>
      <Modal
        open={createModal}
        title={editMode ? t("buttons.edit") : t("buttons.new")}
        onClose={handleCloseFormModal}
        className={"side"}
      >
        {isDetailedShipmentFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <ShipmentsForm
            onClose={() => setCreateModal(false)}
            editMode={editMode}
          />
        )}
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
          {checkPrivilege("Shipments", "Browse") && (
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
          {checkPrivilege("Shipments", "Create") && (
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
          {checkPrivilege("Shipments", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedShipmentAction(selectedRow.toString()))
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
          {checkPrivilege("Shipments", "CA_ACTIVATE") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  setPatchOpenModal(true)
                } else {
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
                }
              }}
              popupText={t("buttons.start")}
            >
              <OpenOutboundIcon />
            </IconButton>
          )}
          {checkPrivilege("Shipments", "CA_SHIPMENT_READY4LOAD") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                } else {
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
                }
              }}
              popupText={t("buttons.done")}
            >
              <CheckIcon />
            </IconButton>
          )}
          {checkPrivilege("Shipments", "CA_CLOSE") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                } else {
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
                }
              }}
              popupText={t("buttons.close")}
            >
              <CloseIcon />
            </IconButton>
          )}
        </ActionGroupWrapper>
      </PageTableOperations>

      {isShipmentsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<ShipmentsContentType>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"id"}
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

export default Shipment
