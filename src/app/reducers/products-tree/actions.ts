import { createAction } from "@reduxjs/toolkit";
import { CategoriesEnums } from "./types";

export const getCategoriesListAction = createAction<string>(
  CategoriesEnums.getCategoriesList
);

export const getCategoriesAfterRootChildrenAction = createAction<string>(
  CategoriesEnums.getCategoriesAfterRootChildren
);
