import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { TradeItemDocumentEnums } from "./types";

export const getAllTradeItemDocumentsAction = createAction<FilterPayloadTypes>(
  TradeItemDocumentEnums.getAllTradeItemDocuments
);

export const getSearchAllTradeItemDocumentsAction =
  createAction<FilterPayloadTypes>(
    TradeItemDocumentEnums.getSearchAllTradeItemDocuments
  );

export const getDetailedTradeItemDocumentsAction = createAction<string>(
  TradeItemDocumentEnums.getDetailedTradeItemDocuments
);
