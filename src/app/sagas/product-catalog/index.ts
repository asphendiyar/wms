import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import {
  CategoryListType,
  CategoryTreeListType,
  ProductCatalogAllTypes,
  ProductCatalogEnums,
  ProductCatalogFormValues,
  ProductContentType,
} from "../../reducers/product-catalog/types";
import {
  setAddProductCatalog,
  setGetCategoriesList,
  setGetCategoryTreeList,
  setGetDetailedProduct,
  setGetProductCatalogs,
  setPutProductCatalog,
  setSearchGetProductCatalogs,
} from "../../reducers/product-catalog";
import { fetchGenerator } from "..";
import {
  getAllProductsCatalog,
  getCategoryList,
  getCategoryTreeList,
  getDetailedProduct,
  postProductCatalog,
  putProductCatalog,
} from "./requests";

function* postProductCatalogWorker({
  payload,
  type,
}: WorkerParams<ProductCatalogFormValues>) {
  yield fetchGenerator<ProductCatalogFormValues, PostResponse | null>(
    postProductCatalog,
    payload,
    setAddProductCatalog,
    type
  );
}

function* putProductCatalogWorker({
  payload,
  type,
}: WorkerParams<ProductCatalogFormValues>) {
  yield fetchGenerator<ProductCatalogFormValues, PutResponse | null>(
    putProductCatalog,
    payload,
    setPutProductCatalog,
    type
  );
}

function* getAllProductsCatalogWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ProductCatalogAllTypes>(
    getAllProductsCatalog,
    payload,
    setGetProductCatalogs,
    type
  );
}

function* getSearchProductsCatalogWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ProductCatalogAllTypes>(
    getAllProductsCatalog,
    payload,
    setSearchGetProductCatalogs,
    type
  );
}

function* getCategoryListWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, CategoryListType[]>(
    getCategoryList,
    payload,
    setGetCategoriesList,
    type
  );
}
function* getCategoryTreeListWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, CategoryTreeListType[]>(
    getCategoryTreeList,
    payload,
    setGetCategoryTreeList,
    type
  );
}

function* getDetailedProductsCatalogWorker({
  payload,
  type,
}: WorkerParams<string>) {
  yield fetchGenerator<string, ProductContentType>(
    getDetailedProduct,
    payload,
    setGetDetailedProduct,
    type
  );
}

export function* productCatalogWatcher() {
  yield all([
    takeLatest(
      ProductCatalogEnums.getProductCatalog,
      getAllProductsCatalogWorker
    ),
    takeLatest(
      ProductCatalogEnums.postProductCatalog,
      postProductCatalogWorker
    ),
    takeLatest(ProductCatalogEnums.putProductCatalog, putProductCatalogWorker),
    takeLatest(
      ProductCatalogEnums.getDetailedProduct,
      getDetailedProductsCatalogWorker
    ),
    takeLatest(
      ProductCatalogEnums.getSearchProductCatalog,
      getSearchProductsCatalogWorker
    ),
    takeLatest(ProductCatalogEnums.getCategoryList, getCategoryListWorker),
    takeLatest(
      ProductCatalogEnums.getCategoryTreeList,
      getCategoryTreeListWorker
    ),
  ]);
}
