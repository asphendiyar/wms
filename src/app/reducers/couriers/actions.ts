import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { CourierEnums, CouriersFormValues, CouriersParams } from "./types";

export const getAllCouriersAction = createAction<FilterPayloadTypes>(
  CourierEnums.getAllCouriers
);
export const getSearchAllCouriersAction = createAction<FilterPayloadTypes>(
  CourierEnums.getSearchAllCouriers
);

export const getDetailedCouriersAction = createAction<string>(
  CourierEnums.getDetailedCouriers
);

export const postCouriersAction = createAction<CouriersFormValues>(
  CourierEnums.postCouriers
);

export const putCouriersAction = createAction<CouriersParams>(
  CourierEnums.putCouriers
);
