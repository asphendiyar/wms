import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { InboundsWithPage } from "./types";

export const selectInbounds = (state: RootState): InboundsWithPage =>
  state.inbound.allInbounds;

export const selectInboundsList = createSelector(
  selectInbounds,
  (inbounds: InboundsWithPage) =>
    inbounds.content.map((item) => ({
      ...item,
    }))
);
