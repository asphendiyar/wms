import { PutResponse, PostResponse } from "../../commonTypes";

export interface PeriodicReservationsFormValues {
  code: string;
  warehouse_id: number;
  type: string;
  functional_zone_id: number;
  partner_id: number;
  route: string;
  start_date: string;
  end_date: string;
}

export interface PeriodicReservationsContentType {
  id: number;
  code: string;
  warehouse_id: number;
  type: string;
  functional_zone_id: number;
  partner_id: number;
  route: string;
  start_date: string;
  end_date: string;
}

export type PeriodicReservationsParams = {
  id: string;
  data: PeriodicReservationsFormValues;
};

export interface PeriodicReservationsWithPage {
  content: PeriodicReservationsContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface PeriodicReservationsInitials {
  allPeriodicReservations: PeriodicReservationsWithPage;
  detailedPeriodicReservations: PeriodicReservationsContentType | null;
  createPeriodicReservations: PostResponse | null;
  putPeriodicReservations: PutResponse | null;
  deletePeriodicReservations: PutResponse | null;
}

export enum PeriodicReservationEnums {
  getAllPeriodicReservations = "periodic-reservations/get/all",
  getSearchAllPeriodicReservations = "periodic-reservations/get/search",
  getDetailedPeriodicReservations = "periodic-reservations/get/one",
  postPeriodicReservations = "periodic-reservations/post/one",
  putPeriodicReservations = "periodic-reservations/put/one",
  deletePeriodicReservations = "periodic-reservations/delete/one",
}
