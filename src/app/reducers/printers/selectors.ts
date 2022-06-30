import { PrintersWithPage } from "./types";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectPrinters = (state: RootState): PrintersWithPage =>
  state.printers.allPrinters;

export const selectPrintersList = createSelector(
  selectPrinters,
  (printersList: PrintersWithPage) =>
    printersList.content.map((item) => ({ ...item }))
);
