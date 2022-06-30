import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { PatchOutboundParams } from "../outbound/types";
import { FZoneParams } from "../warehouse/types";
import { ShipmentEnums, ShipmentsFormValues, ShipmentsParams } from "./types";

export const getAllShipmentsAction = createAction<FilterPayloadTypes>(
  ShipmentEnums.getAllShipments
);

export const getSearchAllShipmentsAction = createAction<FilterPayloadTypes>(
  ShipmentEnums.getSearchAllShipments
);

export const getDetailedShipmentAction = createAction<string>(
  ShipmentEnums.getDetailedShipments
);

export const postShipmentsAction = createAction<ShipmentsFormValues>(
  ShipmentEnums.postShipments
);

export const putShipmentsAction = createAction<ShipmentsParams>(
  ShipmentEnums.putShipments
);

export const patchOpenShipmentsAction = createAction<string>(
  ShipmentEnums.patchOpenShipment
);
export const patchDeattachFromShipmentsAction =
  createAction<PatchOutboundParams>(ShipmentEnums.patchDeattachFromShipment);

export const getAllFzoneShipmentsAction = createAction<FZoneParams>(
  ShipmentEnums.getAllFzonesShipment
);

export const getAllRampsShipmentsAction = createAction<null>(
  ShipmentEnums.getAllRampsShipment
);
