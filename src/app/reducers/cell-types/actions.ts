import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { CellTypeEnums, CellTypesFormValues, CellTypesParams } from "./types";

export const getAllCellTypesAction = createAction<FilterPayloadTypes>(
  CellTypeEnums.getAllCellTypes
);
export const getSearchAllCellTypesAction = createAction<FilterPayloadTypes>(
  CellTypeEnums.getSearchAllCellTypes
);

export const getDetailedCellTypesAction = createAction<string>(
  CellTypeEnums.getDetailedCellTypes
);

export const postCellTypesAction = createAction<CellTypesFormValues>(
  CellTypeEnums.postCellTypes
);

export const putCellTypesAction = createAction<CellTypesParams>(
  CellTypeEnums.putCellTypes
);
