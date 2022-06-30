import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  CommoditiesBase,
  CommoditiesContentType,
  CommoditiesParams,
  CommoditiesWithPage,
  CommodityEnums,
} from "../../reducers/commodities/types";

import {
  getAllCommodities,
  getDetailedCommodities,
  postCommodities,
  putCommodities,
} from "./requests";
import {
  setAddCommodities,
  setGetAllCommodities,
  setGetDetailedCommodities,
  setPutCommodities,
  setSearchGetAllCommodities,
} from "../../reducers/commodities";

function* postCommoditiesWorker({
  payload,
  type,
}: WorkerParams<CommoditiesBase>) {
  yield fetchGenerator<CommoditiesBase, PostResponse | null>(
    postCommodities,
    payload,
    setAddCommodities,
    type
  );
}

function* putCommoditiesWorker({
  payload,
  type,
}: WorkerParams<CommoditiesParams>) {
  yield fetchGenerator<CommoditiesParams, PutResponse | null>(
    putCommodities,
    payload,
    setPutCommodities,
    type
  );
}

function* getAllCommoditiesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CommoditiesWithPage>(
    getAllCommodities,
    payload,
    setGetAllCommodities,
    type
  );
}

function* getSearchAllCommoditiesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CommoditiesWithPage>(
    getAllCommodities,
    payload,
    setSearchGetAllCommodities,
    type
  );
}

function* getDetailedCommoditiesWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, CommoditiesContentType>(
    getDetailedCommodities,
    payload,
    setGetDetailedCommodities,
    type
  );
}

export function* commoditiesWatcher() {
  yield all([
    takeEvery(CommodityEnums.getAllCommodities, getAllCommoditiesWorker),
    takeEvery(
      CommodityEnums.getSearchAllCommodities,
      getSearchAllCommoditiesWorker
    ),
    takeLatest(
      CommodityEnums.getDetailedCommodities,
      getDetailedCommoditiesWorker
    ),
    takeLatest(CommodityEnums.postCommodities, postCommoditiesWorker),
    takeLatest(CommodityEnums.putCommodities, putCommoditiesWorker),
  ]);
}
