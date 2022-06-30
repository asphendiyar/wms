import { createSelector } from "@reduxjs/toolkit";
import { ReactSelectValues } from "../../commonTypes";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { PopularitiesWithPage } from "./types";

export const selectPopularities = (state: RootState): PopularitiesWithPage =>
  state.popularities.allPopularities;

export const selectPopularitiesList = createSelector(
  selectPopularities,
  (popularitiesList: PopularitiesWithPage) =>
    popularitiesList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);

export const selectPopularityList = createSelector(
  selectPopularities,
  (list): ReactSelectValues[] =>
    list.content.map((item) => ({ value: item.code, label: item.description }))
);
