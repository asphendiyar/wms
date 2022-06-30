import { PutResponse, PostResponse } from "../../commonTypes";

export interface EquipmentsFormValues {
  code: string;
  value: string;
  state: string;
  description: string;
}
export interface EquipmentsBase {
  value: string;
  state: string;
  description: string;
}
export interface EquipmentsContentType {
  id: number;
  code: string;
  value: string;
  state: string;
  state_title: string;
  description: string;
  created_date: string;
  updated_date: string;
}

export type EquipmentsParams = {
  code: string;
  data: EquipmentsBase;
};

export interface EquipmentsWithPage {
  content: EquipmentsContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface EquipmentsInitials {
  allEquipments: EquipmentsWithPage;
  detailedEquipments: EquipmentsContentType | null;
  createEquipments: PostResponse | null;
  putEquipments: PutResponse | null;
}

export enum EquipmentEnums {
  getAllEquipments = "equipments/get/all",
  getSearchAllEquipments = "equipments/get/search",
  getDetailedEquipments = "equipments/get/one",
  postEquipments = "equipments/post/one",
  putEquipments = "equipments/put/one",
}
