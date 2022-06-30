import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PostResponse, PutResponse } from "../../commonTypes"
import {
  CellTypesContentType,
  CellTypesInitials,
  CellTypesWithPage,
} from "./types"

const initialState: CellTypesInitials = {
  allCellTypes: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedCellType: null,
  createCellType: null,
  putCellType: null,
}

const cellTypes = createSlice({
  name: "cellTypes",
  initialState,
  reducers: {
    setSearchGetAllCellTypes: (
      state,
      action: PayloadAction<CellTypesWithPage>
    ) => {
      state.allCellTypes = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] }
    },

    setGetAllCellTypes: (state, action: PayloadAction<CellTypesWithPage>) => {
      state.allCellTypes = {
        ...action.payload,
        content: [...state.allCellTypes.content, ...action.payload.content],
      }
    },
    setDetailedCellType: (
      state,
      action: PayloadAction<CellTypesContentType>
    ) => {
      state.detailedCellType = action.payload
    },
    setAddCellTypes: (state, action: PayloadAction<PostResponse | null>) => {
      state.createCellType = action.payload
    },
    setPutCellTypes: (state, action: PayloadAction<PutResponse | null>) => {
      state.putCellType = action.payload
    },
  },
})

export const {
  setGetAllCellTypes,
  setDetailedCellType,
  setAddCellTypes,
  setPutCellTypes,
  setSearchGetAllCellTypes,
} = cellTypes.actions

export default cellTypes.reducer
