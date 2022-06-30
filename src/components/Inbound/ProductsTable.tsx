import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch, AiOutlineWarning } from "react-icons/ai"
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
import { setSelectedInboundProduct } from "../../app/reducers/inbound"
import {
  InboundContentType,
  InboundDetailsTable,
} from "../../app/reducers/inbound/types"
import { RootState } from "../../app/store"
import { ReactComponent as ProductCatalogIcon } from "../../assets/icons/card.svg"
import { ReactComponent as SerialNumbersIcon } from "../../assets/icons/serialNumbers.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
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
import Details from "../ProductCatalog/Details"
import SerialNumbers from "./SerialNumbers"

const tableColumns: Array<Column<InboundDetailsTable>> = [
  {
    Header: () => i18n.t("columns.line_number"),
    accessor: "line_number",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state",
  },
  {
    Header: () => i18n.t("columns.sku"),
    accessor: "sku",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description",
  },
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
  },
  {
    Header: () => i18n.t("columns.quantity"),
    accessor: "quantity",
  },
  {
    Header: () => i18n.t("columns.accepted_quantity"),
    accessor: "accepted_quantity",
  },
  {
    Header: () => i18n.t("columns.left_quantity"),
    accessor: "left_quantity",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
]

const InboundProducts: React.FC = () => {
  const detailedInbound: InboundContentType | null = useAppSelector(
    (state: RootState) => state.inbound.inbound
  )
  const [query, setQuery] = useState<string>(EmptyString)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [productCardModal, setProductCardModal] = useState<boolean>(false)
  const [serialNumbersModal, setSerialNumbersModal] = useState<boolean>(false)
  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  let data: InboundDetailsTable[] = useMemo(
    (): InboundDetailsTable[] =>
      detailedInbound?.products
        ? detailedInbound.products.map((item) => ({
            ...item,
            created_date: normalizeDate(item.created_date),
            updated_date: normalizeDate(item.updated_date),
            is_track_expiration_date: item.control.is_track_expiration_date,
            account_serial_number: item.control.account_serial_number,
          }))
        : [],
    [detailedInbound]
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: InboundDetailsTable) => {
    setSelectedRow(args.sku)
    dispatch(setSelectedInboundProduct(args))
  }

  data = data.filter((item) => item.sku.includes(query.toLowerCase()))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <Modal
        open={productCardModal}
        title={t("pageTitle.productCatalog")}
        onClose={() => setProductCardModal(false)}
        className="side"
      >
        <Details code={selectedRow} />
      </Modal>
      <Modal
        open={serialNumbersModal}
        title="Серийные номера"
        onClose={() => setSerialNumbersModal(false)}
        className="side"
      >
        <SerialNumbers />
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className="styled-input"
            name="search"
            placeholder={t("placeholders.searchByCode")}
            type="text"
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className="search-input__icon">
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          <IconButton
            onClick={() => {
              selectedRow
                ? setProductCardModal(true)
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
            popupText={t("pageTitle.productCatalog")}
          >
            <ProductCatalogIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              selectedRow
                ? setSerialNumbersModal(true)
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
            popupText="Серийные номера"
          >
            <SerialNumbersIcon />
          </IconButton>
          <IconButton onClick={() => {}} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>
      <TableWrapper>
        <CustomTable<InboundDetailsTable>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker="sku"
          selectedRow={selectedRow || EmptyString}
          rowStateChecker={"state"}
          rowStateCheckerValue={"not_ready"}
        />
      </TableWrapper>
    </>
  )
}

export default InboundProducts
