import { all, takeEvery, takeLatest } from "@redux-saga/core/effects"
import { fetchGenerator } from ".."
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes"
import {
  setAddCellTypes,
  setDetailedCellType,
  setGetAllCellTypes,
  setPutCellTypes,
  setSearchGetAllCellTypes,
} from "../../reducers/cell-types"
import {
  CellTypeEnums,
  CellTypesContentType,
  CellTypesFormValues,
  CellTypesParams,
  CellTypesWithPage,
} from "../../reducers/cell-types/types"
import {
  getAllCellTypes,
  getDetailedCellType,
  postCellTypes,
  putCellTypes,
} from "./requests"

function* postCellTypesWorker({
  payload,
  type,
}: WorkerParams<CellTypesFormValues>) {
  yield fetchGenerator<CellTypesFormValues, PostResponse | null>(
    postCellTypes,
    payload,
    setAddCellTypes,
    type
  )
}

function* putCellTypesWorker({ payload, type }: WorkerParams<CellTypesParams>) {
  yield fetchGenerator<CellTypesParams, PutResponse | null>(
    putCellTypes,
    payload,
    setPutCellTypes,
    type
  )
}

function* getAllCellTypesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CellTypesWithPage>(
    getAllCellTypes,
    payload,
    setGetAllCellTypes,
    type
  )
}

function* getSearchAllCellTypesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CellTypesWithPage>(
    getAllCellTypes,
    payload,
    setSearchGetAllCellTypes,
    type
  )
}

function* getDetailedCellTypesWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, CellTypesContentType>(
    getDetailedCellType,
    payload,
    setDetailedCellType,
    type
  )
}

export function* cellTypesWatcher() {
  yield all([
    takeEvery(CellTypeEnums.getAllCellTypes, getAllCellTypesWorker),
    takeLatest(CellTypeEnums.getDetailedCellTypes, getDetailedCellTypesWorker),
    takeLatest(CellTypeEnums.postCellTypes, postCellTypesWorker),
    takeLatest(CellTypeEnums.putCellTypes, putCellTypesWorker),
    takeLatest(
      CellTypeEnums.getSearchAllCellTypes,
      getSearchAllCellTypesWorker
    ),
  ])
}
