import { createSelector } from "@reduxjs/toolkit";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { CouriersWithPage } from "./types";

export const selectCouriers = (state: RootState): CouriersWithPage =>
  state.couriers.allCouriers;

export const selectCouriersList = createSelector(
  selectCouriers,
  (couriersList: CouriersWithPage) =>
    couriersList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);
