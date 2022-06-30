import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  CommoditiesBase,
  CommoditiesContentType,
  CommoditiesParams,
} from "../../reducers/commodities/types";

export const postCommodities = async (data: CommoditiesBase) => {
  return fetchHelper<CommoditiesBase>(
    BASE_URL + pathnames.commodities,
    "POST",
    data
  );
};

export const putCommodities = async ({ code, data }: CommoditiesParams) => {
  return fetchHelper<CommoditiesBase>(
    BASE_URL + pathnames.commodities + code,
    "PUT",
    data
  );
};

export const getAllCommodities = async ({
  page,
  warehouse_id,
}: FilterPayloadTypes) =>
  fetchHelper<CommoditiesContentType[]>(
    `${BASE_URL + pathnames.commodities}page/filter?page=${page || 1}${
      warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString
    }`,
    "GET"
  );

export const getDetailedCommodities = async (code: string) =>
  fetchHelper<CommoditiesContentType>(
    `${BASE_URL + pathnames.commodities}${code}`,
    "GET"
  );
