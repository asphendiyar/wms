import { createAction } from "@reduxjs/toolkit"
import {
  AdjustProducts,
  AdjustTE,
  GetCellItemsParams,
  ProductsEnums,
} from "./types"

export const getCellItemsAction = createAction<GetCellItemsParams>(
  ProductsEnums.getCellItems
)
export const adjustProductsAction = createAction<AdjustProducts>(
  ProductsEnums.adjustProducts
)
export const adjustTEAction = createAction<AdjustTE>(ProductsEnums.adjustTE)
