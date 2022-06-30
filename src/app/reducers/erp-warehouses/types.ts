import { PutResponse, PostResponse } from "../../commonTypes";

export interface ErpWarehousesFormValues {
  code: string;
  name: string;
  type: string;
  warehouse_id: number;
}

export interface ErpWarehousesParams {
  id: string;
  data: ErpWarehousesFormValues;
}
export interface ErpWarehousesContentType {
  id: number;
  code: string;
  state: string;
  state_title: string;
  name: string;
  type: string;
  warehouse_id: number;
}

export interface ErpWarehousesWithPage {
  content: ErpWarehousesContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface ErpWarehousesInitials {
  allErpWarehouses: ErpWarehousesWithPage;
  detailedErpWarehouse: ErpWarehousesContentType | null;
  createErpWarehouse: PostResponse | null;
  putErpWarehouse: PutResponse | null;
  selectedWarehouse: ErpWarehousesContentType | null;
}

export enum ErpWarehouseEnums {
  getAllErpWarehouses = "erp-warehouses/get/all",
  getSearchAllErpWarehouses = "erp-warehouses/get/search",
  getDetailedErpWarehouses = "erp-warehouses/get/one",
  postErpWarehouses = "erp-warehouses/post/one",
  putErpWarehouses = "erp-warehouses/put/one",
}
