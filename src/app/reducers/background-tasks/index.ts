import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostResponse, PutResponse } from "../../commonTypes";
import {
  BackgroundTasksContentType,
  BackgroundTasksInitials,
  BackgroundTasksWithPage,
} from "./types";

const initialState: BackgroundTasksInitials = {
  allBackgroundTasks: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedBackgroundTasks: null,
  createBackgroundTasks: null,
  putBackgroundTasks: null,
};

const backgroundTasks = createSlice({
  name: "backgroundTasks",
  initialState,
  reducers: {
    setSearchGetAllBackgroundTasks: (
      state,
      action: PayloadAction<BackgroundTasksWithPage>
    ) => {
      state.allBackgroundTasks = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllBackgroundTasks: (
      state,
      action: PayloadAction<BackgroundTasksWithPage>
    ) => {
      state.allBackgroundTasks = {
        ...action.payload,
        content: [
          ...state.allBackgroundTasks.content,
          ...action.payload.content,
        ],
      };
    },
    setGetDetailedBackgroundTasks: (
      state,
      action: PayloadAction<BackgroundTasksContentType>
    ) => {
      state.detailedBackgroundTasks = action.payload;
    },
    setAddBackgroundTasks: (
      state,
      action: PayloadAction<PostResponse | null>
    ) => {
      state.createBackgroundTasks = action.payload;
    },
    setPutBackgroundTasks: (
      state,
      action: PayloadAction<PutResponse | null>
    ) => {
      state.putBackgroundTasks = action.payload;
    },
  },
});

export const {
  setGetAllBackgroundTasks,
  setGetDetailedBackgroundTasks,
  setAddBackgroundTasks,
  setPutBackgroundTasks,
  setSearchGetAllBackgroundTasks,
} = backgroundTasks.actions;

export default backgroundTasks.reducer;
