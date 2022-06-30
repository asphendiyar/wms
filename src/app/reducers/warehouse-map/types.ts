import { ReactSelectValues, TreeNode } from "../../commonTypes"
import { CellTypesContentType, CellTypesWithPage } from "../cell-types/types"
import { ErpWarehousesWithPage } from "../erp-warehouses/types"
import {
  FunctionalZones,
  WarehouseAllTypes,
  WarehouseECPType,
} from "../warehouse/types"

export type CellGeneratorFormValues = {
  cell_type_id: number
  warehouse_id: number
  erp_warehouse_id: number
  functional_zone_id: string
  is_allow_overflow: boolean
  is_merge_trade_item: boolean
  high_rise: number
  compression: number
  prefix_region: string
  prefix_row: string
  row_from: string
  row_to: string
  prefix_section: string
  section_from: string
  section_to: string
  prefix_floor: string
  floor_from: string
  floor_to: string
  prefix_compartment: string
  compartment_from: string
  compartment_to: string
  prefix_shelf: string
  shelf_from: string
  shelf_to: string
  max_weight: number
  max_volume: number
  length: number
  width: number
  height: number
  is_save_without_commodity_unit: string
  is_save_comm_unit_same_level: string
  commodity_unit_disassembly_rule: string
  package_disassembly_rule: string
}
export interface CorrectCellPayloadGeneralKey {
  retention_rule: string
  is_allow_overflow: boolean
  is_merge_trade_item: boolean
  high_rise: number
  compression: number
  actual_pallet: number
  pallet_left: number
  max_pallet: number
  cell_type_id: number
}
export interface CorrectCellPayloadMeasurementKey {
  weight: number
  volume: number
  length: number
  width: number
  height: number
}
export interface CorrectCellPayload {
  warehouse_id: number
  cell_id: string
  erp_warehouse_id: number
  functional_zone_id: number
  general: CorrectCellPayloadGeneralKey
  measurement: CorrectCellPayloadMeasurementKey
}
export interface CellDataGeneralKey
  extends Omit<CorrectCellPayloadGeneralKey, "functional_zone"> {
  id: number
  created_date: string
  updated_date: string
  functional_zone: Pick<FunctionalZones, "id" | "code">
  cell_type: Pick<
    CellTypesContentType,
    "id" | "code" | "name" | "type" | "storage_type"
  >
}
export interface CellDataMeasurementKey
  extends CorrectCellPayloadMeasurementKey {
  actual_weight_percent: number
  actual_weight: number
  remaining_weight: number
  actual_volume_percent: number
  actual_volume: number
  remaining_volume: number
  max_weight: number
  max_volume: number
}
export type CellData = {
  state: CellStateType
  state_title: string
  warehouse_id: number
  erp_warehouse_id: number
  address: string
  alternative_address: string
  region: string
  row: string
  section: string
  floor: string
  compartment: string
  shelf: string
  general: CellDataGeneralKey
  measurement: CellDataMeasurementKey
  commodities: WarehouseECPType[]
  popularities: WarehouseECPType[]
  equipments: WarehouseECPType[]
}
export interface CorrectCellFormValues
  extends Omit<CorrectCellPayload, "general" | "measurement"> {
  retention_rule: string
  is_allow_overflow: boolean
  is_merge_trade_item: boolean
  high_rise: number
  compression: number
  actual_pallet: number
  pallet_left: number
  max_pallet: number
  functional_zone: number
  weight: number
  volume: number
  length: number
  width: number
  height: number
}
// Types for finite cell, start
export type GetFiniteCellsParams = {
  warehouse_id: string
  address: string
  page: number
}
export type FiniteCellsResponse = {
  content: Array<CellData & { id: number }>
  available_quantity: number
  reserved_quantity: number
  number: number
  number_of_elements: number
  total_elements: number
  total_pages: number
}
// Types for finite cell, end
// types for warehouse map tree, start
export type AddressesFZone = {
  id: number
  code: string
}
export type WarehouseMapAddresses = {
  id: number
  address: string
  has_child: boolean
  floor: string
  functional_zone: AddressesFZone
}
export type WarehouseMapAddressesResponse = {
  warehouse_id: number
  addresses: WarehouseMapAddresses[]
}
export type AddressChildrenTypes = {
  warehouse_id: string
  address: string
}
export type WarehouseMapTree = { [key: string]: TreeNode }
export type CreateTreeActionPayload<ReqPayload> = {
  reqPayload: ReqPayload
  actionKind?: string
}
export type PrintCellBarcodeParams = {
  warehouse_id: number
  address: string
}
// types for warehouse map tree, end

// types for cell items, start
export type CellStateType = "active" | "disabled"
export type CellState = {
  state: CellStateType
  address: string
  warehouse_id: string
}
export type CellsTableColumns = {
  id: number
  address: string
  cell_type: string
  functional_zone: string
  state: string
}
// types for cell items, end

export enum WarehouseMapEnums {
  getWarehousesList = "warehouse-map/warehouses/get",
  getWarehouseMapAddresses = "warehouse-map/addresses/get",
  getWarehouseMapAddressChildren = "warehouse-map/address/children/get",
  getWarehouseErps = "warehouse-map/cells/generator/get/erp",
  generateCell = "warehouse-map/cells/generate",
  correctCell = "warehouse-map/cells/correct",
  getFiniteCells = "warehouse-map/cells/finite",
  postPutECPInCells = "warehouse-map/cells/postput",
  getWarehouseFZones = "warehouse-map/fzones/get",
  getWarehouseCellTypes = "warehouse-map/cell-types/get",
  getECPInModal = "warehouse-map/cells/ECP/get",
  getCellById = "warehouse-map/cells/id/get",
  changeCellState = "warehouse-map/cells/state/put",
  print = "warehouse-map/cell/barcode/print",
}

// type for adding or editing commodities\equipments\popularities to cells, start
export type PostPutECPInCellsType =
  | "commodities"
  | "equipments"
  | "popularities"
  | ""
export type PostPutInCellsPayload = {
  code: string
  state?: "active" | "disabled"
}
export type PostPutECPInCellsArgs = {
  type: PostPutECPInCellsType
  id: string
  payload: PostPutInCellsPayload
}
export type ECPSelectorReturns = {
  equipments: WarehouseECPType[]
  popularities: WarehouseECPType[]
  commodities: WarehouseECPType[]
}
// type for adding or editing commodities\equipments\popularities to cells, end

export type WarehouseMapInitials = {
  tree: WarehouseMapTree
  warehouses: WarehouseAllTypes | undefined
  warehouseMapAddresses: WarehouseMapAddressesResponse | undefined
  selectedNode: TreeNode | undefined
  selectedRootWarehouseId: string
  warehouseErps: ReactSelectValues[]
  warehouseErpsResponse: ErpWarehousesWithPage | undefined
  warehouseFZones: ReactSelectValues[]
  warehouseFZonesResponse: FunctionalZones[]
  warehouseCellTypes: ReactSelectValues[]
  warehouseCellTypesResponse: CellTypesWithPage | undefined
  comoditites: WarehouseECPType[]
  popularities: WarehouseECPType[]
  equipments: WarehouseECPType[]
  cellData: CellData | undefined
  finiteCellsResponse: FiniteCellsResponse
  pagePath: string // This key used to define the page which warehouse products or warehouse trade items should be render
}
