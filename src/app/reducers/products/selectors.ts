import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { CellItemsProduct, CellItemsTradeItem } from "./types"

export const selectCellItemProductTableData = createSelector(
  (state: RootState) => state.products.cellItems,
  (cellItems): CellItemsProduct[] => cellItems.products
)
export const selectCellItemTradeItemTableData = createSelector(
  (state: RootState) => state.products.cellItems,
  (cellItems): CellItemsTradeItem[] => cellItems.trade_items
)
export const selectActiveRootWarehouse = createSelector(
  [
    (state: RootState) => state.products.selectedRootWarehouseId,
    (state: RootState) => state.products.tree,
  ],
  (id, tree) => tree[`root${id}`]
)
