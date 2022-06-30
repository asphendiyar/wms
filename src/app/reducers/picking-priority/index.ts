import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  PickingPrioritiesContentType,
  PickingPrioritiesInitials,
  PickingPrioritiesWithPage,
} from "./types";

const initialState: PickingPrioritiesInitials = {
  allPickingPriorities: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedPickingPriorities: null,
  createPickingPriorities: null,
  putPickingPriorities: null,
};

const pickingPriorities = createSlice({
  name: "pickingPriorities",
  initialState,
  reducers: {
    setSearchGetAllPickingPriorities: (
      state,
      action: PayloadAction<PickingPrioritiesWithPage>
    ) => {
      state.allPickingPriorities = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllPickingPriorities: (
      state,
      action: PayloadAction<PickingPrioritiesWithPage>
    ) => {
      state.allPickingPriorities = {
        ...action.payload,
        content: [
          ...state.allPickingPriorities.content,
          ...action.payload.content,
        ],
      };
    },
    setGetDetailedPickingPriorities: (
      state,
      action: PayloadAction<PickingPrioritiesContentType>
    ) => {
      state.detailedPickingPriorities = action.payload;
    },
    setAddPickingPriorities: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createPickingPriorities = action.payload;
    },
    setPutPickingPriorities: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putPickingPriorities = action.payload;
    },
  },
});

export const {
  setGetAllPickingPriorities,
  setGetDetailedPickingPriorities,
  setAddPickingPriorities,
  setPutPickingPriorities,
  setSearchGetAllPickingPriorities,
} = pickingPriorities.actions;

export default pickingPriorities.reducer;
