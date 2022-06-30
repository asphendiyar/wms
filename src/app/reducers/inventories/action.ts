import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  InventoriesEnums,
  InventoriesFormValues,
  InventoriesParams,
  PatchInventoriesParams,
} from "./types";

export const getAllInventoryTasksAction = createAction<FilterPayloadTypes>(
  InventoriesEnums.getInventoryTasks
);

export const getSearchAllInventoryTasksAction =
  createAction<FilterPayloadTypes>(InventoriesEnums.getSearchInventoryTasks);
export const getAllInventoriesAction = createAction<FilterPayloadTypes>(
  InventoriesEnums.getAllInventories
);

export const getSearchAllInventoriesAction = createAction<FilterPayloadTypes>(
  InventoriesEnums.getSearchAllInventories
);

export const getDetailedInventoriesAction = createAction<string>(
  InventoriesEnums.getDetailedInventories
);

export const postInventoriesAction = createAction<InventoriesFormValues>(
  InventoriesEnums.postInventories
);

export const putInventoriesAction = createAction<InventoriesParams>(
  InventoriesEnums.putInventories
);

export const patchRestartInventoriesAction = createAction<string>(
  InventoriesEnums.patchRestartInventories
);

export const patchStatusInventoriesAction =
  createAction<PatchInventoriesParams>(InventoriesEnums.patchStatusInventories);
