import { PutResponse, PostResponse } from "../../commonTypes";

export interface PickingPrioritiesFormValues {
  route: string;
  priority: number;
}

export interface PickingPrioritiesBase {
  route: string;
  priority: number;
  state: string;
}
export interface PickingPrioritiesContentType {
  id: number;
  route: string;
  priority: number;
  state: string;
  state_title: string;
  created_date: string;
  updated_date: string;
}

export type PickingPrioritiesParams = {
  id: number;
  data: PickingPrioritiesBase;
};

export interface PickingPrioritiesWithPage {
  content: PickingPrioritiesContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface PickingPrioritiesInitials {
  allPickingPriorities: PickingPrioritiesWithPage;
  detailedPickingPriorities: PickingPrioritiesContentType | null;
  createPickingPriorities: PostResponse | null;
  putPickingPriorities: PutResponse | null;
}

export enum PickingPriorityEnums {
  getAllPickingPriorities = "picking-priority/get/all",
  getSearchAllPickingPriorities = "picking-priority/get/search",
  getDetailedPickingPriorities = "picking-priority/get/one",
  postPickingPriorities = "picking-priority/post/one",
  putPickingPriorities = "picking-priority/put/one",
}
