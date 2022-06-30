import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { FilterPayloadTypes, WorkerParams } from "../../commonTypes";
import { fetchGenerator } from "..";

import {
  EmailNotificationEnums,
  EmailNotificationContentType,
  EmailNotificationWithPage,
} from "../../reducers/email-notification/types";

import {
  getAllEmailNotification,
  getDetailedEmailNotification,
} from "./requests";
import {
  setGetAllEmailNotification,
  setGetDetailedEmailNotification,
  setSearchGetAllEmailNotification,
} from "../../reducers/email-notification";

function* getAllEmailNotificationWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, EmailNotificationWithPage>(
    getAllEmailNotification,
    payload,
    setGetAllEmailNotification,
    type
  );
}

function* getSearchAllEmailNotificationWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, EmailNotificationWithPage>(
    getAllEmailNotification,
    payload,
    setSearchGetAllEmailNotification,
    type
  );
}

function* getDetailedEmailNotificationWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, EmailNotificationContentType>(
    getDetailedEmailNotification,
    payload,
    setGetDetailedEmailNotification,
    type
  );
}

export function* emailNotificationWatcher() {
  yield all([
    takeEvery(
      EmailNotificationEnums.getAllEmailNotification,
      getAllEmailNotificationWorker
    ),
    takeEvery(
      EmailNotificationEnums.getSearchAllEmailNotification,
      getSearchAllEmailNotificationWorker
    ),
    takeLatest(
      EmailNotificationEnums.getDetailedEmailNotification,
      getDetailedEmailNotificationWorker
    ),
  ]);
}
