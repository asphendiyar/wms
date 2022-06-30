import { PutResponse, PostResponse } from "../../commonTypes";

export interface BackgroundTasksFormValues {
  name: string;
  type: string;
  manual_start: boolean;
  period: string;
  notification: {
    information_email: string;
    error_email: string;
    warning_email: string;
  };
}

export interface BackgroundTasksPutForm {
  name: string;
  state: string;
  type: string;
  manual_start: boolean;
  period: string;
  last_run_at: string;
  notification: {
    information_email: string;
    error_email: string;
    warning_email: string;
  };
}
export interface BackgroundTasksContentType {
  id: number;
  name: string;
  state: string;
  state_title: string;
  type_title: string;
  type: string;
  manual_start: boolean;
  period: string;
  last_run_at: string;
  next_run_at: string;
  created_date: string;
  updated_date: string;
  notification: {
    information_email: string;
    error_email: string;
    warning_email: string;
  };
  history: BackgroundTasksHistoryType[];
}

export type BackgroundTasksHistoryType = {
  state: string;
  date: string;
};

export type BackgroundTasksParams = {
  id: string;
  data: BackgroundTasksPutForm;
};

export type BackgroundTasksTableData = {
  id: number;
  name: string;
  state: string;
  state_title: string;
  type_title: string;
  type: string;
  manual_start: boolean;
  period: string;
  last_run_at: string;
  next_run_at: string;
  created_date: string;
  updated_date: string;
};

export interface BackgroundTasksWithPage {
  content: BackgroundTasksTableData[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface BackgroundTasksInitials {
  allBackgroundTasks: BackgroundTasksWithPage;
  detailedBackgroundTasks: BackgroundTasksContentType | null;
  createBackgroundTasks: PostResponse | null;
  putBackgroundTasks: PutResponse | null;
}

export enum BackgroundTaskEnums {
  getAllBackgroundTasks = "background-tasks/get/all",
  getSearchAllBackgroundTasks = "background-tasks/get/search",
  getDetailedBackgroundTasks = "background-tasks/get/one",
  postBackgroundTasks = "background-tasks/post/one",
  putBackgroundTasks = "background-tasks/put/one",
}
