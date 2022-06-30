import { createSelector } from "@reduxjs/toolkit";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { PickingPrioritiesWithPage } from "./types";

export const selectPickingPriorities = (
  state: RootState
): PickingPrioritiesWithPage => state.pickingPriorities.allPickingPriorities;

export const selectPickingPrioritiesList = createSelector(
  selectPickingPriorities,
  (pickingPrioritiesList: PickingPrioritiesWithPage) =>
    pickingPrioritiesList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);
