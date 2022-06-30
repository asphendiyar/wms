import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import { RiFileExcel2Line } from "react-icons/ri"
import Select from "react-select"
import { Column } from "react-table"
import { ReactSelectValues } from "../../app/commonTypes"
import {
  appColors,
  checkPrivilege,
  customStyles,
  customTheme,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { setSelectedInbound } from "../../app/reducers/inbound"
import {
  getAllInboundsAction,
  getSearchAllInboundsAction,
  patchInboundCloseAction,
  patchInboundDeclineAction,
} from "../../app/reducers/inbound/actions"
import {
  selectInbounds,
  selectInboundsList,
} from "../../app/reducers/inbound/selectors"
import { InboundEnums } from "../../app/reducers/inbound/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { RootState } from "../../app/store"
import { ReactComponent as CloseInboundIcon } from "../../assets/icons/close_inbound.svg"
import { ReactComponent as DeclineInboundIcon } from "../../assets/icons/decline_inbound.svg"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import { ReactComponent as OpenInboundIcon } from "../../assets/icons/open_inbound.svg"
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
import InboundDetails from "./Details"
import { OpenInboundForm } from "./OpenInbound"

export interface InboundsTableData {
  id: number
  state: string
  state_title: string
  number: string
  external_number: string
  number_of_lines: number
  accepted_lines: number
  document_date: string
  finished_date: string
  merchant_id: number
  merchant_code: string
  merchant: string
  type: string
  creation_source: string
  erp_warehouse: string
  warehouse_id: number
}

export const tableColumns: Array<Column<InboundsTableData>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.inboundNumber"),
    accessor: "number",
  },
  {
    Header: () => i18n.t("columns.external_number"),
    accessor: "external_number",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.number_of_lines"),
    accessor: "number_of_lines",
  },
  {
    Header: () => i18n.t("columns.accepted_lines"),
    accessor: "accepted_lines",
  },
  {
    Header: () => i18n.t("columns.document_date"),
    accessor: "document_date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
  {
    Header: () => i18n.t("columns.merchant_id"),
    accessor: "merchant_id",
  },
  {
    Header: () => i18n.t("columns.merchant"),
    accessor: "merchant",
  },
  {
    Header: () => i18n.t("columns.merchant_code"),
    accessor: "merchant_code",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.creation_source"),
    accessor: "creation_source",
  },
]

const Inbounds: React.FC = () => {
  const data = useAppSelector(selectInboundsList)
  const { total_pages, number } = useAppSelector(selectInbounds)

  const selectedInbound: InboundsTableData | null = useAppSelector(
    (state: RootState) => state.inbound.selectedInbound
  )

  const isInboundsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.getAllInbound)
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, InboundEnums.getAllInbound)
  )

  const isFetchingPatchClose = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.patchInboundClose)
  )
  const isFetchingPatchDecline = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.patchInboundDecline)
  )
  const isFetchingPatchOpen = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.patchInboundOpen)
  )
  const fetchErrorPatchClose = useAppSelector((state) =>
    namedRequestError(state, InboundEnums.patchInboundClose)
  )
  const fetchErrorPatchDecline = useAppSelector((state) =>
    namedRequestError(state, InboundEnums.patchInboundDecline)
  )
  const fetchErrorPatchOpen = useAppSelector((state) =>
    namedRequestError(state, InboundEnums.patchInboundOpen)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [inboundOpenModal, setInboundOpenModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [patchCloseModal, setPatchCloseModal] = useState<boolean>(false)
  const [patchDeclineModal, setPatchDeclineModal] = useState<boolean>(false)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("number")
  const [warehouseQuery, setWarehouseQuery] = useState<string>(EmptyString)
  const [numberQuery, setNumberQuery] = useState<string>(EmptyString)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "number"
      ? setNumberQuery(e.target.value)
      : setWarehouseQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllInboundsAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllInboundsAction({
          page: 1,
          warehouse_id: warehouseQuery,
          number: numberQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllInboundsAction({
        page: 1,
        warehouse_id: warehouseQuery,
        number: numberQuery,
      })
    )
  }

  const handleClickRow = (args: InboundsTableData) => {
    dispatch(setSelectedInbound(args))
    setSelectedRow(args.id)
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getAllInboundsAction({
        page: number + 1,
        warehouse_id: warehouseQuery,
        number: numberQuery,
      })
    )
  }

  const handleClosePatchCloseModal = () => {
    setPatchCloseModal(false)
  }

  const handleClosePatchDeclineModal = () => {
    setPatchDeclineModal(false)
  }

  const handleClosePatchOpenModal = () => {
    setInboundOpenModal(false)
    dispatch(getSearchAllInboundsAction({ page: 1 }))
  }

  useEffect(
    () => {
      if (isFetchingPatchOpen === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(InboundEnums.patchInboundOpen))
            },
          },
        ])
        handleClosePatchOpenModal()
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
              dispatch(filterRequests(InboundEnums.patchInboundClose))
            },
          },
        ])
        dispatch(getSearchAllInboundsAction({ page: 1 }))
        handleClosePatchCloseModal()
      }
      if (isFetchingPatchDecline === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(InboundEnums.patchInboundDecline))
            },
          },
        ])
        dispatch(getSearchAllInboundsAction({ page: 1 }))
        handleClosePatchDeclineModal()
      }
      if (isFetchingPatchOpen === "failed")
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.error"),
            message: fetchErrorPatchOpen?.message || "",
            icon: BiErrorCircle,
            bgColor: appColors.error,
            onDelete: () => {
              dispatch(filterRequests(InboundEnums.patchInboundOpen))
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
              dispatch(filterRequests(InboundEnums.patchInboundClose))
            },
          },
        ])
      if (isFetchingPatchDecline === "failed")
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.error"),
            message: fetchErrorPatchDecline?.message || "",
            icon: BiErrorCircle,
            bgColor: appColors.error,
            onDelete: () => {
              dispatch(filterRequests(InboundEnums.patchInboundDecline))
            },
          },
        ])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      fetchErrorPatchClose,
      fetchErrorPatchDecline,
      fetchErrorPatchOpen,
      isFetchingPatchClose,
      isFetchingPatchDecline,
      isFetchingPatchOpen,
    ]
  )

  useEffect(() => {
    dispatch(getSearchAllInboundsAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <ModalConfirmModal
        headerText={t("buttons.close") + "?"}
        message={t("confirmations.close")}
        opened={patchCloseModal}
        onAllClose={() =>
          dispatch(patchInboundCloseAction({ id: selectedRow?.toString() }))
        }
        onClose={() => setPatchCloseModal(false)}
      />
      <ModalConfirmModal
        headerText={t("buttons.decline") + "?"}
        message={t("confirmations.decline")}
        opened={patchDeclineModal}
        onAllClose={() =>
          dispatch(patchInboundDeclineAction({ id: selectedRow?.toString() }))
        }
        onClose={() => setPatchDeclineModal(false)}
      />

      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <InboundDetails id={selectedRow || 0} />
      </Modal>
      <Modal
        open={inboundOpenModal}
        title={t("buttons.start")}
        onClose={handleClosePatchOpenModal}
        className="side"
      >
        <OpenInboundForm onClose={handleClosePatchOpenModal} />
      </Modal>
      <PageTableOperations>
        <div className="filter-operations">
          <Select<ReactSelectValues>
            options={[
              { value: "number", label: `${t("columns.inboundNumber")}` },
              {
                value: "warehouse_id",
                label: `${t("columns.warehouse_id")}`,
              },
            ]}
            placeholder={t("placeholders.chooseFilter")}
            theme={customTheme}
            styles={customStyles({ width: 300 })}
            value={[
              { value: "number", label: `${t("columns.inboundNumber")}` },
              {
                value: "warehouse_id",
                label: `${t("columns.warehouse_id")}`,
              },
            ].find((item) => item.value === selectedFilterOption)}
            menuPosition={"fixed"}
            onChange={(value) => {
              typeof value?.value === "string" &&
                setSelectedFilterOption(value.value)
              setWarehouseQuery(EmptyString)
              setNumberQuery(EmptyString)
              dispatch(getSearchAllInboundsAction({ page: 1 }))
            }}
            isSearchable={false}
          />
          <SearchInputWrapper>
            <StyledInput
              className={"styled-input"}
              name={"search"}
              placeholder={`${
                [
                  { value: "number", label: `${t("columns.inboundNumber")}` },
                  {
                    value: "warehouse_id",
                    label: `${t("columns.warehouse_id")}`,
                  },
                ].find((item) => item.value === selectedFilterOption)?.label
              }`}
              type={selectedFilterOption === "warehouse_id" ? "number" : "text"}
              value={
                selectedFilterOption === "number" ? numberQuery : warehouseQuery
              }
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
        </div>

        <ActionGroupWrapper>
          {checkPrivilege("InOrdersbrw", "Browse") && (
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
          {checkPrivilege("InOrdersbrw", "CA_START") && (
            <IconButton
              onClick={() => {
                selectedRow
                  ? setInboundOpenModal(true)
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
              disabled={
                selectedInbound?.state === "in_progress" ||
                selectedInbound?.state === "completed"
              }
            >
              <OpenInboundIcon />
            </IconButton>
          )}
          {checkPrivilege("InOrdersbrw", "CA_CLOSE") && (
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
              disabled={
                selectedInbound?.state === "completed" ||
                selectedInbound?.state === "new"
              }
            >
              <CloseInboundIcon />
            </IconButton>
          )}
          {checkPrivilege("InOrdersbrw", "CA_CANCEL_INORDER") && (
            <IconButton
              onClick={() => {
                selectedRow
                  ? setPatchDeclineModal(true)
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
              popupText={t("buttons.decline")}
            >
              <DeclineInboundIcon />
            </IconButton>
          )}

          <IconButton onClick={() => {}} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      {isInboundsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<InboundsTableData>
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

export default Inbounds
