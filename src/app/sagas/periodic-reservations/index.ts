import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  PeriodicReservationEnums,
  PeriodicReservationsContentType,
  PeriodicReservationsFormValues,
  PeriodicReservationsParams,
  PeriodicReservationsWithPage,
} from "../../reducers/periodic-reservations/types";

import {
  getAllPeriodicReservations,
  getDetailedPeriodicReservations,
  postPeriodicReservations,
  putPeriodicReservations,
} from "./requests";
import {
  setAddPeriodicReservations,
  setDeletePeriodicReservations,
  setGetAllPeriodicReservations,
  setGetDetailedPeriodicReservations,
  setPutPeriodicReservations,
  setSearchGetAllPeriodicReservations,
} from "../../reducers/periodic-reservations";

function* postPeriodicReservationsWorker({
  payload,
  type,
}: WorkerParams<PeriodicReservationsFormValues>) {
  yield fetchGenerator<PeriodicReservationsFormValues, PostResponse | null>(
    postPeriodicReservations,
    payload,
    setAddPeriodicReservations,
    type
  );
}

function* putPeriodicReservationsWorker({
  payload,
  type,
}: WorkerParams<PeriodicReservationsParams>) {
  yield fetchGenerator<PeriodicReservationsParams, PutResponse | null>(
    putPeriodicReservations,
    payload,
    setPutPeriodicReservations,
    type
  );
}

function* getAllPeriodicReservationsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PeriodicReservationsWithPage>(
    getAllPeriodicReservations,
    payload,
    setGetAllPeriodicReservations,
    type
  );
}

function* getSearchAllPeriodicReservationsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PeriodicReservationsWithPage>(
    getAllPeriodicReservations,
    payload,
    setSearchGetAllPeriodicReservations,
    type
  );
}

function* getDetailedPeriodicReservationsWorker({
  payload,
  type,
}: WorkerParams<number>) {
  yield fetchGenerator<number, PeriodicReservationsContentType>(
    getDetailedPeriodicReservations,
    payload,
    setGetDetailedPeriodicReservations,
    type
  );
}
function* deletePeriodicReservationsWorker({
  payload,
  type,
}: WorkerParams<number>) {
  yield fetchGenerator<number, PutResponse | null>(
    getDetailedPeriodicReservations,
    payload,
    setDeletePeriodicReservations,
    type
  );
}

export function* periodicReservationsWatcher() {
  yield all([
    takeEvery(
      PeriodicReservationEnums.getAllPeriodicReservations,
      getAllPeriodicReservationsWorker
    ),
    takeEvery(
      PeriodicReservationEnums.getSearchAllPeriodicReservations,
      getSearchAllPeriodicReservationsWorker
    ),
    takeLatest(
      PeriodicReservationEnums.getDetailedPeriodicReservations,
      getDetailedPeriodicReservationsWorker
    ),
    takeLatest(
      PeriodicReservationEnums.postPeriodicReservations,
      postPeriodicReservationsWorker
    ),
    takeLatest(
      PeriodicReservationEnums.putPeriodicReservations,
      putPeriodicReservationsWorker
    ),
    takeLatest(
      PeriodicReservationEnums.deletePeriodicReservations,
      deletePeriodicReservationsWorker
    ),
  ]);
}
