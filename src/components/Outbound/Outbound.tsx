import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import { Column } from "react-table"
import {
  appColors,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { setSelectedOutbound } from "../../app/reducers/outbound"
import {
  getAllOutboundsAction,
  getSearchAllOutboundsAction,
  patchOutboundCloseAction,
  patchOutboundCollectAction,
} from "../../app/reducers/outbound/actions"
import {
  selectOutbounds,
  selectOutboundsList,
} from "../../app/reducers/outbound/selectors"
import {
  OutboundEnums,
  OutboundsTableData,
} from "../../app/reducers/outbound/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { RootState } from "../../app/store"
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import { ReactComponent as OpenOutboundIcon } from "../../assets/icons/open_inbound.svg"
import { ReactComponent as ShipmentIcon } from "../../assets/icons/shipment.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
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
import { ShipmentsOutboundForm } from "./AttachToShipment"
import Details from "./Details"

export const tableColumns: Array<Column<OutboundsTableData>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.number"),
    accessor: "number",
  },
  {
    Header: () => i18n.t("columns.external_number"),
    accessor: "external_number",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.document_date"),
    accessor: "document_date",
    Cell: (row) => normalizeDate(row.value),
  },

  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },

  {
    Header: () => i18n.t("columns.merchant_code"),
    accessor: "merchant_code",
  },
  {
    Header: () => i18n.t("columns.carrier_code"),
    accessor: "carrier_code",
  },
  {
    Header: () => i18n.t("columns.creation_source"),
    accessor: "creation_source",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
  {
    Header: () => i18n.t("columns.shipment_id"),
    accessor: "shipment_id",
  },
  {
    Header: () => i18n.t("columns.shipment_note"),
    accessor: "shipment_note",
  },
  {
    Header: () => i18n.t("columns.created_date"),
    accessor: "created_date",
    Cell: (row) => normalizeDate(row.value),
  },
]

const Outbound: React.FC = () => {
  const data = useAppSelector(selectOutboundsList)
  const { total_pages, number } = useAppSelector(selectOutbounds)

  const isOutboundsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, OutboundEnums.getAllOutbound)
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, OutboundEnums.getAllOutbound)
  )

  const selectedOutbound: OutboundsTableData | null = useAppSelector(
    (state: RootState) => state.outbound.selectedOutbound
  )
  const isFetchingPatchClose = useAppSelector((state) =>
    namedRequestsInProgress(state, OutboundEnums.patchOutboundClose)
  )
  const isFetchingPatchCollect = useAppSelector((state) =>
    namedRequestsInProgress(state, OutboundEnums.patchOutboundCollect)
  )
  const isFetchingPatchAttach = useAppSelector((state) =>
    namedRequestsInProgress(state, OutboundEnums.patchOutboundAttach)
  )
  const fetchErrorPatchClose = useAppSelector((state) =>
    namedRequestError(state, OutboundEnums.patchOutboundClose)
  )
  const fetchErrorPatchCollect = useAppSelector((state) =>
    namedRequestError(state, OutboundEnums.patchOutboundCollect)
  )
  const fetchErrorPatchAttach = useAppSelector((state) =>
    namedRequestError(state, OutboundEnums.patchOutboundAttach)
  )
  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [patchAttachModal, setAttachModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [query, setQuery] = useState<string>(EmptyString)
  const [patchCloseModal, setPatchCloseModal] = useState<boolean>(false)
  const [patchCollectModal, setPatchCollectModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickMoreBtn = () => {
    dispatch(getAllOutboundsAction({ page: number + 1, number: query }))
  }

  const handleClickRow = (args: OutboundsTableData) => {
    dispatch(setSelectedOutbound(args))
    setSelectedRow(args.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllOutboundsAction({ page: 1 }))
    }
  }
  const handlePatchCloseModal = () => {
    setPatchCloseModal(false)
  }
  const handlePatchCollectModal = () => {
    setPatchCollectModal(false)
  }
  const handleCloseAttachToShipmentModal = () => {
    setAttachModal(false)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllOutboundsAction({
          page: 1,
          number: query,
        })
      )
    }
  }

  useEffect(
    () => {
      if (isFetchingPatchCollect === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(OutboundEnums.patchOutboundCollect))
            },
          },
        ])
        handlePatchCollectModal()
      }
      if (isFetchingPatchClose === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(OutboundEnums.patchOutboundClose))
            },
          },
        ])
        dispatch(getSearchAllOutboundsAction({ page: 1 }))
        handlePatchCloseModal()
      }
      if (isFetchingPatchAttach === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(OutboundEnums.patchOutboundAttach))
            },
          },
        ])
        handleCloseAttachToShipmentModal()
        dispatch(getSearchAllOutboundsAction({ page: 1 }))
      }
      if (isFetchingPatchCollect === "failed")
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.error"),
            message: fetchErrorPatchCollect?.message || "",
            icon: BiErrorCircle,
            bgColor: appColors.error,
            onDelete: () => {
              dispatch(filterRequests(OutboundEnums.patchOutboundCollect))
            },
          },
        ])
      if (isFetchingPatchClose === "failed")
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.error"),
            message: fetchErrorPatchClose?.message || "",
            icon: BiErrorCircle,
            bgColor: appColors.error,
            onDelete: () => {
              dispatch(filterRequests(OutboundEnums.patchOutboundClose))
            },
          },
        ])
      if (isFetchingPatchAttach === "failed")
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.error"),
            message: fetchErrorPatchAttach?.message || "",
            icon: BiErrorCircle,
            bgColor: appColors.error,
            onDelete: () => {
              dispatch(filterRequests(OutboundEnums.patchOutboundAttach))
            },
          },
        ])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      fetchErrorPatchClose,
      fetchErrorPatchAttach,
      fetchErrorPatchCollect,
      isFetchingPatchClose,
      isFetchingPatchAttach,
      isFetchingPatchCollect,
    ]
  )

  useEffect(() => {
    dispatch(getSearchAllOutboundsAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <ModalConfirmModal
        headerText={t("buttons.close") + "?"}
        message={t("confirmations.close")}
        opened={patchCloseModal}
        onAllClose={() =>
          dispatch(patchOutboundCloseAction({ id: selectedRow?.toString() }))
        }
        onClose={() => setPatchCloseModal(false)}
      />
      <ModalConfirmModal
        headerText={t("buttons.start") + "?"}
        message={t("confirmations.start")}
        opened={patchCollectModal}
        onAllClose={() =>
          dispatch(patchOutboundCollectAction({ id: selectedRow?.toString() }))
        }
        onClose={() => setPatchCollectModal(false)}
      />

      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details id={selectedRow || 0} />
      </Modal>
      <Modal
        open={patchAttachModal}
        title={t("buttons.attachToShipment")}
        onClose={handleCloseAttachToShipmentModal}
        className="side"
      >
        <ShipmentsOutboundForm onClose={() => setAttachModal(false)} />
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className="styled-input"
            name="search"
            placeholder={t("placeholders.searchByNumber")}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyPress={handleSearchKeyDown}
          />
          <StyledIcon className="search-input__icon">
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
              selectedRow
                ? setPatchCollectModal(true)
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
            popupText={t("buttons.start")}
            disabled={selectedOutbound?.state === "closed"}
          >
            <OpenOutboundIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              selectedRow
                ? setPatchCloseModal(true)
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
            popupText={t("buttons.close")}
            disabled={selectedOutbound?.state === "closed"}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              selectedRow
                ? setAttachModal(true)
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
            popupText={t("buttons.attachToShipment")}
          >
            <ShipmentIcon />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      {isOutboundsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<OutboundsTableData>
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

export default Outbound
