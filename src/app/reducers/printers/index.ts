import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  PrintersContentType,
  PrintersInitials,
  PrintersWithPage,
} from "./types";

const initialState: PrintersInitials = {
  allPrinters: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedPrinters: null,
  createPrinters: null,
  putPrinters: null,
};

const printers = createSlice({
  name: "printers",
  initialState,
  reducers: {
    setGetAllPrinters: (state, action: PayloadAction<PrintersWithPage>) => {
      state.allPrinters = {
        ...action.payload,
        content: [...state.allPrinters.content, ...action.payload.content],
      };
    },
    setSearchGetAllPrinters: (
      state,
      action: PayloadAction<PrintersWithPage>
    ) => {
      state.allPrinters = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },
    setGetDetailedPrinters: (
      state,
      action: PayloadAction<PrintersContentType>
    ) => {
      state.detailedPrinters = action.payload;
    },
    setCreatePrinters: (state, action: PayloadAction<PostResponse | null>) => {
      state.createPrinters = action.payload;
    },
    setPutPrinters: (state, action: PayloadAction<PutResponse | null>) => {
      state.putPrinters = action.payload;
    },
  },
});

export const {
  setGetAllPrinters,
  setCreatePrinters,
  setGetDetailedPrinters,
  setPutPrinters,
  setSearchGetAllPrinters,
} = printers.actions;

export default printers.reducer;
