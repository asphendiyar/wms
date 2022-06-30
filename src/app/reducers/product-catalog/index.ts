import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  ProductCatalogAllTypes,
  ProductCatalogInitials,
  ProductContentType,
  CategoryListType,
  CategoryTreeListType,
  SelectedProductCategoryType,
} from "./types";

const initialState: ProductCatalogInitials = {
  detailedProduct: null,
  createProduct: null,
  putProduct: null,
  allProducts: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  categoryList: [],
  categoryTreeList: [],
  selectedProductCategory: {
    level_one: null,
    level_two: null,
    level_three: null,
    level_four: null,
    level_five: null,
  },
};

const productCatalog = createSlice({
  name: "product-catalog",
  initialState,
  reducers: {
    setAddProductCatalog: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createProduct = action.payload;
    },
    setPutProductCatalog: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putProduct = action.payload;
    },
    setSelectedProductCategory: (
      state,
      action: PayloadAction<SelectedProductCategoryType>
    ) => {
      state.selectedProductCategory = action.payload;
    },
    setGetCategoriesList: (
      state,
      action: PayloadAction<CategoryListType[]>
    ) => {
      state.categoryList = [...action.payload];
    },
    setGetCategoryTreeList: (
      state,
      action: PayloadAction<CategoryTreeListType[]>
    ) => {
      state.categoryTreeList = action.payload;
    },

    setGetProductCatalogs: (
      state,
      action: PayloadAction<ProductCatalogAllTypes>
    ) => {
      state.allProducts = {
        ...action.payload,
        content: [...state.allProducts.content, ...action.payload.content],
      };
    },
    setSearchGetProductCatalogs: (
      state,
      action: PayloadAction<ProductCatalogAllTypes>
    ) => {
      state.allProducts = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetDetailedProduct: (
      state,
      action: PayloadAction<ProductContentType>
    ) => {
      state.detailedProduct = { ...action.payload };
    },
  },
});

export const {
  setGetProductCatalogs,
  setAddProductCatalog,
  setPutProductCatalog,
  setSelectedProductCategory,
  setGetDetailedProduct,
  setGetCategoriesList,
  setGetCategoryTreeList,
  setSearchGetProductCatalogs,
} = productCatalog.actions;

export default productCatalog.reducer;
