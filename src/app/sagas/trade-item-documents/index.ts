import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { FilterPayloadTypes, WorkerParams } from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  TradeItemDocumentEnums,
  TradeItemDocumentsContentType,
  TradeItemDocumentsWithPage,
} from "../../reducers/trade-item-documents/types";

import {
  getAllTradeItemDocuments,
  getDetailedTradeItemDocuments,
} from "./requests";
import {
  setGetAllTradeItemDocuments,
  setGetDetailedTradeItemDocuments,
  setSearchGetAllTradeItemDocuments,
} from "../../reducers/trade-item-documents";

function* getAllTradeItemDocumentsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, TradeItemDocumentsWithPage>(
    getAllTradeItemDocuments,
    payload,
    setGetAllTradeItemDocuments,
    type
  );
}

function* getSearchAllTradeItemDocumentsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, TradeItemDocumentsWithPage>(
    getAllTradeItemDocuments,
    payload,
    setSearchGetAllTradeItemDocuments,
    type
  );
}

function* getDetailedTradeItemDocumentsWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, TradeItemDocumentsContentType>(
    getDetailedTradeItemDocuments,
    payload,
    setGetDetailedTradeItemDocuments,
    type
  );
}

export function* tradeItemDocumentsWatcher() {
  yield all([
    takeEvery(
      TradeItemDocumentEnums.getAllTradeItemDocuments,
      getAllTradeItemDocumentsWorker
    ),
    takeEvery(
      TradeItemDocumentEnums.getSearchAllTradeItemDocuments,
      getSearchAllTradeItemDocumentsWorker
    ),
    takeLatest(
      TradeItemDocumentEnums.getDetailedTradeItemDocuments,
      getDetailedTradeItemDocumentsWorker
    ),
  ]);
}
