import { PostResponse, PutResponse } from "../../commonTypes";

export type InventoryTasksTable = {
  cell: string;
  warehouse_id: number;
  inventory_id: number;
  interval_id: number;
};

export type InventoryTasksWithPage = {
  content: InventoryTasksTable[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
};
export interface InventoriesFormValues {
  name: string;
  warehouse_id: number;
  region: string;
  row: string;
  interval: number;
}

export interface InventoriesPutFormValues {
  name: string;
}

export type InventoriesParams = {
  id: string;
  data: InventoriesPutFormValues;
};

export type PatchInventoriesParams = {
  id: string;
  state: string;
};

export type InventoriesContentType = {
  id: number;
  state: string;
  state_title: string;
  warehouse_id: number;
  name: string;
  region: string;
  row: string;
  interval: number;
  created_date: string;
  updated_date: string;
};

export type InventoriesWithPage = {
  content: InventoriesContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
};

export type InventoriesInitials = {
  allInventories: InventoriesWithPage;
  allInventoryTasks: InventoryTasksWithPage;
  detailedInventories: InventoriesContentType | null;
  createInventories: PostResponse | null;
  putInventories: PutResponse | null;
  patchRestartInventories: PutResponse | null;
  patchStatusInventories: PutResponse | null;
};

export enum InventoriesEnums {
  getAllInventories = "inventories/get/all",
  getSearchAllInventories = "inventories/get/search",
  getDetailedInventories = "inventories/get/one",
  postInventories = "inventories/post/one",
  putInventories = "inventories/put/one",
  getInventoryTasks = "inventories/task/get/all",
  getSearchInventoryTasks = "inventories/task/get/search",
  patchRestartInventories = "inventories/patch/restart",
  patchStatusInventories = "inventories/patch/status",
}
