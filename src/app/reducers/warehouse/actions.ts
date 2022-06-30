import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { WarehouseECPTypeParams } from "../../sagas/warehouse/requests";
import {
  AddressesTypesParams,
  FZoneParams,
  WarehouseEnums,
  WarehouseFormValues,
  WarehouseParams,
} from "./types";

export const putWarehouseAction = createAction<WarehouseParams>(
  WarehouseEnums.putWarehouse
);

export const postWarehouseAction = createAction<WarehouseFormValues>(
  WarehouseEnums.postWarehouse
);

export const postPopularityWarehouseAction =
  createAction<WarehouseECPTypeParams>(WarehouseEnums.postPopularityWarehouse);

export const putPopularityWarehouseAction =
  createAction<WarehouseECPTypeParams>(WarehouseEnums.putPopularityWarehouse);

export const postEquipmentAction = createAction<WarehouseECPTypeParams>(
  WarehouseEnums.postEquipmentsWarehouse
);

export const putEquipmentAction = createAction<WarehouseECPTypeParams>(
  WarehouseEnums.putEquipmentsWarehouse
);

export const postCommodityWarehouseAction =
  createAction<WarehouseECPTypeParams>(WarehouseEnums.postCommodityWarehouse);

export const putCommodityWarehouseAction = createAction<WarehouseECPTypeParams>(
  WarehouseEnums.putCommodityWarehouse
);

export const postAdressesWarehouseAction = createAction<AddressesTypesParams>(
  WarehouseEnums.postAdressesWarehouse
);

export const putAdressesWarehouseAction = createAction<AddressesTypesParams>(
  WarehouseEnums.putAdressesWarehouse
);

export const postFZoneWarehouseAction = createAction<FZoneParams>(
  WarehouseEnums.postFZoneWarehouse
);

export const putFZoneWarehouseAction = createAction<FZoneParams>(
  WarehouseEnums.putFZoneWarehouse
);

export const getDetailedWarehouseAction = createAction<string>(
  WarehouseEnums.getDetailedWarehouse
);

export const getAllWarehouseAction = createAction<FilterPayloadTypes>(
  WarehouseEnums.getAllWarehouse
);

export const getSearchAllWarehouseAction = createAction<FilterPayloadTypes>(
  WarehouseEnums.getSearchAllWarehouse
);

export const getAllEquipmentsWarehouseAction = createAction<null>(
  WarehouseEnums.getAllEquipmentsWarehouse
);

export const getAllCommodityWarehouseAction = createAction<null>(
  WarehouseEnums.getAllCommodityWarehouse
);

export const getAllPopularityWarehouseAction = createAction<null>(
  WarehouseEnums.getAllPopularityWarehouse
);

export const getAllFZonesWarehoseAction = createAction<FZoneParams>(
  WarehouseEnums.getAllFZonesWarehouse
);
