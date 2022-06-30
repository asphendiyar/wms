import { all, takeEvery } from "redux-saga/effects";
import { fetchGenerator } from "..";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import {
  setCreateInventories,
  setGetAllInventories,
  setGetAllInventoryTasks,
  setGetDetailedInventories,
  setPatchRestartInventories,
  setPatchStatusInventories,
  setPutInventories,
  setSearchGetAllInventories,
  setSearchGetAllInventoryTasks,
} from "../../reducers/inventories";
import {
  InventoriesContentType,
  InventoriesEnums,
  InventoriesFormValues,
  InventoriesParams,
  InventoriesWithPage,
  InventoryTasksWithPage,
  PatchInventoriesParams,
} from "../../reducers/inventories/types";
import {
  getAllInventories,
  getAllInventoryTasks,
  getDetailedInventories,
  patchRestartInventories,
  patchStatusInventories,
  postInventories,
  putInventories,
} from "./requests";

function* getAllInventoryTasksWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, InventoryTasksWithPage>(
    getAllInventoryTasks,
    payload,
    setGetAllInventoryTasks,
    type
  );
}
function* getSearchAllInventoryTasksWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, InventoryTasksWithPage>(
    getAllInventoryTasks,
    payload,
    setSearchGetAllInventoryTasks,
    type
  );
}

function* getAllInventoriesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, InventoriesWithPage>(
    getAllInventories,
    payload,
    setGetAllInventories,
    type
  );
}
function* getSearchAllInventoriesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, InventoriesWithPage>(
    getAllInventories,
    payload,
    setSearchGetAllInventories,
    type
  );
}
function* postInventoriesWorker({
  payload,
  type,
}: WorkerParams<InventoriesFormValues>) {
  yield fetchGenerator<InventoriesFormValues, PostResponse | null>(
    postInventories,
    payload,
    setCreateInventories,
    type
  );
}
function* putInventoriesWorker({
  payload,
  type,
}: WorkerParams<InventoriesParams>) {
  yield fetchGenerator<InventoriesParams, PutResponse | null>(
    putInventories,
    payload,
    setPutInventories,
    type
  );
}
function* getDetailedInventoriesWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, InventoriesContentType>(
    getDetailedInventories,
    payload,
    setGetDetailedInventories,
    type
  );
}

function* patchRestartInventoriesWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, PutResponse | null>(
    patchRestartInventories,
    payload,
    setPatchRestartInventories,
    type
  );
}
function* patchStatusInventoriesWorker({
  payload,
  type,
}: WorkerParams<PatchInventoriesParams>) {
  yield fetchGenerator<PatchInventoriesParams, PutResponse | null>(
    patchStatusInventories,
    payload,
    setPatchStatusInventories,
    type
  );
}

export function* inventoriesWatcher() {
  yield all([
    takeEvery(InventoriesEnums.getInventoryTasks, getAllInventoryTasksWorker),
    takeEvery(
      InventoriesEnums.getSearchInventoryTasks,
      getSearchAllInventoryTasksWorker
    ),
    takeEvery(InventoriesEnums.getAllInventories, getAllInventoriesWorker),
    takeEvery(
      InventoriesEnums.getSearchAllInventories,
      getSearchAllInventoriesWorker
    ),
    takeEvery(
      InventoriesEnums.getDetailedInventories,
      getDetailedInventoriesWorker
    ),
    takeEvery(InventoriesEnums.postInventories, postInventoriesWorker),
    takeEvery(InventoriesEnums.putInventories, putInventoriesWorker),
    takeEvery(
      InventoriesEnums.patchRestartInventories,
      patchRestartInventoriesWorker
    ),
    takeEvery(
      InventoriesEnums.patchStatusInventories,
      patchStatusInventoriesWorker
    ),
  ]);
}
