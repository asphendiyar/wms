import { PutResponse, PostResponse } from "../../commonTypes";

export interface CommoditiesFormValues {
  code: string;
  value: string;
  state: string;
  description: string;
}
export interface CommoditiesBase {
  value: string;
  state: string;
  description: string;
}
export interface CommoditiesContentType {
  id: number;
  code: string;
  value: string;
  state: string;
  state_title: string;
  description: string;
  created_date: string;
  updated_date: string;
}

export type CommoditiesParams = {
  code: string;
  data: CommoditiesBase;
};

export interface CommoditiesWithPage {
  content: CommoditiesContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface CommoditiesInitials {
  allCommodities: CommoditiesWithPage;
  detailedCommodities: CommoditiesContentType | null;
  createCommodities: PostResponse | null;
  putCommodities: PutResponse | null;
}

export enum CommodityEnums {
  getAllCommodities = "commodities/get/all",
  getSearchAllCommodities = "commodities/get/search",
  getDetailedCommodities = "commodities/get/one",
  postCommodities = "commodities/post/one",
  putCommodities = "commodities/put/one",
}
