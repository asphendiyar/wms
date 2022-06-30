import { all, takeEvery } from "redux-saga/effects";
import { fetchGenerator } from "..";
import { WorkerParams } from "../../commonTypes";
import { CategoryListType } from "../../reducers/product-catalog/types";
import { setCategoriesList } from "../../reducers/products-tree";
import { setCategoriesAfterRootChildren } from "../../reducers/products-tree";
import { CategoriesEnums } from "../../reducers/products-tree/types";
import { getCategoriesAfterRootChildren, getCategoryList } from "./requests";

function* getAllCategoriesWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, CategoryListType[]>(
    getCategoryList,
    payload,
    setCategoriesList,
    type
  );
}

function* getCategoriesAfterRootChildrenWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator(
    getCategoriesAfterRootChildren,
    payload,
    setCategoriesAfterRootChildren,
    type
  );
}
export function* categoriesWatcher() {
  yield all([
    takeEvery(CategoriesEnums.getCategoriesList, getAllCategoriesWorker),

    takeEvery(
      CategoriesEnums.getCategoriesAfterRootChildren,
      getCategoriesAfterRootChildrenWorker
    ),
  ]);
}
