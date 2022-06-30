import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  InboundContentType,
  PatchInboundParams,
  PatchOpenInbound,
} from "../../reducers/inbound/types";

export const getAllInbounds = async ({
  page,
  number,
  warehouse_id,
}: FilterPayloadTypes) =>
  fetchHelper<FilterPayloadTypes>(
    `${BASE_URL + pathnames.inbounds}page/filter?page=${page ? page : 1}${
      warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString
    }${number ? "&number=" + number : EmptyString}`,
    "GET"
  );

export const getInbound = async (id: string) =>
  fetchHelper<InboundContentType>(
    `${BASE_URL + pathnames.inbounds}${id}`,
    "GET"
  );

export const patchInboundOpen = async ({ data, id }: PatchInboundParams) => {
  return fetchHelper<PatchOpenInbound>(
    `${BASE_URL + pathnames.inbounds + id}/open`,
    "PATCH",
    data
  );
};

export const patchInboundClose = async ({ id }: PatchInboundParams) => {
  return fetchHelper<PatchOpenInbound>(
    `${BASE_URL + pathnames.inbounds + id}/close`,
    "PATCH"
  );
};

export const patchInboundDecline = async ({ id }: PatchInboundParams) => {
  return fetchHelper<PatchOpenInbound>(
    `${BASE_URL + pathnames.inbounds + id}/decline`,
    "PATCH"
  );
};
