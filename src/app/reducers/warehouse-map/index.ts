import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RouteEnums, TreeNode } from "../../commonTypes"
import { EmptyString } from "../../helpers"
import { CellTypesWithPage } from "../../reducers/cell-types/types"
import { deleteNodeChildren, insertNodeIntoTree } from "../../treeHelpers"
import { ErpWarehousesWithPage } from "../erp-warehouses/types"
import {
  FunctionalZones,
  WarehouseAllTypes,
  WarehouseECPType,
} from "../warehouse/types"
import {
  CellData,
  FiniteCellsResponse,
  WarehouseMapAddresses,
  WarehouseMapAddressesResponse,
  WarehouseMapInitials,
} from "./types"

const initialState: WarehouseMapInitials = {
  tree: {},
  warehouses: undefined,
  warehouseMapAddresses: undefined,
  warehouseErps: [],
  warehouseFZones: [],
  warehouseFZonesResponse: [],
  warehouseErpsResponse: undefined,
  selectedRootWarehouseId: EmptyString,
  selectedNode: undefined,
  warehouseCellTypes: [],
  warehouseCellTypesResponse: undefined,
  comoditites: [],
  popularities: [],
  equipments: [],
  cellData: undefined,
  finiteCellsResponse: {} as FiniteCellsResponse,
  pagePath: RouteEnums.warehouseMap,
}

const warehouseMap = createSlice({
  name: "warehouseMap",
  initialState,
  reducers: {
    setRootWarehouseId: (state, action: PayloadAction<string>) => {
      state.selectedRootWarehouseId = action.payload
    },
    setWarehousesList: (state, action: PayloadAction<WarehouseAllTypes>) => {
      state.warehouses =
        state.warehouses && state.warehouses.number > 1
          ? {
              ...action.payload,
              content: [...state.warehouses.content, ...action.payload.content],
            }
          : { ...action.payload }

      action.payload.content.forEach((warehouse) => {
        state.tree[`root${warehouse.id}`] = {
          id: warehouse.id.toString(),
          title: warehouse.name,
          hasChild: true,
          isRoot: true,
          routePath: `${state.pagePath}?warehouseId=${warehouse.id}`,
          childNodes: [],
        }
      })
      // dispatch(setProductWarehouses(action.payload))
    },
    setWarehouseMapAddresses: (
      state,
      action: PayloadAction<WarehouseMapAddressesResponse>
    ) => {
      state.warehouseMapAddresses = action.payload
      state.tree[`root${action.payload.warehouse_id}`] = {
        ...state.tree[`root${action.payload.warehouse_id}`],
        childNodes: action.payload.addresses.map((address) => ({
          id: address.address,
          title: address.address,
          originalId: address.id.toString(),
          isRoot: false,
          routePath: `${state.pagePath}?warehouseId=${action.payload.warehouse_id}&cellId=${address.address}`,
          hasChild: address.has_child,
          childNodes: [],
        })),
      }
      // dispatch(setCellsTreeParents(action.payload))
    },
    setWarehouseMapAddressChildren: (
      state,
      action: PayloadAction<WarehouseMapAddressesResponse>
    ) => {
      if (state.warehouseMapAddresses && state.selectedNode) {
        state.warehouseMapAddresses.addresses = [
          ...state.warehouseMapAddresses.addresses,
          ...action.payload.addresses,
        ]
        insertNodeIntoTree<WarehouseMapAddresses>(
          state.selectedNode?.id,
          state.tree[`root${state.selectedRootWarehouseId}`],
          "address",
          "address",
          action.payload.addresses,
          `${state.pagePath}?warehouseId=${state.selectedRootWarehouseId}&cellId=`
        )
        // dispatch(setCellsTree(action.payload))
      }
    },
    clearWarehouseMapNodeChildren: (state, action: PayloadAction<string>) => {
      deleteNodeChildren(
        state.tree[`root${state.selectedRootWarehouseId}`],
        action.payload
      )
    },
    setSelectedNode: (state, action: PayloadAction<TreeNode>) => {
      state.selectedNode = action.payload
    },
    setWarehouseErps: (state, action: PayloadAction<ErpWarehousesWithPage>) => {
      state.warehouseErpsResponse = state.warehouseErpsResponse
        ? {
            ...action.payload,
            content: [
              ...state.warehouseErpsResponse?.content,
              ...action.payload.content,
            ],
          }
        : { ...action.payload }

      state.warehouseErpsResponse.number > 1
        ? (state.warehouseErps = [
            ...state.warehouseErps,
            ...action.payload.content.map((erp) => ({
              label: erp.name,
              value: erp.id,
            })),
          ])
        : (state.warehouseErps = action.payload.content.map((erp) => ({
            label: erp.name,
            value: erp.id,
          })))
    },
    clearWarehouseErps: (state) => {
      state.warehouseErps = []
      state.warehouseErpsResponse = undefined
    },
    setWarehouseFZones: (state, action: PayloadAction<FunctionalZones[]>) => {
      state.warehouseFZonesResponse = action.payload
      state.warehouseFZones = action.payload.map((item) => ({
        label: item.name_en,
        value: item.id,
      }))
    },
    setWarehouseCellTypes: (
      state,
      action: PayloadAction<CellTypesWithPage>
    ) => {
      state.warehouseCellTypesResponse = state.warehouseCellTypesResponse
        ? {
            ...action.payload,
            content: [
              ...state.warehouseCellTypesResponse?.content,
              ...action.payload.content,
            ],
          }
        : { ...action.payload }

      state.warehouseCellTypesResponse.number > 1
        ? (state.warehouseCellTypes = [
            ...state.warehouseCellTypes,
            ...action.payload.content.map((cellType) => ({
              label: cellType.name_ru,
              value: cellType.id,
              optValue: cellType.code,
            })),
          ])
        : (state.warehouseCellTypes = action.payload.content.map(
            (cellType) => ({
              label: cellType.name_ru,
              value: cellType.id,
              optValue: cellType.code,
            })
          ))
    },
    setCommoditiesInCells: (
      state,
      action: PayloadAction<WarehouseECPType[]>
    ) => {
      state.comoditites = action.payload
    },
    setEquipmentsInCells: (
      state,
      action: PayloadAction<WarehouseECPType[]>
    ) => {
      state.equipments = action.payload
    },
    setPopularitiesInCells: (
      state,
      action: PayloadAction<WarehouseECPType[]>
    ) => {
      state.popularities = action.payload
    },
    setCellData: (state, action: PayloadAction<CellData>) => {
      state.cellData = action.payload
    },
    setFiniteCells: (state, action: PayloadAction<FiniteCellsResponse>) => {
      if (action.payload.number > 1)
        state.finiteCellsResponse = {
          ...action.payload,
          content: [
            ...state.finiteCellsResponse.content,
            ...action.payload.content,
          ],
        }
      else state.finiteCellsResponse = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // openGeneratedBarcode: (state, action: PayloadAction<any>) => {
    //   console.log(action.payload)
    //   window.open("data:application/pdf," + action.payload)
    // },
  },
})

export const {
  setWarehousesList,
  setWarehouseMapAddresses,
  setWarehouseMapAddressChildren,
  setSelectedNode,
  clearWarehouseMapNodeChildren,
  setWarehouseErps,
  setRootWarehouseId,
  clearWarehouseErps,
  setWarehouseFZones,
  setWarehouseCellTypes,
  setPopularitiesInCells,
  setEquipmentsInCells,
  setCommoditiesInCells,
  setCellData,
  setFiniteCells,
} = warehouseMap.actions

export default warehouseMap.reducer
