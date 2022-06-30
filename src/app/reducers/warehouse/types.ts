import { PostResponse, PutResponse } from "../../commonTypes"
import { ErpWarehousesContentType } from "../erp-warehouses/types"

export type WarehouseFormValues = {
  code: string
  name: string
}

export type WarehouseParams = {
  data: WarehouseFormValues
  id: string
}

export type AddressesTypes = {
  id: number
  name: string
  postal_code: string
  city: string
  address: string
  address_additional: string
  contact_person: string
  phone_number: string
  email: string
  is_primary: boolean
  created_date: string
  updated_date: string
}

export type RampsType = {
  content: RampsContentType[]
  number: number
  number_of_elements: number
  total_elements: number
  total_pages: number
}

export type RampsContentType = {
  code: string
  value: string
}

export type AddressesTypesParamsData = {
  name: string
  postal_code: string
  city: string
  address: string
  address_additional: string
  contact_person: string
  phone_number: string
  email: string
  is_primary: boolean
}
export type AddressesTypesParams = {
  data: AddressesTypesParamsData
  id?: string
  w_id?: string
}

// Equipments, Commodities, Popularities body on get request
export type WarehouseECPType = {
  id: string
  code: string
  value: string
  address: string
  state: string
  state_title: string
  description: string
  created_date: string
  updated_date: string
  action?: JSX.Element
}

export type FunctionalZones = {
  id: string
  state: string
  code: string
  name_kk: string
  name_ru: string
  name_en: string
  function: string
  picking_method: string
  replenishment_method: string
  max_picking_orders: string
  commodity_unit_disassembly_rule: string
  package_disassembly_rule: string
  is_save_without_commodity_unit: boolean
  is_save_comm_unit_same_level: boolean
  is_used_for_picking: boolean
  is_mezzanine: boolean
  packing_station_type: string
}

export type FunctionalZonesPostAndPut = {
  code: string
  name_kk: string
  name_ru: string
  name_en: string
  function: string
  picking_method: string
  replenishment_method: string
  max_picking_orders: number
  commodity_unit_disassembly_rule: string
  package_disassembly_rule: string
  is_save_without_commodity_unit: boolean
  is_save_comm_unit_same_level: boolean
  is_used_for_picking: boolean
  is_mezzanine: boolean
  packing_station_type: string
}

export type FZoneParams = {
  data?: FunctionalZonesPostAndPut
  id?: string
  w_id?: number
}

export type WarehouseContentType = {
  id: number
  state: string
  code: string
  name: string
  addresses: AddressesTypes[]
  commodities: WarehouseECPType[]
  popularities: WarehouseECPType[]
  equipments: WarehouseECPType[]
  functional_zones: FunctionalZones[]
  erp_warehouse: ErpWarehousesContentType[]
}

export type WarehouseAllTypes = {
  content: WarehouseContentType[]
  number: number
  number_of_elements: number
  total_elements: number
  total_pages: number
}

export type PostAddressesType = {
  name: string
  postal_code: string
  city: string
  address: string
  address_additional: string
  contact_person: string
  phone_number: string
  email: string
  is_primary: boolean
}

export interface WarehouseInitials {
  allWarehouse: WarehouseAllTypes
  createWarehouse: PostResponse | null
  putWarehouse: PutResponse | null
  detailedWarehouse: WarehouseContentType | null
  getCommodity: WarehouseECPType[]
  getEquipment: WarehouseECPType[]
  getPopularity: WarehouseECPType[]
  createAdresses: PostResponse | null
  createEquipment: PostResponse | null
  createPopularity: PostResponse | null
  createCommodity: PostResponse | null
  createFzone: PostResponse | null
  putAdressesWarehouse: PostResponse | null
  putEquipment: PutResponse | null
  putCommodityWarehouse: PutResponse | null
  putPopularityWarehouse: PutResponse | null
  putFZoneWarehouse: PutResponse | null
  selectedCommodity: WarehouseECPType | null
  selectedEquipment: WarehouseECPType | null
  selectedPopularity: WarehouseECPType | null
  selectedAdress: AddressesTypes | null
  selectedFZone: FunctionalZones | null
  allFZonesByWarehouseID: FunctionalZones[]
}

export type FilterTypes = {
  page: number
  code: string
}

export enum WarehouseEnums {
  postWarehouse = "warehouse/post/one",
  putWarehouse = "warehouse/put/one",
  postEquipmentsWarehouse = "warehouse/post/equipments/one",
  putEquipmentsWarehouse = "warehouse/put/equipments/one",
  postCommodityWarehouse = "warehouse/post/commodity/one",
  putCommodityWarehouse = "warehouse/put/commodity/one",
  postPopularityWarehouse = "warehouse/post/popularity/one",
  putPopularityWarehouse = "warehouse/put/popularity/one",
  postAdressesWarehouse = "warehouse/post/adresses/one",
  putAdressesWarehouse = "warehouse/put/adresses/one",
  postFZoneWarehouse = "warehouse/post/fzone/one",
  putFZoneWarehouse = "warehouse/put/fzone/one",
  getAllWarehouse = "warehouse/get/all",
  getSearchAllWarehouse = "warehouse/search/all",
  getDetailedWarehouse = "warehouse/get/one",
  getAllEquipmentsWarehouse = "warehouse/get/equipments/all",
  getAllCommodityWarehouse = "warehouse/get/commodity/all",
  getAllPopularityWarehouse = "warehouse/get/popularity/all",
  getAllFZonesWarehouse = "warehouse/get/fzone/all",
  getWarehouseFZones = "warehouse/get/warehouse/fzones",
}
