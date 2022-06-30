import { createSelector } from "@reduxjs/toolkit";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { BackgroundTasksWithPage } from "./types";

export const selectBackgroundTasks = (
  state: RootState
): BackgroundTasksWithPage => state.backgroundTasks.allBackgroundTasks;

export const selectBackgroundTasksList = createSelector(
  selectBackgroundTasks,
  (backgroundTasksList: BackgroundTasksWithPage) =>
    backgroundTasksList.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);
