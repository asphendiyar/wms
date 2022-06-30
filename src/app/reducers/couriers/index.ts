import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  CouriersContentType,
  CouriersInitials,
  CouriersWithPage,
} from "./types";

const initialState: CouriersInitials = {
  allCouriers: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedCouriers: null,
  createCouriers: null,
  putCouriers: null,
};

const couriers = createSlice({
  name: "couriers",
  initialState,
  reducers: {
    setSearchGetAllCouriers: (
      state,
      action: PayloadAction<CouriersWithPage>
    ) => {
      state.allCouriers = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllCouriers: (state, action: PayloadAction<CouriersWithPage>) => {
      state.allCouriers = {
        ...action.payload,
        content: [...state.allCouriers.content, ...action.payload.content],
      };
    },
    setGetDetailedCouriers: (
      state,
      action: PayloadAction<CouriersContentType>
    ) => {
      state.detailedCouriers = action.payload;
    },
    setAddCouriers: (state, action: PayloadAction<PostResponse | null>) => {
      state.createCouriers = action.payload;
    },
    setPutCouriers: (state, action: PayloadAction<PutResponse | null>) => {
      state.putCouriers = action.payload;
    },
  },
});

export const {
  setGetAllCouriers,
  setGetDetailedCouriers,
  setAddCouriers,
  setPutCouriers,
  setSearchGetAllCouriers,
} = couriers.actions;

export default couriers.reducer;
