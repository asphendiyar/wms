import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { ProductCatalogEnums, ProductCatalogFormValues } from "./types";

export const addProductCatalogAction = createAction<ProductCatalogFormValues>(
  ProductCatalogEnums.postProductCatalog
);
export const getDetailedProductCatalogAction = createAction<string>(
  ProductCatalogEnums.getDetailedProduct
);
export const getAllProductCatalogAction = createAction<FilterPayloadTypes>(
  ProductCatalogEnums.getProductCatalog
);
export const getSearchAllProductCatalogAction =
  createAction<FilterPayloadTypes>(ProductCatalogEnums.getSearchProductCatalog);

export const putProductCatalogAction = createAction<ProductCatalogFormValues>(
  ProductCatalogEnums.putProductCatalog
);

export const getProductCategoryAction = createAction<string>(
  ProductCatalogEnums.getCategoryList
);

export const getProductCategoryTreeListAction = createAction<string>(
  ProductCatalogEnums.getCategoryTreeList
);
