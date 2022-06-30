import { PutResponse, PostResponse } from "../../commonTypes";

export interface CouriersFormValues {
  code: string;
  name: string;
  create_manifest: string;
  create_parcel: string;
  barcode_parcel: string;
  create_service: string;
  configurations: CouriersConfigurations[];
}

export interface CouriersConfigurations {
  code?: string;
  name?: string;
  url?: string;
  username?: string;
  password?: string;
}

export type CouriersConfigurationsTable = {
  id: number;
  code: string;
  name: string;
  url: string;
  username: string;
  password: string;
  created_date: string;
  updated_date: string;
};
export interface CouriersPutForm extends CouriersFormValues {
  state: string;
}
export interface CouriersContentType {
  id: number;
  state: string;
  state_title: string;
  code: string;
  name: string;
  create_manifest: string;
  create_parcel: string;
  barcode_parcel: string;
  create_service: string;
  created_date: string;
  updated_date: string;
  configurations: [
    {
      id: number;
      code: string;
      name: string;
      url: string;
      username: string;
      password: string;
      created_date: string;
      updated_date: string;
    }
  ];
}

export type CouriersParams = {
  code: string;
  data: CouriersPutForm;
};

export type CouriersTableData = {
  id: number;
  state: string;
  state_title: string;
  code: string;
  name: string;
  create_manifest: string;
  create_parcel: string;
  barcode_parcel: string;
  create_service: string;
  created_date: string;
  updated_date: string;
};

export interface CouriersWithPage {
  content: CouriersTableData[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface CouriersInitials {
  allCouriers: CouriersWithPage;
  detailedCouriers: CouriersContentType | null;
  createCouriers: PostResponse | null;
  putCouriers: PutResponse | null;
}

export enum CourierEnums {
  getAllCouriers = "couriers/get/all",
  getSearchAllCouriers = "couriers/get/search",
  getDetailedCouriers = "couriers/get/one",
  postCouriers = "couriers/post/one",
  putCouriers = "couriers/put/one",
}
