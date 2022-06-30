import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  EquipmentsContentType,
  EquipmentsInitials,
  EquipmentsWithPage,
} from "./types";

const initialState: EquipmentsInitials = {
  allEquipments: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedEquipments: null,
  createEquipments: null,
  putEquipments: null,
};

const equipments = createSlice({
  name: "equipments",
  initialState,
  reducers: {
    setSearchGetAllEquipments: (
      state,
      action: PayloadAction<EquipmentsWithPage>
    ) => {
      state.allEquipments = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllEquipments: (state, action: PayloadAction<EquipmentsWithPage>) => {
      state.allEquipments = {
        ...action.payload,
        content: [...state.allEquipments.content, ...action.payload.content],
      };
    },
    setGetDetailedEquipments: (
      state,
      action: PayloadAction<EquipmentsContentType>
    ) => {
      state.detailedEquipments = action.payload;
    },
    setAddEquipments: (state, action: PayloadAction<PostResponse | null>) => {
      state.createEquipments = action.payload;
    },
    setPutEquipments: (state, action: PayloadAction<PutResponse | null>) => {
      state.putEquipments = action.payload;
    },
  },
});

export const {
  setGetAllEquipments,
  setGetDetailedEquipments,
  setAddEquipments,
  setPutEquipments,
  setSearchGetAllEquipments,
} = equipments.actions;

export default equipments.reducer;
