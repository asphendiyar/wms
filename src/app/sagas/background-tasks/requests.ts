import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  BackgroundTasksContentType,
  BackgroundTasksFormValues,
  BackgroundTasksParams,
  BackgroundTasksPutForm,
  BackgroundTasksWithPage,
} from "../../reducers/background-tasks/types";

export const postBackgroundTasks = async (data: BackgroundTasksFormValues) => {
  return fetchHelper<BackgroundTasksFormValues>(
    BASE_URL + pathnames.backgroundTasks,
    "POST",
    data
  );
};

export const putBackgroundTasks = async ({
  id,
  data,
}: BackgroundTasksParams) => {
  return fetchHelper<BackgroundTasksPutForm>(
    BASE_URL + pathnames.backgroundTasks + id,
    "PUT",
    data
  );
};

export const getAllBackgroundTasks = async ({
  page,
  state,
}: FilterPayloadTypes) =>
  fetchHelper<BackgroundTasksWithPage>(
    `${BASE_URL + pathnames.backgroundTasks}page/filter?page=${page || 1}${
      state ? "&state=" + state : EmptyString
    }`,
    "GET"
  );

export const getDetailedBackgroundTasks = async (id: number) =>
  fetchHelper<BackgroundTasksContentType>(
    `${BASE_URL + pathnames.backgroundTasks}${id}`,
    "GET"
  );
