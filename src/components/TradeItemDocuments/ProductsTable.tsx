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
import {
  TradeItemDocumentsContentType,
  TradeItemDocumentsProductType,
} from "../../app/reducers/trade-item-documents/types"
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

const tableColumns: Array<Column<TradeItemDocumentsProductType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
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
    Header: () => i18n.t("columns.description"),
    accessor: "description",
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

const TradeItemDocumentsProductTable: React.FC = () => {
  const detailedTradeItemDocuments: TradeItemDocumentsContentType | null =
    useAppSelector(
      (state: RootState) => state.tradeItemDocuments.detailedTradeItemDocuments
    )
  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const [query, setQuery] = useState<string>(EmptyString)
  const [productCardModal, setProductCardModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  let data: TradeItemDocumentsProductType[] = useMemo(
    (): TradeItemDocumentsProductType[] =>
      detailedTradeItemDocuments
        ? detailedTradeItemDocuments.products.map((item) => ({
            ...item,
            created_date: normalizeDate(item.created_date),
            updated_date: normalizeDate(item.updated_date),
          }))
        : [],
    [detailedTradeItemDocuments]
  )

  data = data.filter((item) =>
    item.description.toString().includes(query.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  const handleClickRow = (args: TradeItemDocumentsProductType) => {
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
        className={"side"}
      >
        <Details code={selectedRow} />
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByDesc")}
            type={"text"}
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className={"search-input__icon"}>
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
        <CustomTable<TradeItemDocumentsProductType>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker={"code"}
          selectedRow={selectedRow || EmptyString}
        />
      </TableWrapper>
    </>
  )
}

export default TradeItemDocumentsProductTable
