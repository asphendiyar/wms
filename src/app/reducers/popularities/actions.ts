import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  PopularitiesFormValues,
  PopularitiesParams,
  PopularityEnums,
} from "./types";

export const getAllPopularitiesAction = createAction<FilterPayloadTypes>(
  PopularityEnums.getAllPopularities
);
export const getSearchAllPopularitiesAction = createAction<FilterPayloadTypes>(
  PopularityEnums.getSearchAllPopularities
);

export const getDetailedPopularitiesAction = createAction<string>(
  PopularityEnums.getDetailedPopularities
);

export const postPopularitiesAction = createAction<PopularitiesFormValues>(
  PopularityEnums.postPopularities
);

export const putPopularitiesAction = createAction<PopularitiesParams>(
  PopularityEnums.putPopularities
);
