import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  TradeItemDocumentsBase,
  TradeItemDocumentsContentType,
} from "../../reducers/trade-item-documents/types";

export const postTradeItemDocuments = async (data: TradeItemDocumentsBase) => {
  return fetchHelper<TradeItemDocumentsBase>(
    BASE_URL + pathnames.tradeItemDocuments,
    "POST",
    data
  );
};

export const getAllTradeItemDocuments = async ({
  page,
  barcodes,
}: FilterPayloadTypes) =>
  fetchHelper<TradeItemDocumentsContentType[]>(
    `${BASE_URL + pathnames.tradeItemDocuments}page/filter?page=${page || 1}${
      barcodes ? "&barcode=" + barcodes : EmptyString
    }`,
    "GET"
  );

export const getDetailedTradeItemDocuments = async (barcode: string) =>
  fetchHelper<TradeItemDocumentsContentType>(
    `${BASE_URL + pathnames.tradeItemDocuments}${barcode}`,
    "GET"
  );
