import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { PatchPickingOrdersParams, PickingOrderEnums } from "./types";

export const getAllPickingOrdersAction = createAction<FilterPayloadTypes>(
  PickingOrderEnums.getAllPickingOrders
);
export const getPickingTasksAction = createAction<string>(
  PickingOrderEnums.getPickingTasks
);
export const getSearchAllPickingOrdersAction = createAction<FilterPayloadTypes>(
  PickingOrderEnums.getSearchAllPickingOrders
);
export const getDetailedPickingOrdersAction = createAction<string>(
  PickingOrderEnums.getDetailedPickingOrder
);
export const patchPickingOrdersPickAction =
  createAction<PatchPickingOrdersParams>(
    PickingOrderEnums.patchPickPickingOrders
  );
