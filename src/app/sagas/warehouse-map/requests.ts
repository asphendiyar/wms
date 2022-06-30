import { EmptyString, fetchHelper } from "../../helpers"
import { BASE_URL, pathnames } from "../../pathnames"
import {
  AddressChildrenTypes,
  CellGeneratorFormValues,
  CellState,
  CorrectCellPayload,
  GetFiniteCellsParams,
  PostPutECPInCellsArgs,
  PostPutECPInCellsType,
} from "../../reducers/warehouse-map/types"

export const generateCell = async (data: CellGeneratorFormValues) => {
  return fetchHelper(`${BASE_URL + pathnames.cells}generate`, "POST", data)
}
export const correctCell = async ({ cell_id, ...data }: CorrectCellPayload) => {
  return fetchHelper(`${BASE_URL + pathnames.cells + cell_id}`, "PUT", data)
}
export const getWarehouseMapAddresses = async (id: string) => {
  return fetchHelper(
    `${BASE_URL + pathnames.cells}physical/warehouses/${id}`,
    "GET"
  )
}
export const getWarehouseMapAddressChildren = async ({
  warehouse_id,
  address,
}: AddressChildrenTypes) => {
  return fetchHelper(
    `${
      BASE_URL + pathnames.cells
    }physical/warehouses/${warehouse_id}?address=${address}`,
    "GET"
  )
}
// This request used to add or edit equipments\commodities\popularities to cell item
export const postPutECPInCells = async (args: PostPutECPInCellsArgs) => {
  return fetchHelper(
    `${BASE_URL + pathnames.cells + args.id}/${args.type}/${
      args.payload.state ? args.payload.code : EmptyString
    }`,
    args.payload.state ? "PUT" : "POST",
    args.payload.state ? { state: args.payload.state } : args.payload
  )
}
const getPathname = (type: PostPutECPInCellsType) => {
  switch (type) {
    case "commodities":
      return pathnames.commodities
    case "equipments":
      return pathnames.equipments
    case "popularities":
      return pathnames.popularities
  }
}
export const getECP = async (type: PostPutECPInCellsType) => {
  return fetchHelper(BASE_URL + getPathname(type), "GET")
}
export const getCellById = async (id: string) => {
  return fetchHelper(BASE_URL + pathnames.cells + id, "GET")
}
export const changeCellState = async (params: CellState) => {
  return fetchHelper(
    `${BASE_URL + pathnames.cells + params.address}/warehouses/${
      params.warehouse_id
    }/state/${params.state}`,
    "PATCH"
  )
}
export const getFiniteCells = async (params: GetFiniteCellsParams) => {
  return fetchHelper(
    `${BASE_URL + pathnames.cells}finite-cells/warehouses/${
      params.warehouse_id
    }/page?address=${params.address}&page=${params.page}`,
    "GET"
  )
}
// export const printCellBarcode = (params: PrintCellBarcodeParams) => {
//   return fetchHelper(
//     `${BASE_URL + pathnames.cellPrinting}warehouse/${
//       params.warehouse_id
//     }/cell/${params.address}`,
//     "GET"
//   )
// }
