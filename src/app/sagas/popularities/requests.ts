import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  PopularitiesBase,
  PopularitiesContentType,
  PopularitiesParams,
} from "../../reducers/popularities/types";

export const postPopularities = async (data: PopularitiesBase) => {
  return fetchHelper<PopularitiesBase>(
    BASE_URL + pathnames.popularities,
    "POST",
    data
  );
};

export const putPopularities = async ({ code, data }: PopularitiesParams) => {
  return fetchHelper<PopularitiesBase>(
    BASE_URL + pathnames.popularities + code,
    "PUT",
    data
  );
};

export const getAllPopularities = async ({
  page,
  warehouse_id,
}: FilterPayloadTypes) =>
  fetchHelper<PopularitiesContentType[]>(
    `${BASE_URL + pathnames.popularities}page/filter?page=${page || 1}${
      warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString
    }`,
    "GET"
  );

export const getDetailedPopularities = async (code: string) =>
  fetchHelper<PopularitiesContentType>(
    `${BASE_URL + pathnames.popularities}${code}`,
    "GET"
  );
