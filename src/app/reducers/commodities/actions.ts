import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  CommoditiesFormValues,
  CommoditiesParams,
  CommodityEnums,
} from "./types";

export const getAllCommoditiesAction = createAction<FilterPayloadTypes>(
  CommodityEnums.getAllCommodities
);
export const getSearchAllCommoditiesAction = createAction<FilterPayloadTypes>(
  CommodityEnums.getSearchAllCommodities
);

export const getDetailedCommoditiesAction = createAction<string>(
  CommodityEnums.getDetailedCommodities
);

export const postCommoditiesAction = createAction<CommoditiesFormValues>(
  CommodityEnums.postCommodities
);

export const putCommoditiesAction = createAction<CommoditiesParams>(
  CommodityEnums.putCommodities
);
