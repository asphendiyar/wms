import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  FunctionalZones,
  RampsContentType,
  RampsType,
} from "../warehouse/types";
import {
  ShipmentsContentType,
  ShipmentsInitials,
  ShipmentsWithPage,
} from "./types";

const initialState: ShipmentsInitials = {
  allShipments: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedShipment: null,
  createShipment: null,
  putShipment: null,
  selectedShipment: null,
  allFzonesShipment: [],
  allRampsShipment: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  selectedFzoneShipment: null,
  selectedRampShipment: null,
  patchOpenShipment: null,
  deattachFromShipment: null,
};

const shipments = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    setGetAllShipments: (state, action: PayloadAction<ShipmentsWithPage>) => {
      state.allShipments = {
        ...action.payload,
        content: [...state.allShipments.content, ...action.payload.content],
      };
    },
    setSearchGetAllShipments: (
      state,
      action: PayloadAction<ShipmentsWithPage>
    ) => {
      state.allShipments = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },
    setGetDetailedShipment: (
      state,
      action: PayloadAction<ShipmentsContentType>
    ) => {
      state.detailedShipment = action.payload;
    },
    setAddShipment: (state, action: PayloadAction<PostResponse | null>) => {
      state.createShipment = action.payload;
    },
    setPutShipment: (state, action: PayloadAction<PutResponse | null>) => {
      state.putShipment = action.payload;
    },
    setPatchOpenShipment: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchOpenShipment = action.payload;
    },
    setPatchDeattachShipment: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.deattachFromShipment = action.payload;
    },
    setSelectedRampShipment: (
      state,
      action: PayloadAction<RampsContentType | null>
    ) => {
      state.selectedRampShipment = action.payload;
    },

    setGetAllRampsShipment: (state, action: PayloadAction<RampsType>) => {
      state.allRampsShipment = action.payload;
    },
    setSelectedFzoneShipment: (
      state,
      action: PayloadAction<FunctionalZones | null>
    ) => {
      state.selectedFzoneShipment = action.payload;
    },
    setSelectedShipment: (
      state,
      action: PayloadAction<ShipmentsContentType | null>
    ) => {
      state.selectedShipment = action.payload;
    },

    setGetAllFzonesShipment: (
      state,
      action: PayloadAction<FunctionalZones[]>
    ) => {
      state.allFzonesShipment = action.payload;
    },
  },
});

export const {
  setGetAllShipments,
  setSearchGetAllShipments,
  setGetDetailedShipment,
  setAddShipment,
  setPutShipment,
  setGetAllFzonesShipment,
  setGetAllRampsShipment,
  setSelectedFzoneShipment,
  setSelectedRampShipment,
  setSelectedShipment,
  setPatchOpenShipment,
  setPatchDeattachShipment,
} = shipments.actions;

export default shipments.reducer;
