import { all, takeEvery } from "redux-saga/effects"
import { fetchGenerator } from ".."
import { WorkerParams } from "../../commonTypes"
import { setCellItems } from "../../reducers/products"
import {
  AdjustProducts,
  AdjustTE,
  GetCellItemsParams,
  ProductsEnums,
} from "../../reducers/products/types"
import { adjustProducts, adjustTE, getCellItems } from "./requests"

function* getCellItemsWorker({
  payload,
  type,
}: WorkerParams<GetCellItemsParams>) {
  yield fetchGenerator(getCellItems, payload, setCellItems, type)
}
function* adjustProductWorker({ payload, type }: WorkerParams<AdjustProducts>) {
  yield fetchGenerator(adjustProducts, payload, null, type)
}
function* adjustTEWorker({ payload, type }: WorkerParams<AdjustTE>) {
  yield fetchGenerator(adjustTE, payload, null, type)
}
export function* productsWatcher() {
  yield all([
    takeEvery(ProductsEnums.getCellItems, getCellItemsWorker),
    takeEvery(ProductsEnums.adjustProducts, adjustProductWorker),
    takeEvery(ProductsEnums.adjustTE, adjustTEWorker),
  ])
}
