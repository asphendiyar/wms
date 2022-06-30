import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  CategoryListType,
  CategoryTreeListType,
  ProductCatalogAllTypes,
  ProductCatalogFormValues,
  ProductContentType,
} from "../../reducers/product-catalog/types";

export const postProductCatalog = async (data: ProductCatalogFormValues) => {
  return fetchHelper<ProductCatalogFormValues>(
    BASE_URL + pathnames.productCatalogs,
    "POST",
    data
  );
};

export const putProductCatalog = async (data: ProductCatalogFormValues) => {
  return fetchHelper<ProductCatalogFormValues>(
    BASE_URL + pathnames.productCatalogs,
    "PUT",
    data
  );
};

export const getAllProductsCatalog = async ({
  page,
  code,
  description,
  category_id,
}: FilterPayloadTypes) =>
  fetchHelper<ProductCatalogAllTypes>(
    `${BASE_URL + pathnames.productCatalogs}page/filter?page=${page || 1}${
      code ? `&code=${code}` : EmptyString
    }${description ? `&description=${description}` : EmptyString}${
      category_id ? `&category_id=${category_id}` : EmptyString
    }`,
    "GET"
  );

export const getCategoryList = async (id?: string) =>
  fetchHelper<CategoryListType[]>(
    BASE_URL + pathnames.productCategoriesTree + (id || EmptyString),
    "GET"
  );

export const getCategoryTreeList = async (code: string) =>
  fetchHelper<CategoryTreeListType[]>(
    `${BASE_URL + pathnames.productCatalogs}${code}/categories`,
    "GET"
  );

export const getDetailedProduct = async (code: string) =>
  fetchHelper<ProductContentType>(
    `${BASE_URL + pathnames.productCatalogs}search?code=${code}`,
    "GET"
  );
