import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InboundsTableData } from "../../../components/Inbound/Inbounds";
import { PutResponse } from "../../commonTypes";
import { RampsContentType, RampsType } from "../warehouse/types";
import {
  InboundContentType,
  InboundDetailsTable,
  InboundInitials,
  InboundsWithPage,
} from "./types";

const initialState: InboundInitials = {
  allInbounds: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  inbound: null,
  patchOpenInbound: null,
  patchCloseInbound: null,
  patchDeclineInbound: null,
  selectedInbound: null,
  allRampsInbound: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  selectedRampsInbound: null,
  selectedInboundProduct: null,
};

const inbound = createSlice({
  name: "inbound",
  initialState,
  reducers: {
    setSearchGetAllInbounds: (
      state,
      action: PayloadAction<InboundsWithPage>
    ) => {
      state.allInbounds = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllInbounds: (state, action: PayloadAction<InboundsWithPage>) => {
      state.allInbounds = {
        ...action.payload,
        content: [...state.allInbounds.content, ...action.payload.content],
      };
    },

    setGetInbound: (state, action: PayloadAction<InboundContentType>) => {
      state.inbound = action.payload;
    },

    setPatchOpenInbound: (state, action: PayloadAction<PutResponse | null>) => {
      state.patchOpenInbound = action.payload;
    },
    setPatchCloseInbound: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchCloseInbound = action.payload;
    },
    setPatchDeclineInbound: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchDeclineInbound = action.payload;
    },
    setSelectedInbound: (state, action: PayloadAction<InboundsTableData>) => {
      state.selectedInbound = action.payload;
    },

    setSelectedRampsInbound: (
      state,
      action: PayloadAction<RampsContentType | null>
    ) => {
      state.selectedRampsInbound = action.payload;
    },

    setGetAllRampsInbounds: (state, action: PayloadAction<RampsType>) => {
      state.allRampsInbound = action.payload;
    },
    setSelectedInboundProduct: (
      state,
      action: PayloadAction<InboundDetailsTable | null>
    ) => {
      state.selectedInboundProduct = action.payload;
    },
  },
});

export const {
  setSearchGetAllInbounds,
  setGetAllInbounds,
  setGetInbound,
  setPatchCloseInbound,
  setPatchOpenInbound,
  setPatchDeclineInbound,
  setSelectedInbound,
  setSelectedRampsInbound,
  setGetAllRampsInbounds,
  setSelectedInboundProduct,
} = inbound.actions;

export default inbound.reducer;
