import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  PartnersContentType,
  PartnersInitials,
  PartnersWithPage,
} from "./types";

const initialState: PartnersInitials = {
  allPartners: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedPartners: null,
  createPartners: null,
  putPartners: null,
};

const partners = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setSearchGetAllPartners: (
      state,
      action: PayloadAction<PartnersWithPage>
    ) => {
      state.allPartners = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllPartners: (state, action: PayloadAction<PartnersWithPage>) => {
      state.allPartners = {
        ...action.payload,
        content: [...state.allPartners.content, ...action.payload.content],
      };
    },

    setGetDetailedPartners: (
      state,
      action: PayloadAction<PartnersContentType>
    ) => {
      state.detailedPartners = action.payload;
    },
    setAddPartners: (state, action: PayloadAction<PostResponse | null>) => {
      state.createPartners = action.payload;
    },
    setPutPartners: (state, action: PayloadAction<PutResponse | null>) => {
      state.putPartners = action.payload;
    },
  },
});

export const {
  setGetAllPartners,
  setSearchGetAllPartners,
  setGetDetailedPartners,
  setAddPartners,
  setPutPartners,
} = partners.actions;

export default partners.reducer;
