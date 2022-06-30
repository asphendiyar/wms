import { PutResponse, PostResponse } from "../../commonTypes";

export interface PopularitiesFormValues {
  code: string;
  value: string;
  state: string;
  description: string;
}
export interface PopularitiesBase {
  value: string;
  state: string;
  description: string;
}
export interface PopularitiesContentType {
  id: number;
  code: string;
  value: string;
  state: string;
  state_title: string;
  description: string;
  created_date: string;
  updated_date: string;
}

export type PopularitiesParams = {
  code: string;
  data: PopularitiesBase;
};

export interface PopularitiesWithPage {
  content: PopularitiesContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface PopularitiesInitials {
  allPopularities: PopularitiesWithPage;
  detailedPopularities: PopularitiesContentType | null;
  createPopularities: PostResponse | null;
  putPopularities: PutResponse | null;
}

export enum PopularityEnums {
  getAllPopularities = "popularities/get/all",
  getSearchAllPopularities = "popularities/get/search",
  getDetailedPopularities = "popularities/get/one",
  postPopularities = "popularities/post/one",
  putPopularities = "popularities/put/one",
}
