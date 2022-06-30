import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PutResponse } from "../../commonTypes";
import { ShipmentsWithPage } from "../shipments/types";
import {
  OutboundContentType,
  OutboundInitials,
  OutboundsTableData,
  OutboundsWithPage,
} from "./types";

const initialState: OutboundInitials = {
  allOutbounds: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  outbound: null,
  patchCollectOutbound: null,
  patchCloseOutbound: null,
  patchAttachToShipment: null,
  selectedOutbound: null,
  allShipments: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
};

const outbound = createSlice({
  name: "outbound",
  initialState,
  reducers: {
    setGetAllOutbounds: (state, action: PayloadAction<OutboundsWithPage>) => {
      state.allOutbounds = {
        ...action.payload,
        content: [...state.allOutbounds.content, ...action.payload.content],
      };
    },
    setSearchGetAllOutbounds: (
      state,
      action: PayloadAction<OutboundsWithPage>
    ) => {
      state.allOutbounds = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },
    setGetOutbound: (state, action: PayloadAction<OutboundContentType>) => {
      state.outbound = action.payload;
    },
    setPatchCollectOutbound: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchCollectOutbound = action.payload;
    },
    setPatchCloseOutbound: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchCloseOutbound = action.payload;
    },
    setPatchAttachOutbound: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchAttachToShipment = action.payload;
    },
    setSelectedOutbound: (state, action: PayloadAction<OutboundsTableData>) => {
      state.selectedOutbound = action.payload;
    },
    setGetAllShipmentsOutbounds: (
      state,
      action: PayloadAction<ShipmentsWithPage>
    ) => {
      state.allShipments = action.payload;
    },
  },
});

export const {
  setGetAllOutbounds,
  setSearchGetAllOutbounds,
  setGetOutbound,
  setPatchCloseOutbound,
  setPatchCollectOutbound,
  setPatchAttachOutbound,
  setSelectedOutbound,
  setGetAllShipmentsOutbounds,
} = outbound.actions;

export default outbound.reducer;
