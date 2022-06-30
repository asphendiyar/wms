import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  ErpWarehouseEnums,
  ErpWarehousesFormValues,
  ErpWarehousesParams,
} from "./types";

export const getAllErpWarehousesAction = createAction<FilterPayloadTypes>(
  ErpWarehouseEnums.getAllErpWarehouses
);
export const getSearchAllErpWarehousesAction = createAction<FilterPayloadTypes>(
  ErpWarehouseEnums.getSearchAllErpWarehouses
);

export const getDetailedErpWarehousesAction = createAction<string>(
  ErpWarehouseEnums.getDetailedErpWarehouses
);

export const postErpWarehousesAction = createAction<ErpWarehousesFormValues>(
  ErpWarehouseEnums.postErpWarehouses
);

export const putErpWarehousesAction = createAction<ErpWarehousesParams>(
  ErpWarehouseEnums.putErpWarehouses
);
