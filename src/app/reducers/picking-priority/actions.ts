import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  PickingPrioritiesFormValues,
  PickingPrioritiesParams,
  PickingPriorityEnums,
} from "./types";

export const getAllPickingPrioritiesAction = createAction<FilterPayloadTypes>(
  PickingPriorityEnums.getAllPickingPriorities
);
export const getSearchAllPickingPrioritiesAction =
  createAction<FilterPayloadTypes>(
    PickingPriorityEnums.getSearchAllPickingPriorities
  );

export const getDetailedPickingPrioritiesAction = createAction<string>(
  PickingPriorityEnums.getDetailedPickingPriorities
);

export const postPickingPrioritiesAction =
  createAction<PickingPrioritiesFormValues>(
    PickingPriorityEnums.postPickingPriorities
  );

export const putPickingPrioritiesAction = createAction<PickingPrioritiesParams>(
  PickingPriorityEnums.putPickingPriorities
);
