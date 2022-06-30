import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  MeasureUnitEnums,
  MeasureUnitsBase,
  MeasureUnitsContentType,
  MeasureUnitsParams,
} from "../../reducers/measure-units/types";
import {
  setAddMeasureUnits,
  setGetAllMeasureUnits,
  setGetDetailedMeasureUnits,
  setPutMeasureUnits,
} from "../../reducers/measure-units";
import {
  getAllMeasureUnits,
  getDetailedMeasureUnits,
  postMeasureUnits,
  putMeasureUnits,
} from "./requests";

function* postMeasureUnitsWorker({
  payload,
  type,
}: WorkerParams<MeasureUnitsBase>) {
  yield fetchGenerator<MeasureUnitsBase, PostResponse | null>(
    postMeasureUnits,
    payload,
    setAddMeasureUnits,
    type
  );
}

function* putMeasureUnitsWorker({
  payload,
  type,
}: WorkerParams<MeasureUnitsParams>) {
  yield fetchGenerator<MeasureUnitsParams, PutResponse | null>(
    putMeasureUnits,
    payload,
    setPutMeasureUnits,
    type
  );
}

function* getAllMeasureUnitsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, MeasureUnitsContentType[]>(
    getAllMeasureUnits,
    payload,
    setGetAllMeasureUnits,
    type
  );
}

function* getDetailedMeasureUnitsWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, MeasureUnitsContentType>(
    getDetailedMeasureUnits,
    payload,
    setGetDetailedMeasureUnits,
    type
  );
}

export function* measureUnitsWatcher() {
  yield all([
    takeEvery(MeasureUnitEnums.getAllMeasureUnits, getAllMeasureUnitsWorker),
    takeLatest(
      MeasureUnitEnums.getDetailedMeasureUnits,
      getDetailedMeasureUnitsWorker
    ),
    takeLatest(MeasureUnitEnums.postMeasureUnits, postMeasureUnitsWorker),
    takeLatest(MeasureUnitEnums.putMeasureUnits, putMeasureUnitsWorker),
  ]);
}
