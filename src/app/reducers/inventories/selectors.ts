import { InventoriesWithPage, InventoryTasksWithPage } from "./types";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectInventories = (state: RootState): InventoriesWithPage =>
  state.inventories.allInventories;

export const selectInventoriesList = createSelector(
  selectInventories,
  (inventoriesList: InventoriesWithPage) =>
    inventoriesList.content.map((item) => ({ ...item }))
);

export const selectInventoryTasks = (
  state: RootState
): InventoryTasksWithPage => state.inventories.allInventoryTasks;

export const selectInventoryTasksList = createSelector(
  selectInventoryTasks,
  (inventoriesList: InventoryTasksWithPage) =>
    inventoriesList.content.map((item) => ({ ...item }))
);
