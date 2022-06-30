import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import { PatchOutboundParams } from "../../reducers/outbound/types";
import {
  ShipmentsContentType,
  ShipmentsFormValues,
  ShipmentsParams,
  ShipmentsWithPage,
} from "../../reducers/shipments/types";

export const postShipments = async (data: ShipmentsFormValues) => {
  return fetchHelper<ShipmentsFormValues>(
    BASE_URL + pathnames.shipments,
    "POST",
    data
  );
};

export const putShipments = async ({ id, data }: ShipmentsParams) => {
  return fetchHelper<ShipmentsFormValues>(
    BASE_URL + pathnames.shipments + id,
    "PUT",
    data
  );
};

export const getAllShipments = async ({
  page,
  warehouse_id,
}: FilterPayloadTypes) =>
  fetchHelper<ShipmentsWithPage>(
    `${BASE_URL + pathnames.shipments}page/filter?page=${page || 1}${
      warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString
    }`,
    "GET"
  );

export const getDetailedShipment = async (id: string) =>
  fetchHelper<ShipmentsContentType>(
    `${BASE_URL + pathnames.shipments}${id}`,
    "GET"
  );

export const patchOpenShipments = async (id: string) => {
  return fetchHelper<null>(
    `${BASE_URL + pathnames.shipments}${id}/collect`,
    "PATCH"
  );
};
export const patchDeattachFromShipment = async ({
  id,
  shipment_id,
}: PatchOutboundParams) => {
  return fetchHelper<null>(
    `${BASE_URL + pathnames.shipments}${shipment_id}/deattach/${id}`,
    "PATCH"
  );
};
