import { fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  TradeItemsBase,
  TradeItemsContentType,
  TradeItemsParams,
} from "../../reducers/trade-items/types";
import {} from "../../reducers/erp-warehouses/types";

export const postTradeItems = async (data: TradeItemsBase) => {
  return fetchHelper<TradeItemsBase>(
    BASE_URL + pathnames.tradeItems,
    "POST",
    data
  );
};

export const putTradeItems = async ({ code, data }: TradeItemsParams) => {
  return fetchHelper<TradeItemsBase>(
    BASE_URL + pathnames.tradeItems + code,
    "PUT",
    data
  );
};

export const getAllTradeItems = async () =>
  fetchHelper<TradeItemsContentType[]>(
    `${BASE_URL + pathnames.tradeItems}`,
    "GET"
  );

export const getDetailedTradeItems = async (code: string) =>
  fetchHelper<TradeItemsContentType>(
    `${BASE_URL + pathnames.tradeItems}${code}`,
    "GET"
  );
