import { createSelector } from "@reduxjs/toolkit";
import { ReactSelectValues } from "../../commonTypes";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { MeasureUnitsContentType } from "./types";

export const selectMeasureUnits = (
  state: RootState
): MeasureUnitsContentType[] => state.measureUnits.allMeasureUnits;

export const selectMeasureUnitsList = createSelector(
  selectMeasureUnits,
  (measureUnitsList: MeasureUnitsContentType[]) =>
    measureUnitsList.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);

export const selectMeasureUnitList = createSelector(
  selectMeasureUnits,
  (list): ReactSelectValues[] =>
    list.map((item) => ({ value: item.code, label: item.name }))
);
