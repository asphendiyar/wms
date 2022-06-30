import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  OutboundContentType,
  PatchOutboundParams,
} from "../../reducers/outbound/types";

export const getAllOutbounds = async ({ page, number }: FilterPayloadTypes) =>
  fetchHelper<FilterPayloadTypes>(
    `${BASE_URL + pathnames.outbounds}page/filter?page=${page || 1}${
      number ? "&number=" + number : EmptyString
    }`,
    "GET"
  );

export const getOutbound = async (id: string) =>
  fetchHelper<OutboundContentType>(
    `${BASE_URL + pathnames.outbounds}${id}`,
    "GET"
  );

export const patchOutboundCollect = async ({ id }: PatchOutboundParams) => {
  return fetchHelper<PatchOutboundParams>(
    `${BASE_URL + pathnames.outbounds + id}/collect`,
    "PATCH"
  );
};

export const patchOutboundClose = async ({ id }: PatchOutboundParams) => {
  return fetchHelper<PatchOutboundParams>(
    `${BASE_URL + pathnames.outbounds + id}/close`,
    "PATCH"
  );
};

export const patchOutboundAttachShipment = async ({
  id,
  shipment_id,
}: PatchOutboundParams) => {
  return fetchHelper<PatchOutboundParams>(
    `${BASE_URL + pathnames.outbounds + id}/attach/to/shipment/${shipment_id}`,
    "PATCH"
  );
};
