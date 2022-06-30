import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  PartnerEnums,
  PartnersContentType,
  PartnersFormValues,
  PartnersParams,
  PartnersWithPage,
} from "../../reducers/partner/types";
import {
  getAllPartners,
  getDetailedPartners,
  postPartners,
  putPartners,
} from "./requests";
import {
  setAddPartners,
  setGetAllPartners,
  setGetDetailedPartners,
  setPutPartners,
  setSearchGetAllPartners,
} from "../../reducers/partner";

function* postPartnersWorker({
  payload,
  type,
}: WorkerParams<PartnersFormValues>) {
  yield fetchGenerator<PartnersFormValues, PostResponse | null>(
    postPartners,
    payload,
    setAddPartners,
    type
  );
}

function* putPartnersWorker({ payload, type }: WorkerParams<PartnersParams>) {
  yield fetchGenerator<PartnersParams, PutResponse | null>(
    putPartners,
    payload,
    setPutPartners,
    type
  );
}

function* getAllPartnersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PartnersWithPage>(
    getAllPartners,
    payload,
    setGetAllPartners,
    type
  );
}

function* getSearchAllPartnersWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, PartnersWithPage>(
    getAllPartners,
    payload,
    setSearchGetAllPartners,
    type
  );
}

function* getDetailedPartnersWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, PartnersContentType>(
    getDetailedPartners,
    payload,
    setGetDetailedPartners,
    type
  );
}

export function* partnersWatcher() {
  yield all([
    takeLatest(PartnerEnums.getAllPartners, getAllPartnersWorker),
    takeLatest(PartnerEnums.getDetailedPartners, getDetailedPartnersWorker),
    takeLatest(PartnerEnums.postPartners, postPartnersWorker),
    takeLatest(PartnerEnums.putPartners, putPartnersWorker),
    takeLatest(PartnerEnums.getSearchAllPartners, getSearchAllPartnersWorker),
  ]);
}
