import { all, takeEvery } from "@redux-saga/core/effects";
import { fetchGenerator } from "..";
import { WorkerParams } from "../../commonTypes";
import { setLists } from "../../reducers/dictionary";
import {
  DictionaryEnums,
  DictionaryType,
} from "../../reducers/dictionary/types";
import { getDictionaryContent } from "./requests";

function* getDictionaryListWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, DictionaryType[], string>(
    getDictionaryContent,
    payload,
    null,
    type,
    payload,
    setLists
  );
}

export function* dictionaryWatcher() {
  yield all([
    takeEvery(DictionaryEnums.getDictionaryContent, getDictionaryListWorker),
  ]);
}
