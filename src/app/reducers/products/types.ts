import { TreeNode } from "../../commonTypes"
import { WarehouseMapAddressesResponse } from "../warehouse-map/types"
import { WarehouseAllTypes } from "../warehouse/types"

export type GetCellItemsParams = {
  warehouse_id: string
  address: string
}
export type CellItemsProduct = {
  id: number
  cell_state: string
  type: string
  sku: string
  description: string
  address: string
  trade_item_barcode: string
  trade_item_state: string
  quantity: number
  available_quantity: number
  reserved_quantity: number
  erp_warehouse: string
  functional_zone: string
  warehouse_id: number
  product_commodity_code: string
  created_date: string
  updated_date: string
}
export type CellItemsTradeItem = {
  type: string
  barcode: string
  trade_item_type: string
  state: string
  address: string
  cell_state: string
  functional_zone: string
  warehouse_id: number
  created_date: string
  updated_date: string
}
export type CellItem = {
  products: CellItemsProduct[]
  trade_items: CellItemsTradeItem[]
}
export type ProductsCellsTree = { [key: string]: TreeNode }
export type AdjustProducts = {
  warehouse_id: number
  erp_warehouse: string
  cell: string
  sku: string
  quantity: number
}
export type AdjustTE = AdjustProducts & { barcode: string }
export type ProductsInitials = {
  tree: ProductsCellsTree
  productWarehouses: WarehouseAllTypes | undefined
  warehouseProductsCells: WarehouseMapAddressesResponse | undefined
  cellItems: CellItem
  selectedRootWarehouseId: string
  selectedNode: TreeNode | undefined
  selectedProduct: CellItemsProduct | undefined
  selectedTE: CellItemsTradeItem | undefined
}

export enum ProductsEnums {
  getCellItems = "products/cells/items/get",
  adjustProducts = "products/items/adjust/product",
  adjustTE = "products/items/adjust/te",
}
