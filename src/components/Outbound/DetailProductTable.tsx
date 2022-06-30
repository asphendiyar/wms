import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch, AiOutlineWarning } from "react-icons/ai"
import { Column } from "react-table"
import {
  appColors,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { OutboundContentType } from "../../app/reducers/outbound/types"
import { RootState } from "../../app/store"
import { ReactComponent as ProductCatalogIcon } from "../../assets/icons/card.svg"
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

export interface DetailsProductTable {
  state: string
  state_title: string
  line_number: number
  sku: string
  quantity: number
  actual_quantity: number
  price: number
  description: string
  barcode: string
  trade_item_barcode: string
  erp_warehouse: string
  created_date: string
  updated_date: string
}

const tableColumns: Array<Column<DetailsProductTable>> = [
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.line_number"),
    accessor: "line_number",
  },
  {
    Header: () => i18n.t("columns.sku"),
    accessor: "sku",
  },
  {
    Header: () => i18n.t("columns.quantity"),
    accessor: "quantity",
  },
  {
    Header: () => i18n.t("columns.actual_quantity"),
    accessor: "actual_quantity",
  },
  {
    Header: () => i18n.t("columns.price"),
    accessor: "price",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description",
  },
  {
    Header: () => i18n.t("columns.trade_item_barcode"),
    accessor: "trade_item_barcode",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
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

const OutboundProducts: React.FC = () => {
  const detailedOutbound: OutboundContentType | null = useAppSelector(
    (state: RootState) => state.outbound.outbound
  )
  const [query, setQuery] = useState<string>(EmptyString)
  const [productCardModal, setProductCardModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  let data: DetailsProductTable[] = useMemo(
    (): DetailsProductTable[] =>
      detailedOutbound
        ? detailedOutbound.products.map((item) => ({
            ...item,
          }))
        : [],
    [detailedOutbound]
  )

  data = data.filter((item) =>
    item.sku.toLowerCase().includes(query.toLowerCase())
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  const handleClickRow = (args: DetailsProductTable) => {
    setSelectedRow(args.sku)
  }
  const { t } = useTranslation()
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
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className="styled-input"
            name="search"
            placeholder={t("placeholders.searchBySku")}
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
        </ActionGroupWrapper>
      </PageTableOperations>
      <TableWrapper>
        <CustomTable<DetailsProductTable>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker="sku"
          selectedRow={selectedRow || EmptyString}
        />
      </TableWrapper>
    </>
  )
}

export default OutboundProducts
