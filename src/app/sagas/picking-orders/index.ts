import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  PatchPickingOrdersParams,
  PickingOrderEnums,
  PickingOrdersContentType,
  PickingOrdersWithPage,
  PickingTasksTable,
} from "../../reducers/picking-orders/types";
import {
  getAllPickingOrders,
  getDetailedPickingOrders,
  patchPickPickingOrders,
  getPickingTasks,
} from "./requests";
import {
  setGetAllPickingOrders,
  setGetDetailedPickingOrders,
  setGetPickingTasks,
  setpatchPickPickingOrders,
  setSearchGetAllPickingOrders,
} from "../../reducers/picking-orders";

function* getAllPickingOrdersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PickingOrdersWithPage>(
    getAllPickingOrders,
    payload,
    setGetAllPickingOrders,
    type
  );
}

function* getSearchAllPickingOrdersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PickingOrdersWithPage>(
    getAllPickingOrders,
    payload,
    setSearchGetAllPickingOrders,
    type
  );
}

function* getDetailedPickingOrdersWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, PickingOrdersContentType>(
    getDetailedPickingOrders,
    payload,
    setGetDetailedPickingOrders,
    type
  );
}
function* getPickingTasksWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, PickingTasksTable[]>(
    getPickingTasks,
    payload,
    setGetPickingTasks,
    type
  );
}

function* patchPickPickingOrdersWorker({
  payload,
  type,
}: WorkerParams<PatchPickingOrdersParams>) {
  yield fetchGenerator<PatchPickingOrdersParams, PutResponse | null>(
    patchPickPickingOrders,
    payload,
    setpatchPickPickingOrders,
    type
  );
}

export function* pickingOrdersWatcher() {
  yield all([
    takeLatest(
      PickingOrderEnums.getAllPickingOrders,
      getAllPickingOrdersWorker
    ),
    takeLatest(
      PickingOrderEnums.getDetailedPickingOrder,
      getDetailedPickingOrdersWorker
    ),
    takeLatest(PickingOrderEnums.getPickingTasks, getPickingTasksWorker),
    takeLatest(
      PickingOrderEnums.getSearchAllPickingOrders,
      getSearchAllPickingOrdersWorker
    ),
    takeLatest(
      PickingOrderEnums.patchPickPickingOrders,
      patchPickPickingOrdersWorker
    ),
  ]);
}
