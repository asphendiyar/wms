import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TradeItemsContentType } from "./types";

export const selectTradeItems = (state: RootState): TradeItemsContentType[] =>
  state.tradeItems.allTradeItems;

export const selectTradeItemsList = createSelector(
  selectTradeItems,
  (tradeItemsList: TradeItemsContentType[]) =>
    tradeItemsList.map((item) => ({
      ...item,
      type_sticky: item.type,
      code_sticky: item.code,
    }))
);
