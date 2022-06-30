import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RouteEnums, TreeNode } from "../../commonTypes"
import { EmptyString } from "../../helpers"
import { deleteNodeChildren, insertNodeIntoTree } from "../../treeHelpers"
import { CategoryListType } from "../product-catalog/types"
import { CategoriesInitials } from "./types"

const initialState: CategoriesInitials = {
  tree: {},
  categoriesRoot: [],
  categoriesAfterRoot: [],
  selectedRootCategoriesId: EmptyString,
  selectedNode: undefined,
  pagePath: RouteEnums.productsTree,
}

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setPagePath: (state, action: PayloadAction<string>) => {
      state.pagePath = action.payload
    },
    setRootCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedRootCategoriesId = action.payload
    },
    setCategoriesList: (state, action: PayloadAction<CategoryListType[]>) => {
      state.categoriesRoot = action.payload

      action.payload.forEach((warehouse) => {
        state.tree[`root${warehouse.id}`] = {
          id: warehouse.id.toString(),
          title: warehouse.name,
          hasChild: true,
          isRoot: true,
          routePath: `${state.pagePath}?categoryID=${warehouse.id}`,
          childNodes: [],
        }
      })
    },
    setCategoriesAfterRootChildren: (
      state,
      action: PayloadAction<CategoryListType[]>
    ) => {
      if (state.categoriesAfterRoot && state.selectedNode) {
        state.categoriesAfterRoot = [
          ...state.categoriesAfterRoot,
          ...action.payload,
        ]
        insertNodeIntoTree<CategoryListType>(
          state.selectedNode?.id,
          state.tree[`root${state.selectedRootCategoriesId}`],
          "id",
          "name",
          action.payload,
          `${state.pagePath}?categoryID=${state.selectedRootCategoriesId}`
        )
      }
    },
    clearWarehouseMapNodeChildren: (state, action: PayloadAction<string>) => {
      deleteNodeChildren(
        state.tree[`root${state.selectedRootCategoriesId}`],
        action.payload
      )
    },
    setSelectedNode: (state, action: PayloadAction<TreeNode>) => {
      state.selectedNode = action.payload
    },
  },
})

export const {
  setPagePath,
  setCategoriesList,
  setCategoriesAfterRootChildren,
  setSelectedNode,
  clearWarehouseMapNodeChildren,
  setRootCategoryId,
} = categories.actions

export default categories.reducer
