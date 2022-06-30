import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  InventoriesFormValues,
  InventoriesParams,
  InventoriesPutFormValues,
  PatchInventoriesParams,
} from "../../reducers/inventories/types";

export const postInventories = async (data: InventoriesFormValues) => {
  return fetchHelper<InventoriesFormValues>(
    BASE_URL + pathnames.inventories,
    "POST",
    data
  );
};

export const putInventories = async ({ id, data }: InventoriesParams) => {
  return fetchHelper<InventoriesPutFormValues>(
    BASE_URL + pathnames.inventories + id,
    "PUT",
    data
  );
};

export const getAllInventories = async ({
  page,
  state,
  warehouse_id,
}: FilterPayloadTypes) => {
  return fetchHelper<InventoriesPutFormValues>(
    `${BASE_URL + pathnames.inventories}page/filter?page=${page || 1}${
      state ? "&state=" + state : EmptyString
    }${warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString}`,
    "GET"
  );
};

export const getDetailedInventories = async (id: string) => {
  return fetchHelper<string>(`${BASE_URL + pathnames.inventories + id}`, "GET");
};

export const getAllInventoryTasks = async ({
  page,
  state,
  inventory_id,
  interval_id,
}: FilterPayloadTypes) => {
  return fetchHelper<InventoriesPutFormValues>(
    `${BASE_URL + pathnames.inventoryTasks}page/filter?page=${page || 1}${
      state ? "&state=" + state : EmptyString
    }${inventory_id ? "&inventory_id=" + inventory_id : EmptyString}${
      interval_id ? "&interval_id=" + interval_id : EmptyString
    }`,
    "GET"
  );
};

export const patchRestartInventories = async (id: string) => {
  return fetchHelper<string>(
    `${BASE_URL + pathnames.inventories + id}/restart`,
    "PATCH"
  );
};
export const patchStatusInventories = async ({
  id,
  state,
}: PatchInventoriesParams) => {
  return fetchHelper<string>(
    `${BASE_URL + pathnames.inventories + id}/state/${state}`,
    "PATCH"
  );
};
