import { all, takeEvery } from "redux-saga/effects";
import { fetchGenerator } from "..";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import {
  setCreatePrinters,
  setGetAllPrinters,
  setGetDetailedPrinters,
  setPutPrinters,
  setSearchGetAllPrinters,
} from "../../reducers/printers";
import {
  PrintersContentType,
  PrintersEnums,
  PrintersFormValues,
  PrintersParams,
  PrintersWithPage,
} from "../../reducers/printers/types";
import {
  getAllPrinters,
  getDetailedPrinters,
  postPrinters,
  putPrinters,
} from "./requests";

function* getAllPrintersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PrintersWithPage>(
    getAllPrinters,
    payload,
    setGetAllPrinters,
    type
  );
}
function* getSearchAllPrintersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PrintersWithPage>(
    getAllPrinters,
    payload,
    setSearchGetAllPrinters,
    type
  );
}
function* postPrintersWorker({
  payload,
  type,
}: WorkerParams<PrintersFormValues>) {
  yield fetchGenerator<PrintersFormValues, PostResponse | null>(
    postPrinters,
    payload,
    setCreatePrinters,
    type
  );
}
function* putPrintersWorker({ payload, type }: WorkerParams<PrintersParams>) {
  yield fetchGenerator<PrintersParams, PutResponse | null>(
    putPrinters,
    payload,
    setPutPrinters,
    type
  );
}
function* getDetailedPrintersWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, PrintersContentType>(
    getDetailedPrinters,
    payload,
    setGetDetailedPrinters,
    type
  );
}

export function* printersWatcher() {
  yield all([
    takeEvery(PrintersEnums.getAllPrinters, getAllPrintersWorker),
    takeEvery(PrintersEnums.getSearchAllPrinters, getSearchAllPrintersWorker),
    takeEvery(PrintersEnums.getDetailedPrinters, getDetailedPrintersWorker),
    takeEvery(PrintersEnums.postPrinters, postPrintersWorker),
    takeEvery(PrintersEnums.putPrinters, putPrintersWorker),
  ]);
}
