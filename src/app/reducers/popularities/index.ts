import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  PopularitiesContentType,
  PopularitiesInitials,
  PopularitiesWithPage,
} from "./types";

const initialState: PopularitiesInitials = {
  allPopularities: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedPopularities: null,
  createPopularities: null,
  putPopularities: null,
};

const popularities = createSlice({
  name: "popularities",
  initialState,
  reducers: {
    setSearchGetAllPopularities: (
      state,
      action: PayloadAction<PopularitiesWithPage>
    ) => {
      state.allPopularities = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllPopularities: (
      state,
      action: PayloadAction<PopularitiesWithPage>
    ) => {
      state.allPopularities = {
        ...action.payload,
        content: [...state.allPopularities.content, ...action.payload.content],
      };
    },
    setGetDetailedPopularities: (
      state,
      action: PayloadAction<PopularitiesContentType>
    ) => {
      state.detailedPopularities = action.payload;
    },
    setAddPopularities: (state, action: PayloadAction<PostResponse | null>) => {
      state.createPopularities = action.payload;
    },
    setPutPopularities: (state, action: PayloadAction<PutResponse | null>) => {
      state.putPopularities = action.payload;
    },
  },
});

export const {
  setGetAllPopularities,
  setGetDetailedPopularities,
  setAddPopularities,
  setPutPopularities,
  setSearchGetAllPopularities,
} = popularities.actions;

export default popularities.reducer;
