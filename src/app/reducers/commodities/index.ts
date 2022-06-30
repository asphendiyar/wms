import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  CommoditiesContentType,
  CommoditiesInitials,
  CommoditiesWithPage,
} from "./types";

const initialState: CommoditiesInitials = {
  allCommodities: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedCommodities: null,
  createCommodities: null,
  putCommodities: null,
};

const commodities = createSlice({
  name: "commodities",
  initialState,
  reducers: {
    setSearchGetAllCommodities: (
      state,
      action: PayloadAction<CommoditiesWithPage>
    ) => {
      state.allCommodities = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllCommodities: (
      state,
      action: PayloadAction<CommoditiesWithPage>
    ) => {
      state.allCommodities = {
        ...action.payload,
        content: [...state.allCommodities.content, ...action.payload.content],
      };
    },
    setGetDetailedCommodities: (
      state,
      action: PayloadAction<CommoditiesContentType>
    ) => {
      state.detailedCommodities = action.payload;
    },
    setAddCommodities: (state, action: PayloadAction<PostResponse | null>) => {
      state.createCommodities = action.payload;
    },
    setPutCommodities: (state, action: PayloadAction<PutResponse | null>) => {
      state.putCommodities = action.payload;
    },
  },
});

export const {
  setGetAllCommodities,
  setGetDetailedCommodities,
  setAddCommodities,
  setPutCommodities,
  setSearchGetAllCommodities,
} = commodities.actions;

export default commodities.reducer;
