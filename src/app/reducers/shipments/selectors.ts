import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ShipmentsWithPage } from "./types";

export const selectShipments = (state: RootState): ShipmentsWithPage =>
  state.shipments.allShipments;

export const selectShipmentsList = createSelector(
  selectShipments,
  (shipments: ShipmentsWithPage) =>
    shipments.content.map((item) => ({
      ...item,
    }))
);
