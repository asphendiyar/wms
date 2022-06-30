import { createSelector } from "@reduxjs/toolkit";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { PickingOrdersWithPage } from "./types";

export const selectPickingOrders = (state: RootState): PickingOrdersWithPage =>
  state.pickingOrders.allPickingOrders;

export const selectPickingOrderList = createSelector(
  selectPickingOrders,
  (partnersList: PickingOrdersWithPage) =>
    partnersList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
      planned_shipping_date: normalizeDate(item.planned_shipping_date),
    }))
);
