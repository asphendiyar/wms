import { createSelector } from "@reduxjs/toolkit";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { PeriodicReservationsWithPage } from "./types";

export const selectPeriodicReservations = (
  state: RootState
): PeriodicReservationsWithPage =>
  state.periodicReservations.allPeriodicReservations;

export const selectPeriodicReservationsList = createSelector(
  selectPeriodicReservations,
  (periodicReservationsList: PeriodicReservationsWithPage) =>
    periodicReservationsList.content.map((item) => ({
      ...item,
      start_date: normalizeDate(item.start_date),
      end_date: normalizeDate(item.end_date),
    }))
);
