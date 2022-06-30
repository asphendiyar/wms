import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  InventoriesContentType,
  InventoriesInitials,
  InventoriesWithPage,
  InventoryTasksWithPage,
} from "./types";

const initialState: InventoriesInitials = {
  allInventories: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedInventories: null,
  createInventories: null,
  putInventories: null,
  allInventoryTasks: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  patchRestartInventories: null,
  patchStatusInventories: null,
};

const inventories = createSlice({
  name: "inventories",
  initialState,
  reducers: {
    setGetAllInventories: (
      state,
      action: PayloadAction<InventoriesWithPage>
    ) => {
      state.allInventories = {
        ...action.payload,
        content: [...state.allInventories.content, ...action.payload.content],
      };
    },
    setSearchGetAllInventories: (
      state,
      action: PayloadAction<InventoriesWithPage>
    ) => {
      state.allInventories = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },
    setGetAllInventoryTasks: (
      state,
      action: PayloadAction<InventoryTasksWithPage>
    ) => {
      state.allInventoryTasks = {
        ...action.payload,
        content: [
          ...state.allInventoryTasks.content,
          ...action.payload.content,
        ],
      };
    },
    setSearchGetAllInventoryTasks: (
      state,
      action: PayloadAction<InventoryTasksWithPage>
    ) => {
      state.allInventoryTasks = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },
    setGetDetailedInventories: (
      state,
      action: PayloadAction<InventoriesContentType>
    ) => {
      state.detailedInventories = action.payload;
    },
    setCreateInventories: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createInventories = action.payload;
    },
    setPutInventories: (state, action: PayloadAction<PutResponse | null>) => {
      state.putInventories = action.payload;
    },
    setPatchRestartInventories: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchRestartInventories = action.payload;
    },
    setPatchStatusInventories: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.patchStatusInventories = action.payload;
    },
  },
});

export const {
  setGetAllInventories,
  setCreateInventories,
  setGetDetailedInventories,
  setPutInventories,
  setSearchGetAllInventories,
  setGetAllInventoryTasks,
  setSearchGetAllInventoryTasks,
  setPatchStatusInventories,
  setPatchRestartInventories,
} = inventories.actions;

export default inventories.reducer;
