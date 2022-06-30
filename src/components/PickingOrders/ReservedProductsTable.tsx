import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch, AiOutlineWarning } from "react-icons/ai"
import { Column } from "react-table"
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { PickingOrdersContentType } from "../../app/reducers/picking-orders/types"
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

export interface ReservedProductsTable {
  cell: string
  quantity: 5
  sku: string
  barcode: string
  erp_warehouse: string
  description: string
  trade_item_barcode: string
}

const tableColumns: Array<Column<ReservedProductsTable>> = [
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
  },
  {
    Header: () => i18n.t("columns.sku"),
    accessor: "sku",
  },
  {
    Header: () => i18n.t("columns.cell"),
    accessor: "cell",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description",
  },
  {
    Header: () => i18n.t("columns.quantity"),
    accessor: "quantity",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
  {
    Header: () => i18n.t("columns.trade_item_barcode"),
    accessor: "trade_item_barcode",
  },
]

const ReservedProducts: React.FC = () => {
  const detailedPickingOrders: PickingOrdersContentType | null = useAppSelector(
    (state: RootState) => state.pickingOrders.detailedPickingOrder
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [query, setQuery] = useState<string>(EmptyString)
  const [productCardModal, setProductCardModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  let data: ReservedProductsTable[] = useMemo(
    (): ReservedProductsTable[] =>
      detailedPickingOrders?.products
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          detailedPickingOrders.products.map((item: any) => ({
            ...item,
          }))
        : [],
    [detailedPickingOrders]
  )

  data = data.filter((item) =>
    item.sku.toString().includes(query.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  const handleClickRow = (args: ReservedProductsTable) => {
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
        <CustomTable<ReservedProductsTable>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker="code"
          selectedRow={selectedRow || EmptyString}
        />
      </TableWrapper>
    </>
  )
}

export default ReservedProducts
