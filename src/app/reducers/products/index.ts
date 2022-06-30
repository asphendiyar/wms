import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RouteEnums, TreeNode } from "../../commonTypes"
import { EmptyString } from "../../helpers"
import { deleteNodeChildren, insertNodeIntoTree } from "../../treeHelpers"
import {
  WarehouseMapAddresses,
  WarehouseMapAddressesResponse,
} from "../warehouse-map/types"
import { WarehouseAllTypes } from "../warehouse/types"
import { CellItem, ProductsInitials } from "./types"

const initialState: ProductsInitials = {
  tree: {},
  selectedRootWarehouseId: EmptyString,
  productWarehouses: undefined,
  warehouseProductsCells: undefined,
  cellItems: {
    products: [],
    trade_items: [],
  },
  selectedNode: undefined,
  selectedProduct: undefined,
  selectedTE: undefined,
}

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsTreeNode: (state, action: PayloadAction<TreeNode>) => {
      state.selectedNode = action.payload
    },
    setProductsWarehouseId: (state, action: PayloadAction<string>) => {
      state.selectedRootWarehouseId = action.payload
    },
    setProductWarehouses: (state, action: PayloadAction<WarehouseAllTypes>) => {
      state.productWarehouses =
        state.productWarehouses && state.productWarehouses.number > 1
          ? {
              ...action.payload,
              content: [
                ...state.productWarehouses.content,
                ...action.payload.content,
              ],
            }
          : { ...action.payload }

      action.payload.content.forEach((warehouse) => {
        state.tree[`root${warehouse.id}`] = {
          id: warehouse.id.toString(),
          title: warehouse.name,
          hasChild: true,
          isRoot: true,
          routePath: `${RouteEnums.warehouseProducts}?warehouseId=${warehouse.id}`,
          childNodes: [],
        }
      })
    },
    setCellsTreeParents: (
      state,
      action: PayloadAction<WarehouseMapAddressesResponse>
    ) => {
      state.warehouseProductsCells = action.payload
      state.tree[`root${action.payload.warehouse_id}`] = {
        ...state.tree[`root${action.payload.warehouse_id}`],
        childNodes: action.payload.addresses.map((address) => ({
          id: address.address,
          title: address.address,
          originalId: address.id.toString(),
          isRoot: false,
          floor: address.floor,
          routePath: `${RouteEnums.warehouseProducts}?warehouseId=${action.payload.warehouse_id}&cellId=${address.address}`,
          hasChild: address.has_child,
          childNodes: [],
        })),
      }
    },
    setCellsTree: (
      state,
      action: PayloadAction<WarehouseMapAddressesResponse>
    ) => {
      if (state.warehouseProductsCells && state.selectedNode) {
        state.warehouseProductsCells.addresses = [
          ...state.warehouseProductsCells.addresses,
          ...action.payload.addresses,
        ]
        insertNodeIntoTree<WarehouseMapAddresses>(
          state.selectedNode?.id,
          state.tree[`root${state.selectedRootWarehouseId}`],
          "address",
          "address",
          action.payload.addresses,
          `${RouteEnums.warehouseProducts}?warehouseId=${state.selectedRootWarehouseId}&cellId=`
        )
      }
    },
    setCellItems: (state, action: PayloadAction<CellItem>) => {
      state.cellItems = action.payload
    },
    clearProductsTreeNodeChildren: (state, action: PayloadAction<string>) => {
      deleteNodeChildren(
        state.tree[`root${state.selectedRootWarehouseId}`],
        action.payload
      )
    },
    setSelectedProduct: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload)
        state.selectedProduct = state.cellItems.products.find(
          (item) => item.id === action.payload
        )
      else state.selectedProduct = undefined
    },
    setSelectedTE: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload)
        state.selectedTE = state.cellItems.trade_items.find(
          (item) => item.barcode === action.payload
        )
      else state.selectedTE = undefined
    },
  },
})

export const {
  setCellItems,
  setProductWarehouses,
  setCellsTreeParents,
  setCellsTree,
  clearProductsTreeNodeChildren,
  setProductsTreeNode,
  setProductsWarehouseId,
  setSelectedProduct,
  setSelectedTE,
} = products.actions

export default products.reducer
