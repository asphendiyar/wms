import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TradeItemDocumentsWithPage } from "./types";

export const selectTradeItemDocuments = (
  state: RootState
): TradeItemDocumentsWithPage => state.tradeItemDocuments.allTradeItemDocuments;

export const selectTradeItemDocumentsList = createSelector(
  selectTradeItemDocuments,
  (tradeItemDocumentsList: TradeItemDocumentsWithPage) =>
    tradeItemDocumentsList.content.map((item) => ({
      ...item,
    }))
);
