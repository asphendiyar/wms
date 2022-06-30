import { FilterPayloadTypes } from "../../commonTypes";
import { fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  AddressesTypesParams,
  AddressesTypesParamsData,
  FunctionalZonesPostAndPut,
  FZoneParams,
  WarehouseECPType,
  WarehouseContentType,
  WarehouseFormValues,
  RampsType,
  WarehouseParams,
  WarehouseAllTypes,
} from "../../reducers/warehouse/types";

export const postWarehouse = async (data: WarehouseFormValues) => {
  return fetchHelper<WarehouseFormValues>(
    BASE_URL + pathnames.warehouses,
    "POST",
    data
  );
};

export const putWarehouse = async ({ id, data }: WarehouseParams) => {
  return fetchHelper<WarehouseFormValues>(
    BASE_URL + pathnames.warehouses + id,
    "PUT",
    data
  );
};

export type WarehouseCommonDataPostandPut = {
  code?: string;
  state?: string;
};

export type WarehouseECPTypeParams = {
  id?: number;
  code?: string;
  data: WarehouseCommonDataPostandPut;
};

export const postEquipmentsWarehouse = async ({
  data,
  id,
}: WarehouseECPTypeParams) => {
  return fetchHelper<WarehouseCommonDataPostandPut>(
    `${BASE_URL + pathnames.warehouses}${id}/equipments/`,
    "POST",
    data
  );
};

export const putEquipmentsWarehouse = async ({
  data,
  id,
  code,
}: WarehouseECPTypeParams) => {
  return fetchHelper<WarehouseCommonDataPostandPut>(
    `${BASE_URL + pathnames.warehouses}${id}/equipments/${code}`,
    "PUT",
    data
  );
};

export const postPopularityWarehouse = async ({
  data,
  id,
}: WarehouseECPTypeParams) => {
  return fetchHelper<WarehouseCommonDataPostandPut>(
    `${BASE_URL + pathnames.warehouses}${id}/popularities/`,
    "POST",
    data
  );
};

export const putPopularityWarehouse = async ({
  data,
  id,
  code,
}: WarehouseECPTypeParams) => {
  return fetchHelper<WarehouseCommonDataPostandPut>(
    `${BASE_URL + pathnames.warehouses}${id}/popularities/${code}`,
    "PUT",
    data
  );
};

export const postCommodityWarehouse = async ({
  data,
  id,
}: WarehouseECPTypeParams) => {
  return fetchHelper<WarehouseCommonDataPostandPut>(
    `${BASE_URL + pathnames.warehouses}${id}/commodities/`,
    "POST",
    data
  );
};

export const putCommodityWarehouse = async ({
  data,
  id,
  code,
}: WarehouseECPTypeParams) => {
  return fetchHelper<WarehouseCommonDataPostandPut>(
    `${BASE_URL + pathnames.warehouses}${id}/commodities/${code}`,
    "PUT",
    data
  );
};

export const postAdressesWarehouse = async (params: AddressesTypesParams) => {
  return fetchHelper<AddressesTypesParamsData>(
    `${BASE_URL + pathnames.warehouses + params.w_id}/addresses`,
    "POST",
    params.data
  );
};

export const putAdressesWarehouse = async ({
  w_id,
  id,
  data,
}: AddressesTypesParams) => {
  return fetchHelper<AddressesTypesParamsData>(
    `${BASE_URL + pathnames.warehouses + w_id}/addresses/${id}`,
    "PUT",
    data
  );
};

export const postFZoneWarehouse = async (params: FZoneParams) => {
  return fetchHelper<FunctionalZonesPostAndPut>(
    `${BASE_URL + pathnames.warehouses + params.w_id}/functional-zones`,
    "POST",
    params.data
  );
};

export const putFZoneWarehouse = async ({ w_id, id, data }: FZoneParams) => {
  return fetchHelper<FunctionalZonesPostAndPut>(
    `${BASE_URL + pathnames.warehouses + w_id}/functional-zones/${id}`,
    "PUT",
    data
  );
};

export const getAllWarehouse = async ({ page, size }: FilterPayloadTypes) =>
  fetchHelper<WarehouseAllTypes>(
    `${BASE_URL + pathnames.warehouses}page/filter?page=${page ?? 1}&size=${
      size ?? 10
    }`,
    "GET"
  );

export const getAllCommodities = async () =>
  fetchHelper<WarehouseECPType[]>(
    `${BASE_URL}/warehouse/v1/commodities`,
    "GET"
  );
export const getAllEquipmentsWarehouse = async () =>
  fetchHelper<WarehouseECPType[]>(`${BASE_URL}/warehouse/v1/equipments`, "GET");
export const getAllPopularities = async () =>
  fetchHelper<WarehouseECPType[]>(
    `${BASE_URL}/warehouse/v1/popularities`,
    "GET"
  );

export const getDetailedWarehouse = async (id: string) =>
  fetchHelper<WarehouseContentType>(
    `${BASE_URL + pathnames.warehouses + id}`,
    "GET"
  );

export const getRampsWarehouse = async () =>
  fetchHelper<RampsType>(`${BASE_URL + pathnames.ramps}page/filter`, "GET");

export const getFzonesByWarehouseId = async ({ id }: FZoneParams) =>
  fetchHelper<FZoneParams>(
    `${BASE_URL + pathnames.warehouses + id}/functional-zones/`,
    "GET"
  );
