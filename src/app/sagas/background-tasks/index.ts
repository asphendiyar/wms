import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  BackgroundTaskEnums,
  BackgroundTasksContentType,
  BackgroundTasksFormValues,
  BackgroundTasksParams,
  BackgroundTasksWithPage,
} from "../../reducers/background-tasks/types";

import {
  getAllBackgroundTasks,
  getDetailedBackgroundTasks,
  postBackgroundTasks,
  putBackgroundTasks,
} from "./requests";
import {
  setAddBackgroundTasks,
  setGetAllBackgroundTasks,
  setGetDetailedBackgroundTasks,
  setPutBackgroundTasks,
  setSearchGetAllBackgroundTasks,
} from "../../reducers/background-tasks";

function* postBackgroundTasksWorker({
  payload,
  type,
}: WorkerParams<BackgroundTasksFormValues>) {
  yield fetchGenerator<BackgroundTasksFormValues, PostResponse | null>(
    postBackgroundTasks,
    payload,
    setAddBackgroundTasks,
    type
  );
}

function* putBackgroundTasksWorker({
  payload,
  type,
}: WorkerParams<BackgroundTasksParams>) {
  yield fetchGenerator<BackgroundTasksParams, PutResponse | null>(
    putBackgroundTasks,
    payload,
    setPutBackgroundTasks,
    type
  );
}

function* getAllBackgroundTasksWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, BackgroundTasksWithPage>(
    getAllBackgroundTasks,
    payload,
    setGetAllBackgroundTasks,
    type
  );
}

function* getSearchAllBackgroundTasksWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, BackgroundTasksWithPage>(
    getAllBackgroundTasks,
    payload,
    setSearchGetAllBackgroundTasks,
    type
  );
}

function* getDetailedBackgroundTasksWorker({
  payload,
  type,
}: WorkerParams<number>) {
  yield fetchGenerator<number, BackgroundTasksContentType>(
    getDetailedBackgroundTasks,
    payload,
    setGetDetailedBackgroundTasks,
    type
  );
}

export function* backgroundTasksWatcher() {
  yield all([
    takeEvery(
      BackgroundTaskEnums.getAllBackgroundTasks,
      getAllBackgroundTasksWorker
    ),
    takeEvery(
      BackgroundTaskEnums.getSearchAllBackgroundTasks,
      getSearchAllBackgroundTasksWorker
    ),
    takeLatest(
      BackgroundTaskEnums.getDetailedBackgroundTasks,
      getDetailedBackgroundTasksWorker
    ),
    takeLatest(
      BackgroundTaskEnums.postBackgroundTasks,
      postBackgroundTasksWorker
    ),
    takeLatest(
      BackgroundTaskEnums.putBackgroundTasks,
      putBackgroundTasksWorker
    ),
  ]);
}
