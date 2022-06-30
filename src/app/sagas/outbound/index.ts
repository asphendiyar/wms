import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";
import {
  PatchOutboundParams,
  OutboundContentType,
  OutboundsWithPage,
  OutboundEnums,
} from "../../reducers/outbound/types";
import {
  getAllOutbounds,
  getOutbound,
  patchOutboundAttachShipment,
  patchOutboundClose,
  patchOutboundCollect,
} from "./requests";
import {
  setGetAllOutbounds,
  setGetOutbound,
  setPatchCloseOutbound,
  setPatchCollectOutbound,
  setPatchAttachOutbound,
  setSearchGetAllOutbounds,
} from "../../reducers/outbound";

function* getAllOutboundsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, OutboundsWithPage>(
    getAllOutbounds,
    payload,
    setGetAllOutbounds,
    type
  );
}

function* getSearchAllOutboundsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, OutboundsWithPage>(
    getAllOutbounds,
    payload,
    setSearchGetAllOutbounds,
    type
  );
}

function* getOutboundWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, OutboundContentType>(
    getOutbound,
    payload,
    setGetOutbound,
    type
  );
}

function* patchOutboundCollectWorker({
  payload,
  type,
}: WorkerParams<PatchOutboundParams>) {
  yield fetchGenerator<PatchOutboundParams, PutResponse | null>(
    patchOutboundCollect,
    payload,
    setPatchCollectOutbound,
    type
  );
}

function* patchOutboundCloseWorker({
  payload,
  type,
}: WorkerParams<PatchOutboundParams>) {
  yield fetchGenerator<PatchOutboundParams, PutResponse | null>(
    patchOutboundClose,
    payload,
    setPatchCloseOutbound,
    type
  );
}

function* patchOutboundAttachShipmentWorker({
  payload,
  type,
}: WorkerParams<PatchOutboundParams>) {
  yield fetchGenerator<PatchOutboundParams, PutResponse | null>(
    patchOutboundAttachShipment,
    payload,
    setPatchAttachOutbound,
    type
  );
}

export function* outboundsWatcher() {
  yield all([
    takeLatest(OutboundEnums.getAllOutbound, getAllOutboundsWorker),
    takeLatest(OutboundEnums.getSearchAllOutbound, getSearchAllOutboundsWorker),
    takeLatest(OutboundEnums.getOneOutbound, getOutboundWorker),
    takeLatest(OutboundEnums.patchOutboundCollect, patchOutboundCollectWorker),
    takeLatest(OutboundEnums.patchOutboundClose, patchOutboundCloseWorker),
    takeLatest(
      OutboundEnums.patchOutboundAttach,
      patchOutboundAttachShipmentWorker
    ),
  ]);
}
