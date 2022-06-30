import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  AddressesTypes,
  FunctionalZones,
  WarehouseAllTypes,
  WarehouseContentType,
  WarehouseECPType,
  WarehouseInitials,
} from "./types";

const initialState: WarehouseInitials = {
  detailedWarehouse: null,
  createWarehouse: null,
  putWarehouse: null,
  getCommodity: [],
  getEquipment: [],
  getPopularity: [],
  createAdresses: null,
  createEquipment: null,
  createPopularity: null,
  createCommodity: null,
  createFzone: null,
  putAdressesWarehouse: null,
  putCommodityWarehouse: null,
  putEquipment: null,
  putPopularityWarehouse: null,
  putFZoneWarehouse: null,
  allWarehouse: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  selectedCommodity: null,
  selectedEquipment: null,
  selectedPopularity: null,
  selectedAdress: null,
  selectedFZone: null,
  allFZonesByWarehouseID: [],
};

const warehouse = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setSelectedFZoneWarehouse: (
      state,
      action: PayloadAction<FunctionalZones | null>
    ) => {
      state.selectedFZone = action.payload;
    },
    setSelectedAdressWarehouse: (
      state,
      action: PayloadAction<AddressesTypes | null>
    ) => {
      state.selectedAdress = action.payload;
    },
    setSelectedPopularityWarehouse: (
      state,
      action: PayloadAction<WarehouseECPType | null>
    ) => {
      state.selectedPopularity = action.payload;
    },
    setSelectedEquipmentWarehouse: (
      state,
      action: PayloadAction<WarehouseECPType | null>
    ) => {
      state.selectedEquipment = action.payload;
    },
    setSelectedCommodityWarehouse: (
      state,
      action: PayloadAction<WarehouseECPType | null>
    ) => {
      state.selectedCommodity = action.payload;
    },

    setAddWarehouse: (state, action: PayloadAction<PostResponse | null>) => {
      state.createWarehouse = action.payload;
    },

    setAddFZoneWarehouse: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createFzone = action.payload;
    },

    setAddAddressesWarehouse: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createAdresses = action.payload;
    },
    setAddEquipmentWarehouse: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createEquipment = action.payload;
    },
    setAddPopularityWarehouse: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createPopularity = action.payload;
    },
    setAddCommodityWarehouse: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createCommodity = action.payload;
    },
    setPutAddressesWarehouse: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.putAdressesWarehouse = action.payload;
    },
    setPutFZoneWarehouses: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.putFZoneWarehouse = action.payload;
    },
    setPutEquipmentsWarehouse: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putEquipment = action.payload;
    },
    setPutPopularitiesWarehouse: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putPopularityWarehouse = action.payload;
    },
    setPutCommoditiesWarehouse: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putCommodityWarehouse = action.payload;
    },
    setPutWarehouses: (state, action: PayloadAction<PutResponse | null>) => {
      state.putWarehouse = action.payload;
    },
    setGetEquipmentsWarehouse: (
      state,
      action: PayloadAction<WarehouseECPType[]>
    ) => {
      state.getEquipment = action.payload;
    },
    setGetCommoditiesWarehouse: (
      state,
      action: PayloadAction<WarehouseECPType[]>
    ) => {
      state.getCommodity = action.payload;
    },
    setGetPopularitiesWarehouse: (
      state,
      action: PayloadAction<WarehouseECPType[]>
    ) => {
      state.getPopularity = action.payload;
    },
    setSearchGetAllWarehouses: (
      state,
      action: PayloadAction<WarehouseAllTypes>
    ) => {
      state.allWarehouse = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },
    setGetAllWarehouses: (state, action: PayloadAction<WarehouseAllTypes>) => {
      state.allWarehouse = {
        ...action.payload,
        content: [...state.allWarehouse.content, ...action.payload.content],
      };
    },
    setGetDetailedWarehouse: (
      state,
      action: PayloadAction<WarehouseContentType>
    ) => {
      state.detailedWarehouse = { ...action.payload };
    },
    setAllFZones: (state, action: PayloadAction<FunctionalZones[]>) => {
      state.allFZonesByWarehouseID = action.payload;
    },
  },
});

export const {
  setAddWarehouse,
  setPutWarehouses,
  setGetDetailedWarehouse,
  setGetAllWarehouses,
  setSearchGetAllWarehouses,
  setAddAddressesWarehouse,
  setAddCommodityWarehouse,
  setAddEquipmentWarehouse,
  setAddPopularityWarehouse,
  setAddFZoneWarehouse,
  setPutAddressesWarehouse,
  setPutCommoditiesWarehouse,
  setPutEquipmentsWarehouse,
  setPutFZoneWarehouses,
  setPutPopularitiesWarehouse,
  setGetCommoditiesWarehouse,
  setGetEquipmentsWarehouse,
  setGetPopularitiesWarehouse,
  setSelectedAdressWarehouse,
  setSelectedCommodityWarehouse,
  setSelectedEquipmentWarehouse,
  setSelectedFZoneWarehouse,
  setSelectedPopularityWarehouse,
  setAllFZones,
} = warehouse.actions;

export default warehouse.reducer;
