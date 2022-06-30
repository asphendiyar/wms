import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  PickingPrioritiesBase,
  PickingPrioritiesContentType,
  PickingPrioritiesParams,
  PickingPrioritiesWithPage,
  PickingPriorityEnums,
} from "../../reducers/picking-priority/types";

import {
  getAllPickingPriorities,
  getDetailedPickingPriorities,
  postPickingPriorities,
  putPickingPriorities,
} from "./requests";
import {
  setAddPickingPriorities,
  setGetAllPickingPriorities,
  setGetDetailedPickingPriorities,
  setPutPickingPriorities,
  setSearchGetAllPickingPriorities,
} from "../../reducers/picking-priority";

function* postPickingPrioritiesWorker({
  payload,
  type,
}: WorkerParams<PickingPrioritiesBase>) {
  yield fetchGenerator<PickingPrioritiesBase, PostResponse | null>(
    postPickingPriorities,
    payload,
    setAddPickingPriorities,
    type
  );
}

function* putPickingPrioritiesWorker({
  payload,
  type,
}: WorkerParams<PickingPrioritiesParams>) {
  yield fetchGenerator<PickingPrioritiesParams, PutResponse | null>(
    putPickingPriorities,
    payload,
    setPutPickingPriorities,
    type
  );
}

function* getAllPickingPrioritiesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PickingPrioritiesWithPage>(
    getAllPickingPriorities,
    payload,
    setGetAllPickingPriorities,
    type
  );
}

function* getSearchAllPickingPrioritiesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PickingPrioritiesWithPage>(
    getAllPickingPriorities,
    payload,
    setSearchGetAllPickingPriorities,
    type
  );
}

function* getDetailedPickingPrioritiesWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, PickingPrioritiesContentType>(
    getDetailedPickingPriorities,
    payload,
    setGetDetailedPickingPriorities,
    type
  );
}

export function* pickingPriorityWatcher() {
  yield all([
    takeEvery(
      PickingPriorityEnums.getAllPickingPriorities,
      getAllPickingPrioritiesWorker
    ),
    takeEvery(
      PickingPriorityEnums.getSearchAllPickingPriorities,
      getSearchAllPickingPrioritiesWorker
    ),
    takeLatest(
      PickingPriorityEnums.getDetailedPickingPriorities,
      getDetailedPickingPrioritiesWorker
    ),
    takeLatest(
      PickingPriorityEnums.postPickingPriorities,
      postPickingPrioritiesWorker
    ),
    takeLatest(
      PickingPriorityEnums.putPickingPriorities,
      putPickingPrioritiesWorker
    ),
  ]);
}
