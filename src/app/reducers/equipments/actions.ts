import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  EquipmentEnums,
  EquipmentsFormValues,
  EquipmentsParams,
} from "./types";

export const getAllEquipmentsAction = createAction<FilterPayloadTypes>(
  EquipmentEnums.getAllEquipments
);
export const getSearchAllEquipmentsAction = createAction<FilterPayloadTypes>(
  EquipmentEnums.getSearchAllEquipments
);

export const getDetailedEquipmentsAction = createAction<string>(
  EquipmentEnums.getDetailedEquipments
);

export const postEquipmentsAction = createAction<EquipmentsFormValues>(
  EquipmentEnums.postEquipments
);

export const putEquipmentsAction = createAction<EquipmentsParams>(
  EquipmentEnums.putEquipments
);
