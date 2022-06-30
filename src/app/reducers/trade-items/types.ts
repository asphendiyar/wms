import { PutResponse, PostResponse } from "../../commonTypes";

export interface TradeItemsBase {
  code: string;
  value: string;
  state: string;
  description: string;
  length: number;
  width: number;
  height: number;
  max_volume: number;
  max_weight: number;
  type: string;
  content: string;
}

export interface TradeItemsContentType extends TradeItemsBase {
  id: number;
  state_title: string;
}

export type TradeItemsParams = {
  code: string;
  data: TradeItemsBase;
};

export interface TradeItemsTableData {
  id: number;
  code_sticky: string;
  value: string;
  state: string;
  state_title: string;
  description: string;
  length: number;
  width: number;
  height: number;
  max_volume: number;
  max_weight: number;
  type_sticky: string;
  content: string;
}

export interface TradeItemsInitials {
  allTradeItems: TradeItemsContentType[];
  detailedTradeItems: TradeItemsContentType | null;
  createTradeItems: PostResponse | null;
  putTradeItems: PutResponse | null;
}

export enum TradeItemEnums {
  getAllTradeItems = "trade-items/get/all",
  getDetailedTradeItems = "trade-items/get/one",
  postTradeItems = "trade-items/post/one",
  putTradeItems = "trade-items/put/one",
}
