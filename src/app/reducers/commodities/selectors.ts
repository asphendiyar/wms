import { createSelector } from "@reduxjs/toolkit";
import { ReactSelectValues } from "../../commonTypes";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { CommoditiesWithPage } from "./types";

export const selectCommodities = (state: RootState): CommoditiesWithPage =>
  state.commodities.allCommodities;

export const selectCommoditiesList = createSelector(
  selectCommodities,
  (commoditiesList: CommoditiesWithPage) =>
    commoditiesList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);

export const selectCommodityList = createSelector(
  selectCommodities,
  (list): ReactSelectValues[] =>
    list.content.map((item) => ({ value: item.code, label: item.description }))
);
