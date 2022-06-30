import { createSelector } from "@reduxjs/toolkit";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { EquipmentsWithPage } from "./types";

export const selectEquipments = (state: RootState): EquipmentsWithPage =>
  state.equipments.allEquipments;

export const selectEquipmentsList = createSelector(
  selectEquipments,
  (equipmentsList: EquipmentsWithPage) =>
    equipmentsList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);
