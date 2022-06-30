import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  TradeItemEnums,
  TradeItemsBase,
  TradeItemsContentType,
  TradeItemsParams,
} from "../../reducers/trade-items/types";
import {
  setAddTradeItems,
  setGetAllTradeItems,
  setGetDetailedTradeItems,
  setPutTradeItems,
} from "../../reducers/trade-items";
import {
  getAllTradeItems,
  getDetailedTradeItems,
  postTradeItems,
  putTradeItems,
} from "./requests";

function* postTradeItemsWorker({
  payload,
  type,
}: WorkerParams<TradeItemsBase>) {
  yield fetchGenerator<TradeItemsBase, PostResponse | null>(
    postTradeItems,
    payload,
    setAddTradeItems,
    type
  );
}

function* putTradeItemsWorker({
  payload,
  type,
}: WorkerParams<TradeItemsParams>) {
  yield fetchGenerator<TradeItemsParams, PutResponse | null>(
    putTradeItems,
    payload,
    setPutTradeItems,
    type
  );
}

function* getAllTradeItemsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, TradeItemsContentType[]>(
    getAllTradeItems,
    payload,
    setGetAllTradeItems,
    type
  );
}

function* getDetailedTradeItemsWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, TradeItemsContentType>(
    getDetailedTradeItems,
    payload,
    setGetDetailedTradeItems,
    type
  );
}

export function* tradeItemsWatcher() {
  yield all([
    takeLatest(TradeItemEnums.getAllTradeItems, getAllTradeItemsWorker),
    takeLatest(
      TradeItemEnums.getDetailedTradeItems,
      getDetailedTradeItemsWorker
    ),
    takeLatest(TradeItemEnums.postTradeItems, postTradeItemsWorker),
    takeLatest(TradeItemEnums.putTradeItems, putTradeItemsWorker),
  ]);
}
