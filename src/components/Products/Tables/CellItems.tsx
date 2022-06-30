import React, { Dispatch, Fragment, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineEdit, AiOutlinePlus, AiOutlineWarning } from "react-icons/ai"
import { Column } from "react-table"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import i18n from "../../../app/i18n"
import {
  setSelectedProduct,
  setSelectedTE,
} from "../../../app/reducers/products"
import {
  selectCellItemProductTableData,
  selectCellItemTradeItemTableData,
} from "../../../app/reducers/products/selectors"
import {
  CellItemsProduct,
  CellItemsTradeItem,
} from "../../../app/reducers/products/types"
import { AlertListItem } from "../../Common/Alert"
import IconButton from "../../Common/Button/icon"
import Modal from "../../Common/Modal"
import {
  ActionGroupWrapper,
  FlexJustifyBetween,
  TableWrapper,
} from "../../Common/styled"
import CustomTable from "../../Common/Table"
import ProductTEForm from "../ProductTEForm"

const cellItemProductsTableColumns: Array<Column<CellItemsProduct>> = [
  { Header: () => i18n.t("columns.id"), accessor: "id" },
  { Header: () => i18n.t("columns.warehouse_id"), accessor: "warehouse_id" },
  { Header: () => i18n.t("columns.address"), accessor: "address" },
  { Header: () => i18n.t("columns.description"), accessor: "description" },
  { Header: () => i18n.t("columns.cell_state"), accessor: "cell_state" },
  { Header: () => i18n.t("columns.type"), accessor: "type" },
  { Header: () => i18n.t("columns.sku"), accessor: "sku" },
  {
    Header: () => i18n.t("columns.trade_item_barcode"),
    accessor: "trade_item_barcode",
  },
  {
    Header: () => i18n.t("columns.trade_item_state"),
    accessor: "trade_item_state",
  },
  { Header: () => i18n.t("columns.quantity"), accessor: "quantity" },
  {
    Header: () => i18n.t("columns.available_quantity"),
    accessor: "available_quantity",
  },
  {
    Header: () => i18n.t("columns.reserved_quantity"),
    accessor: "reserved_quantity",
  },
  { Header: () => i18n.t("columns.erp_warehouse"), accessor: "erp_warehouse" },
  {
    Header: () => i18n.t("columns.functional_zone"),
    accessor: "functional_zone",
  },
  {
    Header: () => i18n.t("columns.product_commodity_code"),
    accessor: "product_commodity_code",
  },
  { Header: () => i18n.t("columns.created_date"), accessor: "created_date" },
  { Header: () => i18n.t("columns.updated_date"), accessor: "updated_date" },
]
const cellItemTradeItemsTableColumns: Array<Column<CellItemsTradeItem>> = [
  { Header: () => i18n.t("columns.type"), accessor: "type" },
  { Header: () => i18n.t("columns.warehouse_id"), accessor: "warehouse_id" },
  { Header: () => i18n.t("columns.barcode"), accessor: "barcode" },
  {
    Header: () => i18n.t("columns.trade_item_type"),
    accessor: "trade_item_type",
  },
  { Header: () => i18n.t("columns.state"), accessor: "state" },
  { Header: () => i18n.t("columns.cell_state"), accessor: "cell_state" },
  {
    Header: () => i18n.t("columns.functional_zone"),
    accessor: "functional_zone",
  },
  { Header: () => i18n.t("columns.created_date"), accessor: "created_date" },
  { Header: () => i18n.t("columns.updated_date"), accessor: "updated_date" },
]
type CellItemsSelectedRows = {
  product: string
  tradeItem: string
}
const CellItemsTable: React.FC<{
  setAlertList: Dispatch<SetStateAction<AlertListItem[]>>
}> = ({ setAlertList }) => {
  const dispach = useAppDispatch()
  const { t } = useTranslation()
  const cellItemProducts = useAppSelector(selectCellItemProductTableData)
  const cellItemTradeItems = useAppSelector(selectCellItemTradeItemTableData)
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  )
  const selectedTE = useAppSelector((state) => state.products.selectedTE)

  const [formState, setFormState] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<CellItemsSelectedRows>({
    product: EmptyString,
    tradeItem: EmptyString,
  })

  const editMode = Boolean(selectedProduct) || Boolean(selectedTE)

  const handleOpenProductTEForm = (isEdit?: boolean) => {
    if (isEdit && !selectedProduct && !selectedTE) {
      setAlertList((prev) => [
        ...prev,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.warning"),
          message: t("alerts.warningMessage"),
          icon: AiOutlineWarning,
          bgColor: appColors.warning,
        },
      ])
    } else if (isEdit) {
      setFormState(true)
    } else {
      setFormState(true)
      dispach(setSelectedTE())
      dispach(setSelectedProduct())
    }
  }
  const handleCloseProductTEForm = () => {
    setFormState(false)
  }

  const handleClickProductsRow = (item: CellItemsProduct) => {
    setSelectedRows({ ...selectedRows, product: item.sku })
    dispach(setSelectedProduct(item.id))
  }
  const handleClickTradeItemsRow = (item: CellItemsTradeItem) => {
    setSelectedRows({ ...selectedRows, tradeItem: item.barcode })
    dispach(setSelectedTE(item.barcode))
  }

  return (
    <Fragment>
      <Modal
        open={formState}
        title={editMode ? t("buttons.edit") : t("buttons.add")}
        onClose={handleCloseProductTEForm}
        className="side"
      >
        <ProductTEForm onClose={handleCloseProductTEForm} />
      </Modal>
      <Tabs>
        <FlexJustifyBetween className="align-items-start">
          <TabList>
            <Tab>{t("tabs.products")}</Tab>
            <Tab>{t("tabs.tradeItems")}</Tab>
          </TabList>
          <ActionGroupWrapper>
            <IconButton
              onClick={handleOpenProductTEForm}
              popupText={t("buttons.add")}
            >
              <AiOutlinePlus />
            </IconButton>
            <IconButton
              onClick={() => handleOpenProductTEForm(true)}
              popupText={t("buttons.edit")}
            >
              <AiOutlineEdit />
            </IconButton>
          </ActionGroupWrapper>
        </FlexJustifyBetween>
        <TabPanel>
          <TableWrapper>
            <CustomTable
              data={cellItemProducts}
              columns={cellItemProductsTableColumns}
              selectedRow={selectedRows.product}
              handleClickRow={handleClickProductsRow}
              selectedRowChecker={"sku"}
            />
          </TableWrapper>
        </TabPanel>
        <TabPanel>
          <TableWrapper>
            <CustomTable
              data={cellItemTradeItems}
              columns={cellItemTradeItemsTableColumns}
              selectedRow={selectedRows.tradeItem}
              handleClickRow={handleClickTradeItemsRow}
              selectedRowChecker={"barcode"}
            />
          </TableWrapper>
        </TabPanel>
      </Tabs>
    </Fragment>
  )
}

export default React.memo(CellItemsTable)
