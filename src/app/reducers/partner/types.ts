import { PutResponse, PostResponse } from "../../commonTypes";

export interface PartnersBase {
  code: string;
  company_code: string;
  name: string;
  type: string;
  unloading_point_code: string;
  unloading_point: string;
  address: string;
  customer: string;
  is_b2b: boolean;
  market_name: string;
  created_date: string;
  updated_date: string;
}

export interface PartnersFormValues {
  code: string;
  company_code: string;
  name: string;
  type: string;
  unloading_point_code: string;
  unloading_point: string;
  address: string;
  customer: string;
  is_b2b: boolean;
  market_name: string;
}

export interface PartnersContentType extends PartnersBase {
  id: number;
}

export interface PartnersWithPage {
  content: PartnersContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}

export type PartnersParams = {
  id: string;
  data: PartnersFormValues;
};

export interface PartnersTableData {
  id: number;
  code_sticky: string;
  company_code_sticky: string;
  name_sticky: string;
  type: string;
  unloading_point_code: string;
  unloading_point: string;
  address: string;
  customer: string;
  is_b2b: boolean;
  market_name: string;
  created_date: string;
  updated_date: string;
}

export interface PartnersInitials {
  allPartners: PartnersWithPage;
  detailedPartners: PartnersContentType | null;
  createPartners: PostResponse | null;
  putPartners: PutResponse | null;
}

export enum PartnerEnums {
  getAllPartners = "partners/get/all",
  getSearchAllPartners = "partners/get/search",
  getDetailedPartners = "partners/get/one",
  postPartners = "partners/post/one",
  putPartners = "partners/put/one",
}
