import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlinePrinter,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai"
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
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  getAllTradeItemDocumentsAction,
  getSearchAllTradeItemDocumentsAction,
} from "../../app/reducers/trade-item-documents/actions"
import {
  selectTradeItemDocuments,
  selectTradeItemDocumentsList,
} from "../../app/reducers/trade-item-documents/selectors"
import {
  TradeItemDocumentEnums,
  TradeItemDocumentsBase,
} from "../../app/reducers/trade-item-documents/types"
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
import PrintTradeItemBarcodes from "./PrintTradeItemBarcodes"

export const tableColumns: Array<Column<TradeItemDocumentsBase>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.cell"),
    accessor: "cell",
  },
  {
    Header: () => i18n.t("columns.outbound_id"),
    accessor: "outbound_id",
  },
  {
    Header: () => i18n.t("columns.outbound_delivery_code"),
    accessor: "outbound_delivery_code",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.actual_volume"),
    accessor: "actual_volume",
  },
  {
    Header: () => i18n.t("columns.max_volume"),
    accessor: "max_volume",
  },
  {
    Header: () => i18n.t("columns.actual_weight"),
    accessor: "actual_weight",
  },
  {
    Header: () => i18n.t("columns.max_weight"),
    accessor: "max_weight",
  },
]

const TradeItemDocument: React.FC = () => {
  const data = useAppSelector(selectTradeItemDocumentsList)
  const { total_pages, number } = useAppSelector(selectTradeItemDocuments)

  const isTradeItemDocumentsFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      TradeItemDocumentEnums.getAllTradeItemDocuments
    )
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, TradeItemDocumentEnums.getAllTradeItemDocuments)
  )
  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [printModal, setPrintModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [query, setQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickMoreBtn = () => {
    dispatch(
      getAllTradeItemDocumentsAction({ page: number + 1, barcodes: query })
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllTradeItemDocumentsAction({ page: 1 }))
    }
  }
  const handleClickRow = (args: TradeItemDocumentsBase) => {
    setSelectedRow(args.barcode)
  }
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllTradeItemDocumentsAction({
          page: 1,
          barcodes: query,
        })
      )
    }
  }

  useEffect(() => {
    dispatch(getSearchAllTradeItemDocumentsAction({ page: 1 }))
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
        <Details code={selectedRow || EmptyString} />
      </Modal>
      <Modal
        open={printModal}
        title={"Настройки печати документа"}
        onClose={() => setPrintModal(false)}
        className={"centered"}
      >
        <PrintTradeItemBarcodes onClose={() => setPrintModal(false)} />
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByBarcode")}
            type={"number"}
            value={query}
            onChange={handleChange}
            onKeyPress={handleSearchKeyDown}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          {checkPrivilege("Containersbrw", "Browse") && (
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

          <IconButton onClick={() => null} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
          {checkPrivilege("Containersbrw", "Print") && (
            <IconButton
              onClick={() => setPrintModal(true)}
              popupText={t("buttons.print")}
            >
              <AiOutlinePrinter />
            </IconButton>
          )}
        </ActionGroupWrapper>
      </PageTableOperations>
      {isTradeItemDocumentsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<TradeItemDocumentsBase>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"barcode"}
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

export default TradeItemDocument
