import { createAction } from "@reduxjs/toolkit"
import { FilterPayloadTypes } from "../../commonTypes"
import { FZoneParams } from "../warehouse/types"
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
} from "./types"

export const postPutECPInCellsAction = createAction<PostPutECPInCellsArgs>(
  WarehouseMapEnums.postPutECPInCells
)
export const getECPAction = createAction<PostPutECPInCellsType>(
  WarehouseMapEnums.getECPInModal
)
export const generateCellAction = createAction<CellGeneratorFormValues>(
  WarehouseMapEnums.generateCell
)
export const correctCellAction = createAction<CorrectCellPayload>(
  WarehouseMapEnums.correctCell
)
export const getWarehousesListAction = createAction<
  CreateTreeActionPayload<FilterPayloadTypes>
>(WarehouseMapEnums.getWarehousesList)

export const getWarehouseMapAddressesAction = createAction<
  CreateTreeActionPayload<string>
>(WarehouseMapEnums.getWarehouseMapAddresses)

export const getWarehouseMapAddressChildrenAction = createAction<
  CreateTreeActionPayload<AddressChildrenTypes>
>(WarehouseMapEnums.getWarehouseMapAddressChildren)

export const getWarehouseErpsAction = createAction<FilterPayloadTypes>(
  WarehouseMapEnums.getWarehouseErps
)
export const getWarehouseFZonesAction = createAction<FZoneParams>(
  WarehouseMapEnums.getWarehouseFZones
)
export const getWarehouseCellTypesAction = createAction<FilterPayloadTypes>(
  WarehouseMapEnums.getWarehouseCellTypes
)
export const getCellByIdAction = createAction<string>(
  WarehouseMapEnums.getCellById
)
export const changeCellStateAction = createAction<CellState>(
  WarehouseMapEnums.changeCellState
)
export const getFiniteCellsAction = createAction<GetFiniteCellsParams>(
  WarehouseMapEnums.getFiniteCells
)
// export const printCellBarcodeAction = createAction<PrintCellBarcodeParams>(
//   WarehouseMapEnums.print
// )
