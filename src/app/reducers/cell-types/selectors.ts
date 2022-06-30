import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CellTypesWithPage } from "./types";

export const selectCellTypes = (state: RootState): CellTypesWithPage =>
  state.cellTypes.allCellTypes;

export const selectCellTypesList = createSelector(
  selectCellTypes,
  (cellTypesList: CellTypesWithPage) =>
    cellTypesList.content.map((item) => ({
      ...item,
      type_sticky: item.type,
      code_sticky: item.code,
    }))
);
