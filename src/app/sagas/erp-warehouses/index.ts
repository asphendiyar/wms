import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";
import {
  getAllErpWarehouses,
  getDetailedErpWarehouse,
  postErpWarehouses,
  putErpWarehouses,
} from "./requests";
import {
  ErpWarehouseEnums,
  ErpWarehousesContentType,
  ErpWarehousesFormValues,
  ErpWarehousesParams,
  ErpWarehousesWithPage,
} from "../../reducers/erp-warehouses/types";
import {
  setAddErpWarehouses,
  setGetAllErpWarehouses,
  setGetDetailedErpWarehouse,
  setPutErpWarehouses,
  setSearchGetAllErpWarehouses,
} from "../../reducers/erp-warehouses";

function* postErpWarehousesWorker({
  payload,
  type,
}: WorkerParams<ErpWarehousesFormValues>) {
  yield fetchGenerator<ErpWarehousesFormValues, PostResponse | null>(
    postErpWarehouses,
    payload,
    setAddErpWarehouses,
    type
  );
}

function* putErpWarehousesWorker({
  payload,
  type,
}: WorkerParams<ErpWarehousesParams>) {
  yield fetchGenerator<ErpWarehousesParams, PutResponse | null>(
    putErpWarehouses,
    payload,
    setPutErpWarehouses,
    type
  );
}

function* getAllErpWarehousesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ErpWarehousesWithPage>(
    getAllErpWarehouses,
    payload,
    setGetAllErpWarehouses,
    type
  );
}

function* getSearchAllErpWarehousesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ErpWarehousesWithPage>(
    getAllErpWarehouses,
    payload,
    setSearchGetAllErpWarehouses,
    type
  );
}

function* getDetailedErpWarehousesWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, ErpWarehousesContentType>(
    getDetailedErpWarehouse,
    payload,
    setGetDetailedErpWarehouse,
    type
  );
}

export function* erpWarehousesWatcher() {
  yield all([
    takeLatest(
      ErpWarehouseEnums.getAllErpWarehouses,
      getAllErpWarehousesWorker
    ),
    takeLatest(
      ErpWarehouseEnums.getDetailedErpWarehouses,
      getDetailedErpWarehousesWorker
    ),
    takeLatest(ErpWarehouseEnums.postErpWarehouses, postErpWarehousesWorker),
    takeLatest(ErpWarehouseEnums.putErpWarehouses, putErpWarehousesWorker),
    takeLatest(
      ErpWarehouseEnums.getSearchAllErpWarehouses,
      getSearchAllErpWarehousesWorker
    ),
  ]);
}
