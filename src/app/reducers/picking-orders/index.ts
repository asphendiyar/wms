import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PutResponse } from "../../commonTypes";
import {
  PickingOrdersBase,
  PickingOrdersContentType,
  PickingOrdersInitials,
  PickingOrdersWithPage,
  PickingTasksTable,
} from "./types";

const initialState: PickingOrdersInitials = {
  allPickingOrders: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedPickingOrder: null,
  selectedPickingOrder: null,
  patchPickPickingOrders: null,
  pickingTasks: [],
};

const pickingOrders = createSlice({
  name: "pickingOrders",
  initialState,
  reducers: {
    setSearchGetAllPickingOrders: (
      state,
      action: PayloadAction<PickingOrdersWithPage>
    ) => {
      state.allPickingOrders = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllPickingOrders: (
      state,
      action: PayloadAction<PickingOrdersWithPage>
    ) => {
      state.allPickingOrders = {
        ...action.payload,
        content: [...state.allPickingOrders.content, ...action.payload.content],
      };
    },

    setGetDetailedPickingOrders: (
      state,
      action: PayloadAction<PickingOrdersContentType>
    ) => {
      state.detailedPickingOrder = action.payload;
    },
    setSelectedPickingOrder: (
      state,
      action: PayloadAction<PickingOrdersBase>
    ) => {
      state.selectedPickingOrder = action.payload;
    },
    setpatchPickPickingOrders: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchPickPickingOrders = action.payload;
    },
    setGetPickingTasks: (state, action: PayloadAction<PickingTasksTable[]>) => {
      state.pickingTasks = action.payload;
    },
  },
});

export const {
  setGetAllPickingOrders,
  setSearchGetAllPickingOrders,
  setGetDetailedPickingOrders,
  setSelectedPickingOrder,
  setpatchPickPickingOrders,
  setGetPickingTasks,
} = pickingOrders.actions;

export default pickingOrders.reducer;
