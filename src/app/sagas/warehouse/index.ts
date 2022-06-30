import { all, takeLatest } from "@redux-saga/core/effects";
import { fetchGenerator } from "..";
import {
  FilterPayloadTypes,
  PostResponse,
  PutResponse,
  WorkerParams,
} from "../../commonTypes";
import {
  setAddAddressesWarehouse,
  setAddCommodityWarehouse,
  setAddEquipmentWarehouse,
  setAddFZoneWarehouse,
  setAddPopularityWarehouse,
  setAddWarehouse,
  setAllFZones,
  setGetAllWarehouses,
  setGetCommoditiesWarehouse,
  setGetDetailedWarehouse,
  setGetEquipmentsWarehouse,
  setGetPopularitiesWarehouse,
  setPutAddressesWarehouse,
  setPutCommoditiesWarehouse,
  setPutEquipmentsWarehouse,
  setPutFZoneWarehouses,
  setPutPopularitiesWarehouse,
  setPutWarehouses,
  setSearchGetAllWarehouses,
} from "../../reducers/warehouse";
import {
  AddressesTypesParams,
  FunctionalZones,
  FZoneParams,
  WarehouseAllTypes,
  WarehouseContentType,
  WarehouseECPType,
  WarehouseEnums,
  WarehouseFormValues,
  WarehouseParams,
} from "../../reducers/warehouse/types";
import {
  getAllCommodities,
  getAllEquipmentsWarehouse,
  getAllPopularities,
  getAllWarehouse,
  getDetailedWarehouse,
  getFzonesByWarehouseId,
  postAdressesWarehouse,
  postCommodityWarehouse,
  postEquipmentsWarehouse,
  postFZoneWarehouse,
  postPopularityWarehouse,
  postWarehouse,
  putAdressesWarehouse,
  putCommodityWarehouse,
  putEquipmentsWarehouse,
  putFZoneWarehouse,
  putPopularityWarehouse,
  putWarehouse,
  WarehouseECPTypeParams,
} from "./requests";

function* postWarehouseWorker({
  payload,
  type,
}: WorkerParams<WarehouseFormValues>) {
  yield fetchGenerator<WarehouseFormValues, PostResponse | null>(
    postWarehouse,
    payload,
    setAddWarehouse,
    type
  );
}

function* putWarehouseWorker({ payload, type }: WorkerParams<WarehouseParams>) {
  yield fetchGenerator<WarehouseParams, PutResponse | null>(
    putWarehouse,
    payload,
    setPutWarehouses,
    type
  );
}

function* postAdressesWarehouseWorker({
  payload,
  type,
}: WorkerParams<AddressesTypesParams>) {
  yield fetchGenerator<AddressesTypesParams, PostResponse | null>(
    postAdressesWarehouse,
    payload,
    setAddAddressesWarehouse,
    type
  );
}

function* putAdressesWarehouseWorker({
  payload,
  type,
}: WorkerParams<AddressesTypesParams>) {
  yield fetchGenerator<AddressesTypesParams, PostResponse | null>(
    putAdressesWarehouse,
    payload,
    setPutAddressesWarehouse,
    type
  );
}

function* postFZoneWarehouseWorker({
  payload,
  type,
}: WorkerParams<FZoneParams>) {
  yield fetchGenerator<FZoneParams, PostResponse | null>(
    postFZoneWarehouse,
    payload,
    setAddFZoneWarehouse,
    type
  );
}

function* putFZoneWarehouseWorker({
  payload,
  type,
}: WorkerParams<FZoneParams>) {
  yield fetchGenerator<FZoneParams, PostResponse | null>(
    putFZoneWarehouse,
    payload,
    setPutFZoneWarehouses,
    type
  );
}

function* postEquipmentsWarehouseWorker({
  payload,
  type,
}: WorkerParams<WarehouseECPTypeParams>) {
  yield fetchGenerator<WarehouseECPTypeParams, PostResponse | null>(
    postEquipmentsWarehouse,
    payload,
    setAddEquipmentWarehouse,
    type
  );
}

function* putEquipmentsWarehouseWorker({
  payload,
  type,
}: WorkerParams<WarehouseECPTypeParams>) {
  yield fetchGenerator<WarehouseECPTypeParams, PutResponse | null>(
    putEquipmentsWarehouse,
    payload,
    setPutEquipmentsWarehouse,
    type
  );
}
function* postCommoditiesWorker({
  payload,
  type,
}: WorkerParams<WarehouseECPTypeParams>) {
  yield fetchGenerator<WarehouseECPTypeParams, PostResponse | null>(
    postCommodityWarehouse,
    payload,
    setAddCommodityWarehouse,
    type
  );
}

function* putCommoditiesWorker({
  payload,
  type,
}: WorkerParams<WarehouseECPTypeParams>) {
  yield fetchGenerator<WarehouseECPTypeParams, PutResponse | null>(
    putCommodityWarehouse,
    payload,
    setPutCommoditiesWarehouse,
    type
  );
}
function* postPopularityWarehouseWorker({
  payload,
  type,
}: WorkerParams<WarehouseECPTypeParams>) {
  yield fetchGenerator<WarehouseECPTypeParams, PostResponse | null>(
    postPopularityWarehouse,
    payload,
    setAddPopularityWarehouse,
    type
  );
}

function* putPopularityWarehouseWorker({
  payload,
  type,
}: WorkerParams<WarehouseECPTypeParams>) {
  yield fetchGenerator<WarehouseECPTypeParams, PutResponse | null>(
    putPopularityWarehouse,
    payload,
    setPutPopularitiesWarehouse,
    type
  );
}

function* getAllWarehousesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, WarehouseAllTypes>(
    getAllWarehouse,
    payload,
    setGetAllWarehouses,
    type
  );
}

function* getSearchAllWarehousesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, WarehouseAllTypes>(
    getAllWarehouse,
    payload,
    setSearchGetAllWarehouses,
    type
  );
}
function* getAllEquipmentsWarehouseWorker({ type }: WorkerParams<null>) {
  yield fetchGenerator<null, WarehouseECPType[]>(
    getAllEquipmentsWarehouse,
    null,
    setGetEquipmentsWarehouse,
    type
  );
}

function* getAllCommoditiesWorker({ type }: WorkerParams<null>) {
  yield fetchGenerator<null, WarehouseECPType[]>(
    getAllCommodities,
    null,
    setGetCommoditiesWarehouse,
    type
  );
}

function* getAllPopularitiesWorker({ type }: WorkerParams<null>) {
  yield fetchGenerator<null, WarehouseECPType[]>(
    getAllPopularities,
    null,
    setGetPopularitiesWarehouse,
    type
  );
}
function* getAllFZonesWorker({ payload, type }: WorkerParams<FZoneParams>) {
  yield fetchGenerator<FZoneParams, FunctionalZones[]>(
    getFzonesByWarehouseId,
    payload,
    setAllFZones,
    type
  );
}

function* getDetailedWarehouseWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, WarehouseContentType>(
    getDetailedWarehouse,
    payload,
    setGetDetailedWarehouse,
    type
  );
}

export function* warehouseWatcher() {
  yield all([
    takeLatest(WarehouseEnums.postWarehouse, postWarehouseWorker),
    takeLatest(WarehouseEnums.putWarehouse, putWarehouseWorker),
    takeLatest(
      WarehouseEnums.postEquipmentsWarehouse,
      postEquipmentsWarehouseWorker
    ),
    takeLatest(
      WarehouseEnums.putEquipmentsWarehouse,
      putEquipmentsWarehouseWorker
    ),
    takeLatest(WarehouseEnums.postCommodityWarehouse, postCommoditiesWorker),
    takeLatest(WarehouseEnums.putCommodityWarehouse, putCommoditiesWorker),
    takeLatest(
      WarehouseEnums.postPopularityWarehouse,
      postPopularityWarehouseWorker
    ),
    takeLatest(
      WarehouseEnums.putPopularityWarehouse,
      putPopularityWarehouseWorker
    ),
    takeLatest(
      WarehouseEnums.postAdressesWarehouse,
      postAdressesWarehouseWorker
    ),
    takeLatest(WarehouseEnums.putAdressesWarehouse, putAdressesWarehouseWorker),
    takeLatest(WarehouseEnums.postFZoneWarehouse, postFZoneWarehouseWorker),
    takeLatest(WarehouseEnums.putFZoneWarehouse, putFZoneWarehouseWorker),
    takeLatest(
      WarehouseEnums.getAllCommodityWarehouse,
      getAllCommoditiesWorker
    ),
    takeLatest(
      WarehouseEnums.getAllEquipmentsWarehouse,
      getAllEquipmentsWarehouseWorker
    ),
    takeLatest(
      WarehouseEnums.getAllPopularityWarehouse,
      getAllPopularitiesWorker
    ),
    takeLatest(WarehouseEnums.getAllWarehouse, getAllWarehousesWorker),
    takeLatest(
      WarehouseEnums.getSearchAllWarehouse,
      getSearchAllWarehousesWorker
    ),
    takeLatest(WarehouseEnums.getDetailedWarehouse, getDetailedWarehouseWorker),
    takeLatest(WarehouseEnums.getAllFZonesWarehouse, getAllFZonesWorker),
  ]);
}
