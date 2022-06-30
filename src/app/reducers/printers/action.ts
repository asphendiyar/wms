import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { PrintersEnums, PrintersFormValues, PrintersParams } from "./types";

export const getAllPrintersAction = createAction<FilterPayloadTypes>(
  PrintersEnums.getAllPrinters
);

export const getSearchAllPrintersAction = createAction<FilterPayloadTypes>(
  PrintersEnums.getSearchAllPrinters
);

export const getDetailedPrintersAction = createAction<string>(
  PrintersEnums.getDetailedPrinters
);

export const postPrintersAction = createAction<PrintersFormValues>(
  PrintersEnums.postPrinters
);

export const putPrintersAction = createAction<PrintersParams>(
  PrintersEnums.putPrinters
);
