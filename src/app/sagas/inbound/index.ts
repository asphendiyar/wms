import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";
import {
  PatchInboundParams,
  InboundContentType,
  InboundsWithPage,
  InboundEnums,
} from "../../reducers/inbound/types";
import {
  getAllInbounds,
  getInbound,
  patchInboundClose,
  patchInboundDecline,
  patchInboundOpen,
} from "./requests";
import {
  setSearchGetAllInbounds,
  setGetAllRampsInbounds,
  setGetInbound,
  setPatchCloseInbound,
  setPatchOpenInbound,
  setGetAllInbounds,
  setPatchDeclineInbound,
} from "../../reducers/inbound";
import { RampsType } from "../../reducers/warehouse/types";
import { getRampsWarehouse } from "../warehouse/requests";

function* getAllInboundsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, InboundsWithPage>(
    getAllInbounds,
    payload,
    setGetAllInbounds,
    type
  );
}

function* getSearchAllInboundsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, InboundsWithPage>(
    getAllInbounds,
    payload,
    setSearchGetAllInbounds,
    type
  );
}

function* getInboundWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, InboundContentType>(
    getInbound,
    payload,
    setGetInbound,
    type
  );
}

function* patchInboundOpenWorker({
  payload,
  type,
}: WorkerParams<PatchInboundParams>) {
  yield fetchGenerator<PatchInboundParams, PutResponse | null>(
    patchInboundOpen,
    payload,
    setPatchOpenInbound,
    type
  );
}

function* patchInboundCloseWorker({
  payload,
  type,
}: WorkerParams<PatchInboundParams>) {
  yield fetchGenerator<PatchInboundParams, PutResponse | null>(
    patchInboundClose,
    payload,
    setPatchCloseInbound,
    type
  );
}
function* patchInboundDeclineWorker({
  payload,
  type,
}: WorkerParams<PatchInboundParams>) {
  yield fetchGenerator<PatchInboundParams, PutResponse | null>(
    patchInboundDecline,
    payload,
    setPatchDeclineInbound,
    type
  );
}

function* getAllRampsInboundWorker({ payload, type }: WorkerParams<null>) {
  yield fetchGenerator<null, RampsType>(
    getRampsWarehouse,
    payload,
    setGetAllRampsInbounds,
    type
  );
}

export function* inboundsWatcher() {
  yield all([
    takeLatest(InboundEnums.getAllInbound, getAllInboundsWorker),
    takeLatest(InboundEnums.getOneInbound, getInboundWorker),
    takeLatest(InboundEnums.patchInboundOpen, patchInboundOpenWorker),
    takeLatest(InboundEnums.patchInboundClose, patchInboundCloseWorker),
    takeLatest(InboundEnums.patchInboundDecline, patchInboundDeclineWorker),
    takeLatest(InboundEnums.getAllRampsInbound, getAllRampsInboundWorker),
    takeLatest(InboundEnums.getSearchAllInbound, getSearchAllInboundsWorker),
  ]);
}
