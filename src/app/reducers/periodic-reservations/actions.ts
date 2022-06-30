import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  PeriodicReservationEnums,
  PeriodicReservationsFormValues,
  PeriodicReservationsParams,
} from "./types";

export const getAllPeriodicReservationsAction =
  createAction<FilterPayloadTypes>(
    PeriodicReservationEnums.getAllPeriodicReservations
  );
export const getSearchAllPeriodicReservationsAction =
  createAction<FilterPayloadTypes>(
    PeriodicReservationEnums.getSearchAllPeriodicReservations
  );

export const getDetailedPeriodicReservationsAction = createAction<number>(
  PeriodicReservationEnums.getDetailedPeriodicReservations
);

export const postPeriodicReservationsAction =
  createAction<PeriodicReservationsFormValues>(
    PeriodicReservationEnums.postPeriodicReservations
  );

export const putPeriodicReservationsAction =
  createAction<PeriodicReservationsParams>(
    PeriodicReservationEnums.putPeriodicReservations
  );

export const deletePeriodicReservationsAction = createAction<number>(
  PeriodicReservationEnums.deletePeriodicReservations
);
