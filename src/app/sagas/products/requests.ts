import { fetchHelper } from "../../helpers"
import { BASE_URL, pathnames } from "../../pathnames"
import {
  AdjustProducts,
  AdjustTE,
  GetCellItemsParams,
} from "../../reducers/products/types"

export const getCellItems = async ({
  warehouse_id,
  address,
}: GetCellItemsParams) => {
  return fetchHelper(
    `${
      BASE_URL + pathnames.cells
    }items?warehouse_id=${warehouse_id}&address=${address}`,
    "GET"
  )
}
export const adjustProducts = async (payload: AdjustProducts) => {
  return fetchHelper(
    `${BASE_URL + pathnames.items}products/adjust`,
    "PATCH",
    payload
  )
}
export const adjustTE = async (payload: AdjustTE) => {
  return fetchHelper(
    `${BASE_URL + pathnames.items}trade-item/adjust`,
    "PATCH",
    payload
  )
}
