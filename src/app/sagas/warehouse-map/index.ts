import { all, takeEvery, takeLatest } from "redux-saga/effects"
import { fetchGenerator } from ".."
import { FilterPayloadTypes, WorkerParams } from "../../commonTypes"
import { CellTypesWithPage } from "../../reducers/cell-types/types"
import { ErpWarehousesWithPage } from "../../reducers/erp-warehouses/types"
import {
  setCellsTree,
  setCellsTreeParents,
  setProductWarehouses,
} from "../../reducers/products"
import {
  setCellData,
  setCommoditiesInCells,
  setEquipmentsInCells,
  setFiniteCells,
  setPopularitiesInCells,
  setWarehouseCellTypes,
  setWarehouseErps,
  setWarehouseFZones,
  setWarehouseMapAddressChildren,
  setWarehouseMapAddresses,
  setWarehousesList,
} from "../../reducers/warehouse-map"
import {
  AddressChildrenTypes,
  CellGeneratorFormValues,
  CellState,
  CorrectCellPayload,
  CreateTreeActionPayload,
  GetFiniteCellsParams,
  PostPutECPInCellsArgs,
  PostPutECPInCellsType,
  WarehouseMapEnums,
} from "../../reducers/warehouse-map/types"
import { FunctionalZones, FZoneParams } from "../../reducers/warehouse/types"
import { getAllCellTypes } from "../cell-types/requests"
import { getAllErpWarehouses } from "../erp-warehouses/requests"
import { getAllWarehouse, getFzonesByWarehouseId } from "../warehouse/requests"
import {
  changeCellState,
  correctCell,
  generateCell,
  getCellById,
  getECP,
  getFiniteCells,
  getWarehouseMapAddressChildren,
  getWarehouseMapAddresses,
  postPutECPInCells,
} from "./requests"

// This request used to generate tree view in warehouse map page and products page
function* getAllWarehouseWorker({
  payload,
  type,
}: WorkerParams<CreateTreeActionPayload<FilterPayloadTypes>>) {
  yield fetchGenerator(
    getAllWarehouse,
    payload.reqPayload,
    payload.actionKind === "products"
      ? setProductWarehouses
      : setWarehousesList,
    type
  )
}
// This request used to generate tree view in warehouse map page and products page
function* getWarehouseMapAddressesWorker({
  payload,
  type,
}: WorkerParams<CreateTreeActionPayload<string>>) {
  yield fetchGenerator(
    getWarehouseMapAddresses,
    payload.reqPayload,
    payload.actionKind === "products"
      ? setCellsTreeParents
      : setWarehouseMapAddresses,
    type
  )
}
// This request used to generate tree view in warehouse map page and products page
function* getWarehouseMapAddressChildrenWorker({
  payload,
  type,
}: WorkerParams<CreateTreeActionPayload<AddressChildrenTypes>>) {
  yield fetchGenerator(
    getWarehouseMapAddressChildren,
    payload.reqPayload,
    payload.actionKind === "products"
      ? setCellsTree
      : setWarehouseMapAddressChildren,
    type
  )
}
function* getWarehouseErpsWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, ErpWarehousesWithPage>(
    getAllErpWarehouses,
    payload,
    setWarehouseErps,
    type
  )
}
function* getWarehouseFZonesWorker({
  payload,
  type,
}: WorkerParams<FZoneParams>) {
  yield fetchGenerator<FZoneParams, FunctionalZones[]>(
    getFzonesByWarehouseId,
    payload,
    setWarehouseFZones,
    type
  )
}
function* getWarehouseCellTypesWorker({
  payload,
  type,
}: WorkerParams<FilterPayloadTypes>) {
  yield fetchGenerator<FilterPayloadTypes, CellTypesWithPage>(
    getAllCellTypes,
    payload,
    setWarehouseCellTypes,
    type
  )
}
function* cellGeneratorWorker({
  payload,
  type,
}: WorkerParams<CellGeneratorFormValues>) {
  yield fetchGenerator(generateCell, payload, null, type)
}
function* correctCellWorker({
  payload,
  type,
}: WorkerParams<CorrectCellPayload>) {
  yield fetchGenerator(correctCell, payload, null, type)
}
function* postPutECPInCellsWorker({
  payload,
  type,
}: WorkerParams<PostPutECPInCellsArgs>) {
  yield fetchGenerator(postPutECPInCells, payload, null, type)
}
function* getECPWorker({ payload, type }: WorkerParams<PostPutECPInCellsType>) {
  yield fetchGenerator(
    getECP,
    payload,
    payload === "commodities"
      ? setCommoditiesInCells
      : payload === "equipments"
      ? setEquipmentsInCells
      : setPopularitiesInCells,
    type
  )
}
function* getCellByIdWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator(getCellById, payload, setCellData, type)
}
function* changeCellStateWorker({ payload, type }: WorkerParams<CellState>) {
  yield fetchGenerator(changeCellState, payload, null, type)
}
function* getFiniteCellsWorker({
  payload,
  type,
}: WorkerParams<GetFiniteCellsParams>) {
  yield fetchGenerator(getFiniteCells, payload, setFiniteCells, type)
}
// function* printCellBarcodeWorker({
//   payload,
//   type,
// }: WorkerParams<PrintCellBarcodeParams>) {
//   yield fetchGenerator(printCellBarcode, payload, openGeneratedBarcode, type)
// }
export function* warehouseMapWatcher() {
  yield all([
    takeEvery(WarehouseMapEnums.getWarehousesList, getAllWarehouseWorker),
    takeEvery(
      WarehouseMapEnums.getWarehouseMapAddresses,
      getWarehouseMapAddressesWorker
    ),
    takeEvery(
      WarehouseMapEnums.getWarehouseMapAddressChildren,
      getWarehouseMapAddressChildrenWorker
    ),
    takeEvery(WarehouseMapEnums.getWarehouseErps, getWarehouseErpsWorker),
    takeEvery(WarehouseMapEnums.getWarehouseFZones, getWarehouseFZonesWorker),
    takeEvery(
      WarehouseMapEnums.getWarehouseCellTypes,
      getWarehouseCellTypesWorker
    ),
    takeEvery(WarehouseMapEnums.getFiniteCells, getFiniteCellsWorker),
    // takeEvery(WarehouseMapEnums.print, printCellBarcodeWorker),
    takeEvery(WarehouseMapEnums.getCellById, getCellByIdWorker),
    takeEvery(WarehouseMapEnums.changeCellState, changeCellStateWorker),
    takeLatest(WarehouseMapEnums.generateCell, cellGeneratorWorker),
    takeLatest(WarehouseMapEnums.correctCell, correctCellWorker),
    takeLatest(WarehouseMapEnums.postPutECPInCells, postPutECPInCellsWorker),
    takeLatest(WarehouseMapEnums.getECPInModal, getECPWorker),
  ])
}
