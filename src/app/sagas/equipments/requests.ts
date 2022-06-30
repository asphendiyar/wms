import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  EquipmentsBase,
  EquipmentsContentType,
  EquipmentsParams,
} from "../../reducers/equipments/types";

export const postEquipments = async (data: EquipmentsBase) => {
  return fetchHelper<EquipmentsBase>(
    BASE_URL + pathnames.equipments,
    "POST",
    data
  );
};

export const putEquipments = async ({ code, data }: EquipmentsParams) => {
  return fetchHelper<EquipmentsBase>(
    BASE_URL + pathnames.equipments + code,
    "PUT",
    data
  );
};

export const getAllEquipments = async ({
  page,
  warehouse_id,
}: FilterPayloadTypes) =>
  fetchHelper<EquipmentsContentType[]>(
    `${BASE_URL + pathnames.equipments}page/filter?page=${page || 1}${
      warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString
    }`,
    "GET"
  );

export const getDetailedEquipments = async (code: string) =>
  fetchHelper<EquipmentsContentType>(
    `${BASE_URL + pathnames.equipments}${code}`,
    "GET"
  );
