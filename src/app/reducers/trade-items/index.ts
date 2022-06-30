import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import { TradeItemsContentType, TradeItemsInitials } from "./types";

const initialState: TradeItemsInitials = {
  allTradeItems: [],
  detailedTradeItems: null,
  createTradeItems: null,
  putTradeItems: null,
};

const tradeItems = createSlice({
  name: "tradeItems",
  initialState,
  reducers: {
    setGetAllTradeItems: (
      state,
      action: PayloadAction<TradeItemsContentType[]>
    ) => {
      state.allTradeItems = action.payload;
    },

    setGetDetailedTradeItems: (
      state,
      action: PayloadAction<TradeItemsContentType>
    ) => {
      state.detailedTradeItems = action.payload;
    },
    setAddTradeItems: (state, action: PayloadAction<PostResponse | null>) => {
      state.createTradeItems = action.payload;
    },
    setPutTradeItems: (state, action: PayloadAction<PutResponse | null>) => {
      state.putTradeItems = action.payload;
    },
  },
});

export const {
  setGetAllTradeItems,
  setGetDetailedTradeItems,
  setAddTradeItems,
  setPutTradeItems,
} = tradeItems.actions;

export default tradeItems.reducer;
