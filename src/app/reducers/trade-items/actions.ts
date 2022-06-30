import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { TradeItemEnums, TradeItemsBase, TradeItemsParams } from "./types";

export const getAllTradeItemsAction = createAction<FilterPayloadTypes>(
  TradeItemEnums.getAllTradeItems
);

export const getDetailedTradeItemsAction = createAction<string>(
  TradeItemEnums.getDetailedTradeItems
);

export const postTradeItemsAction = createAction<TradeItemsBase>(
  TradeItemEnums.postTradeItems
);

export const putTradeItemsAction = createAction<TradeItemsParams>(
  TradeItemEnums.putTradeItems
);
