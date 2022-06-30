import { all, takeLatest } from "@redux-saga/core/effects";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import { fetchGenerator } from "..";
import {
  ShipmentEnums,
  ShipmentsContentType,
  ShipmentsFormValues,
  ShipmentsParams,
  ShipmentsWithPage,
} from "../../reducers/shipments/types";
import {
  getAllShipments,
  getDetailedShipment,
  patchDeattachFromShipment,
  patchOpenShipments,
  postShipments,
  putShipments,
} from "./requests";
import {
  setAddShipment,
  setGetAllFzonesShipment,
  setGetAllRampsShipment,
  setGetAllShipments,
  setGetDetailedShipment,
  setPatchDeattachShipment,
  setPatchOpenShipment,
  setPutShipment,
  setSearchGetAllShipments,
} from "../../reducers/shipments";
import {
  getFzonesByWarehouseId,
  getRampsWarehouse,
} from "../warehouse/requests";
import {
  FunctionalZones,
  FZoneParams,
  RampsType,
} from "../../reducers/warehouse/types";
import { PatchOutboundParams } from "../../reducers/outbound/types";

function* postShipmentsWorker({
  payload,
  type,
}: WorkerParams<ShipmentsFormValues>) {
  yield fetchGenerator<ShipmentsFormValues, PostResponse | null>(
    postShipments,
    payload,
    setAddShipment,
    type
  );
}

function* putShipmentsWorker({ payload, type }: WorkerParams<ShipmentsParams>) {
  yield fetchGenerator<ShipmentsParams, PutResponse | null>(
    putShipments,
    payload,
    setPutShipment,
    type
  );
}
function* patchOpenShipmentsWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, PutResponse | null>(
    patchOpenShipments,
    payload,
    setPatchOpenShipment,
    type
  );
}
function* patchDeattachFromShipmentWorker({
  payload,
  type,
}: WorkerParams<PatchOutboundParams>) {
  yield fetchGenerator<PatchOutboundParams, PutResponse | null>(
    patchDeattachFromShipment,
    payload,
    setPatchDeattachShipment,
    type
  );
}

function* getAllShipmentsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ShipmentsWithPage>(
    getAllShipments,
    payload,
    setGetAllShipments,
    type
  );
}

function* getSearchAllShipmentsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ShipmentsWithPage>(
    getAllShipments,
    payload,
    setSearchGetAllShipments,
    type
  );
}

function* getDetailedShipmentWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, ShipmentsContentType>(
    getDetailedShipment,
    payload,
    setGetDetailedShipment,
    type
  );
}

function* getAllRampsShipmentsWorker({ payload, type }: WorkerParams<null>) {
  yield fetchGenerator<null, RampsType>(
    getRampsWarehouse,
    payload,
    setGetAllRampsShipment,
    type
  );
}

function* getAllFzonesShipmentsWorker({
  payload,
  type,
}: WorkerParams<FZoneParams>) {
  yield fetchGenerator<FZoneParams, FunctionalZones[]>(
    getFzonesByWarehouseId,
    payload,
    setGetAllFzonesShipment,
    type
  );
}

export function* shipmentsWatcher() {
  yield all([
    takeLatest(ShipmentEnums.getAllShipments, getAllShipmentsWorker),
    takeLatest(ShipmentEnums.getDetailedShipments, getDetailedShipmentWorker),
    takeLatest(ShipmentEnums.postShipments, postShipmentsWorker),
    takeLatest(ShipmentEnums.putShipments, putShipmentsWorker),
    takeLatest(ShipmentEnums.patchOpenShipment, patchOpenShipmentsWorker),
    takeLatest(
      ShipmentEnums.patchDeattachFromShipment,
      patchDeattachFromShipmentWorker
    ),
    takeLatest(ShipmentEnums.getAllRampsShipment, getAllRampsShipmentsWorker),
    takeLatest(ShipmentEnums.getAllFzonesShipment, getAllFzonesShipmentsWorker),
    takeLatest(
      ShipmentEnums.getSearchAllShipments,
      getSearchAllShipmentsWorker
    ),
  ]);
}
