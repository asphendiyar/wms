import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  PopularitiesBase,
  PopularitiesContentType,
  PopularitiesParams,
  PopularitiesWithPage,
  PopularityEnums,
} from "../../reducers/popularities/types";

import {
  getAllPopularities,
  getDetailedPopularities,
  postPopularities,
  putPopularities,
} from "./requests";
import {
  setAddPopularities,
  setGetAllPopularities,
  setGetDetailedPopularities,
  setPutPopularities,
  setSearchGetAllPopularities,
} from "../../reducers/popularities";

function* postPopularitiesWorker({
  payload,
  type,
}: WorkerParams<PopularitiesBase>) {
  yield fetchGenerator<PopularitiesBase, PostResponse | null>(
    postPopularities,
    payload,
    setAddPopularities,
    type
  );
}

function* putPopularitiesWorker({
  payload,
  type,
}: WorkerParams<PopularitiesParams>) {
  yield fetchGenerator<PopularitiesParams, PutResponse | null>(
    putPopularities,
    payload,
    setPutPopularities,
    type
  );
}

function* getAllPopularitiesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PopularitiesWithPage>(
    getAllPopularities,
    payload,
    setGetAllPopularities,
    type
  );
}

function* getSearchAllPopularitiesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PopularitiesWithPage>(
    getAllPopularities,
    payload,
    setSearchGetAllPopularities,
    type
  );
}

function* getDetailedPopularitiesWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, PopularitiesContentType>(
    getDetailedPopularities,
    payload,
    setGetDetailedPopularities,
    type
  );
}

export function* popularitiesWatcher() {
  yield all([
    takeEvery(PopularityEnums.getAllPopularities, getAllPopularitiesWorker),
    takeEvery(
      PopularityEnums.getSearchAllPopularities,
      getSearchAllPopularitiesWorker
    ),
    takeLatest(
      PopularityEnums.getDetailedPopularities,
      getDetailedPopularitiesWorker
    ),
    takeLatest(PopularityEnums.postPopularities, postPopularitiesWorker),
    takeLatest(PopularityEnums.putPopularities, putPopularitiesWorker),
  ]);
}
