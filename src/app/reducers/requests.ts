import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseError } from "../commonTypes";
import { RootState } from "../store";

export type InProgress = "pending" | "success" | "failed" | "idle";
export type RequestTypes = {
  name?: string;
  inProgress?: InProgress;
  error?: ResponseError | null;
};
type RequestsInitials = {
  requests: RequestTypes[];
};

const initialState: RequestsInitials = {
  requests: [],
};

const requests = createSlice({
  name: "requests",
  initialState,
  reducers: {
    started: (state, action: PayloadAction<RequestTypes>) => {
      const existingCall = state.requests.find(
        (request) => request.name === action.payload.name
      );
      if (existingCall) {
        state.requests = state.requests.map((request) =>
          request.name === action.payload.name
            ? { ...request, inProgress: "pending", error: null }
            : request
        );
      } else state.requests = [...state.requests, { ...action.payload }];
    },
    finished: (state, action: PayloadAction<RequestTypes>) => {
      state.requests = state.requests.map((request) =>
        request.name === action.payload.name
          ? { ...request, inProgress: "success" }
          : request
      );
    },
    failed: (state, action: PayloadAction<RequestTypes>) => {
      state.requests = state.requests.map((request) =>
        request.name === action.payload.name
          ? {
              ...request,
              inProgress: "failed",
              error: action.payload.error,
            }
          : request
      );
    },
    filterRequests: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(
        (request) => request.name !== action.payload
      );
    },
  },
});

const requestState = (state: RootState) => state.requests;

export const namedRequestsInProgress = (state: RootState, reqName: string) => {
  const singleNamedReqInProgress = (singleReqName: string) => {
    const foundReq = requestState(state).requests.find(
      (req) => req.name === singleReqName && req.inProgress
    );
    return foundReq !== undefined ? foundReq.inProgress : "idle";
  };

  if (Array.isArray(reqName)) {
    return reqName.some(singleNamedReqInProgress);
  }
  return singleNamedReqInProgress(reqName);
};

export const namedRequestError = (state: RootState, reqName: string) =>
  requestState(state).requests.find(
    (req) => req.name === reqName && req.error !== null
  )?.error;

export const { started, failed, finished, filterRequests } = requests.actions;

export default requests.reducer;
