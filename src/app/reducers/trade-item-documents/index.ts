import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TradeItemDocumentsContentType,
  TradeItemDocumentsInitials,
  TradeItemDocumentsWithPage,
} from "./types";

const initialState: TradeItemDocumentsInitials = {
  allTradeItemDocuments: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedTradeItemDocuments: null,
};

const tradeItemDocuments = createSlice({
  name: "tradeItemDocuments",
  initialState,
  reducers: {
    setSearchGetAllTradeItemDocuments: (
      state,
      action: PayloadAction<TradeItemDocumentsWithPage>
    ) => {
      state.allTradeItemDocuments = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllTradeItemDocuments: (
      state,
      action: PayloadAction<TradeItemDocumentsWithPage>
    ) => {
      state.allTradeItemDocuments = {
        ...action.payload,
        content: [
          ...state.allTradeItemDocuments.content,
          ...action.payload.content,
        ],
      };
    },

    setGetDetailedTradeItemDocuments: (
      state,
      action: PayloadAction<TradeItemDocumentsContentType>
    ) => {
      state.detailedTradeItemDocuments = action.payload;
    },
  },
});

export const {
  setGetAllTradeItemDocuments,
  setSearchGetAllTradeItemDocuments,
  setGetDetailedTradeItemDocuments,
} = tradeItemDocuments.actions;

export default tradeItemDocuments.reducer;
