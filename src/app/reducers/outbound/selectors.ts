import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { OutboundsWithPage } from "./types";

export const selectOutbounds = (state: RootState): OutboundsWithPage =>
  state.outbound.allOutbounds;

export const selectOutboundsList = createSelector(
  selectOutbounds,
  (outbounds: OutboundsWithPage) =>
    outbounds.content.map((item) => ({
      ...item,
    }))
);
