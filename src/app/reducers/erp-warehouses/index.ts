import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  ErpWarehousesContentType,
  ErpWarehousesInitials,
  ErpWarehousesWithPage,
} from "./types";

const initialState: ErpWarehousesInitials = {
  allErpWarehouses: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedErpWarehouse: null,
  createErpWarehouse: null,
  putErpWarehouse: null,
  selectedWarehouse: null,
};

const erpWarehouses = createSlice({
  name: "erpWarehouses",
  initialState,
  reducers: {
    setSearchGetAllErpWarehouses: (
      state,
      action: PayloadAction<ErpWarehousesWithPage>
    ) => {
      state.allErpWarehouses = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllErpWarehouses: (
      state,
      action: PayloadAction<ErpWarehousesWithPage>
    ) => {
      state.allErpWarehouses = {
        ...action.payload,
        content: [...state.allErpWarehouses.content, ...action.payload.content],
      };
    },
    setGetDetailedErpWarehouse: (
      state,
      action: PayloadAction<ErpWarehousesContentType>
    ) => {
      state.detailedErpWarehouse = action.payload;
    },

    setSelectedErpWarehouse: (
      state,
      action: PayloadAction<ErpWarehousesContentType | null>
    ) => {
      state.selectedWarehouse = action.payload;
    },

    setAddErpWarehouses: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createErpWarehouse = action.payload;
    },
    setPutErpWarehouses: (state, action: PayloadAction<PutResponse | null>) => {
      state.putErpWarehouse = action.payload;
    },
  },
});

export const {
  setGetAllErpWarehouses,
  setGetDetailedErpWarehouse,
  setAddErpWarehouses,
  setPutErpWarehouses,
  setSearchGetAllErpWarehouses,
  setSelectedErpWarehouse,
} = erpWarehouses.actions;

export default erpWarehouses.reducer;
