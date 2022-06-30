import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  PeriodicReservationsContentType,
  PeriodicReservationsInitials,
  PeriodicReservationsWithPage,
} from "./types";

const initialState: PeriodicReservationsInitials = {
  allPeriodicReservations: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedPeriodicReservations: null,
  createPeriodicReservations: null,
  putPeriodicReservations: null,
  deletePeriodicReservations: null,
};

const periodicReservations = createSlice({
  name: "periodicReservations",
  initialState,
  reducers: {
    setSearchGetAllPeriodicReservations: (
      state,
      action: PayloadAction<PeriodicReservationsWithPage>
    ) => {
      state.allPeriodicReservations = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllPeriodicReservations: (
      state,
      action: PayloadAction<PeriodicReservationsWithPage>
    ) => {
      state.allPeriodicReservations = {
        ...action.payload,
        content: [
          ...state.allPeriodicReservations.content,
          ...action.payload.content,
        ],
      };
    },
    setGetDetailedPeriodicReservations: (
      state,
      action: PayloadAction<PeriodicReservationsContentType>
    ) => {
      state.detailedPeriodicReservations = action.payload;
    },
    setAddPeriodicReservations: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createPeriodicReservations = action.payload;
    },
    setPutPeriodicReservations: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putPeriodicReservations = action.payload;
    },
    setDeletePeriodicReservations: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.deletePeriodicReservations = action.payload;
    },
  },
});

export const {
  setGetAllPeriodicReservations,
  setGetDetailedPeriodicReservations,
  setAddPeriodicReservations,
  setPutPeriodicReservations,
  setSearchGetAllPeriodicReservations,
  setDeletePeriodicReservations,
} = periodicReservations.actions;

export default periodicReservations.reducer;
