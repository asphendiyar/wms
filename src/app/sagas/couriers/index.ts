import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  CourierEnums,
  CouriersContentType,
  CouriersFormValues,
  CouriersParams,
  CouriersWithPage,
} from "../../reducers/couriers/types";

import {
  getAllCouriers,
  getDetailedCouriers,
  postCouriers,
  putCouriers,
} from "./requests";
import {
  setAddCouriers,
  setGetAllCouriers,
  setGetDetailedCouriers,
  setPutCouriers,
  setSearchGetAllCouriers,
} from "../../reducers/couriers";

function* postCouriersWorker({
  payload,
  type,
}: WorkerParams<CouriersFormValues>) {
  yield fetchGenerator<CouriersFormValues, PostResponse | null>(
    postCouriers,
    payload,
    setAddCouriers,
    type
  );
}

function* putCouriersWorker({ payload, type }: WorkerParams<CouriersParams>) {
  yield fetchGenerator<CouriersParams, PutResponse | null>(
    putCouriers,
    payload,
    setPutCouriers,
    type
  );
}

function* getAllCouriersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CouriersWithPage>(
    getAllCouriers,
    payload,
    setGetAllCouriers,
    type
  );
}

function* getSearchAllCouriersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CouriersWithPage>(
    getAllCouriers,
    payload,
    setSearchGetAllCouriers,
    type
  );
}

function* getDetailedCouriersWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, CouriersContentType>(
    getDetailedCouriers,
    payload,
    setGetDetailedCouriers,
    type
  );
}

export function* couriersWatcher() {
  yield all([
    takeEvery(CourierEnums.getAllCouriers, getAllCouriersWorker),
    takeEvery(CourierEnums.getSearchAllCouriers, getSearchAllCouriersWorker),
    takeLatest(CourierEnums.getDetailedCouriers, getDetailedCouriersWorker),
    takeLatest(CourierEnums.postCouriers, postCouriersWorker),
    takeLatest(CourierEnums.putCouriers, putCouriersWorker),
  ]);
}
