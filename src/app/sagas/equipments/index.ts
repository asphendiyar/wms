import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  EquipmentEnums,
  EquipmentsBase,
  EquipmentsContentType,
  EquipmentsParams,
  EquipmentsWithPage,
} from "../../reducers/equipments/types";

import {
  getAllEquipments,
  getDetailedEquipments,
  postEquipments,
  putEquipments,
} from "./requests";
import {
  setAddEquipments,
  setGetAllEquipments,
  setGetDetailedEquipments,
  setPutEquipments,
  setSearchGetAllEquipments,
} from "../../reducers/equipments";

function* postEquipmentsWorker({
  payload,
  type,
}: WorkerParams<EquipmentsBase>) {
  yield fetchGenerator<EquipmentsBase, PostResponse | null>(
    postEquipments,
    payload,
    setAddEquipments,
    type
  );
}

function* putEquipmentsWorker({
  payload,
  type,
}: WorkerParams<EquipmentsParams>) {
  yield fetchGenerator<EquipmentsParams, PutResponse | null>(
    putEquipments,
    payload,
    setPutEquipments,
    type
  );
}

function* getAllEquipmentsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, EquipmentsWithPage>(
    getAllEquipments,
    payload,
    setGetAllEquipments,
    type
  );
}

function* getSearchAllEquipmentsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, EquipmentsWithPage>(
    getAllEquipments,
    payload,
    setSearchGetAllEquipments,
    type
  );
}

function* getDetailedEquipmentsWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, EquipmentsContentType>(
    getDetailedEquipments,
    payload,
    setGetDetailedEquipments,
    type
  );
}

export function* equipmentsWatcher() {
  yield all([
    takeEvery(EquipmentEnums.getAllEquipments, getAllEquipmentsWorker),
    takeEvery(
      EquipmentEnums.getSearchAllEquipments,
      getSearchAllEquipmentsWorker
    ),
    takeLatest(
      EquipmentEnums.getDetailedEquipments,
      getDetailedEquipmentsWorker
    ),
    takeLatest(EquipmentEnums.postEquipments, postEquipmentsWorker),
    takeLatest(EquipmentEnums.putEquipments, putEquipmentsWorker),
  ]);
}
