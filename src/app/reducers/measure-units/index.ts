import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import { MeasureUnitsContentType, MeasureUnitsInitials } from "./types";

const initialState: MeasureUnitsInitials = {
  allMeasureUnits: [],
  detailedMeasureUnits: null,
  createMeasureUnits: null,
  putMeasureUnits: null,
};

const measureUnits = createSlice({
  name: "measureUnits",
  initialState,
  reducers: {
    setGetAllMeasureUnits: (
      state,
      action: PayloadAction<MeasureUnitsContentType[]>
    ) => {
      state.allMeasureUnits = action.payload;
    },

    setGetDetailedMeasureUnits: (
      state,
      action: PayloadAction<MeasureUnitsContentType>
    ) => {
      state.detailedMeasureUnits = action.payload;
    },
    setAddMeasureUnits: (state, action: PayloadAction<PostResponse | null>) => {
      state.createMeasureUnits = action.payload;
    },
    setPutMeasureUnits: (state, action: PayloadAction<PutResponse | null>) => {
      state.putMeasureUnits = action.payload;
    },
  },
});

export const {
  setGetAllMeasureUnits,
  setGetDetailedMeasureUnits,
  setAddMeasureUnits,
  setPutMeasureUnits,
} = measureUnits.actions;

export default measureUnits.reducer;
