import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ErpWarehousesWithPage } from "./types";

export const selectErpWarehouses = (state: RootState): ErpWarehousesWithPage =>
  state.erpWarehouses.allErpWarehouses;

export const selectErpWarehousesList = createSelector(
  selectErpWarehouses,
  (erpWarehouses: ErpWarehousesWithPage) =>
    erpWarehouses.content.map((item) => ({
      ...item,
    }))
);
