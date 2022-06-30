import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import { CategoryListType } from "../../reducers/product-catalog/types";

export const getCategoriesAfterRoot = async (id: string) => {
  return fetchHelper(
    `${BASE_URL + pathnames.productCategoriesTree + id}`,
    "GET"
  );
};
export const getCategoriesAfterRootChildren = async (id: string) => {
  return fetchHelper(
    `${BASE_URL + pathnames.productCategoriesTree + id}`,
    "GET"
  );
};
export const getCategoryList = async (parent_id?: string) =>
  fetchHelper<CategoryListType[]>(
    BASE_URL + pathnames.productCategoriesTree + (parent_id || EmptyString),
    "GET"
  );
