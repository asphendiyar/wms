import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  BackgroundTaskEnums,
  BackgroundTasksFormValues,
  BackgroundTasksParams,
} from "./types";

export const getAllBackgroundTasksAction = createAction<FilterPayloadTypes>(
  BackgroundTaskEnums.getAllBackgroundTasks
);
export const getSearchAllBackgroundTasksAction =
  createAction<FilterPayloadTypes>(
    BackgroundTaskEnums.getSearchAllBackgroundTasks
  );

export const getDetailedBackgroundTasksAction = createAction<number>(
  BackgroundTaskEnums.getDetailedBackgroundTasks
);

export const postBackgroundTasksAction =
  createAction<BackgroundTasksFormValues>(
    BackgroundTaskEnums.postBackgroundTasks
  );

export const putBackgroundTasksAction = createAction<BackgroundTasksParams>(
  BackgroundTaskEnums.putBackgroundTasks
);
