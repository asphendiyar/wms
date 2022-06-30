import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  PeriodicReservationsContentType,
  PeriodicReservationsFormValues,
  PeriodicReservationsParams,
  PeriodicReservationsWithPage,
} from "../../reducers/periodic-reservations/types";

export const postPeriodicReservations = async (
  data: PeriodicReservationsFormValues
) => {
  return fetchHelper<PeriodicReservationsFormValues>(
    BASE_URL + pathnames.periodicReservations,
    "POST",
    data
  );
};

export const putPeriodicReservations = async ({
  id,
  data,
}: PeriodicReservationsParams) => {
  return fetchHelper<PeriodicReservationsFormValues>(
    BASE_URL + pathnames.periodicReservations + id,
    "PUT",
    data
  );
};

export const getAllPeriodicReservations = async ({
  page,
  warehouse_id,
}: FilterPayloadTypes) =>
  fetchHelper<PeriodicReservationsWithPage>(
    `${BASE_URL + pathnames.periodicReservations}page/filter?page=${page || 1}${
      warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString
    }`,
    "GET"
  );

export const getDetailedPeriodicReservations = async (id: number) =>
  fetchHelper<PeriodicReservationsContentType>(
    `${BASE_URL + pathnames.periodicReservations}${id}`,
    "GET"
  );

export const deletePeriodicReservations = async (id: number) =>
  fetchHelper<null>(
    `${BASE_URL + pathnames.periodicReservations}${id}`,
    "DELETE"
  );
