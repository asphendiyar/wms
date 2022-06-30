import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EmailNotificationContentType,
  EmailNotificationInitials,
  EmailNotificationWithPage,
} from "./types";

const initialState: EmailNotificationInitials = {
  allEmailNotification: {
    content: [],
    number: 0,
    number_of_elements: 0,
    total_elements: 0,
    total_pages: 0,
  },
  detailedEmailNotification: null,
};

const emailNotification = createSlice({
  name: "emailNotification",
  initialState,
  reducers: {
    setSearchGetAllEmailNotification: (
      state,
      action: PayloadAction<EmailNotificationWithPage>
    ) => {
      state.allEmailNotification = action.payload.content
        ? { ...action.payload }
        : { ...action.payload, content: [] };
    },

    setGetAllEmailNotification: (
      state,
      action: PayloadAction<EmailNotificationWithPage>
    ) => {
      state.allEmailNotification = {
        ...action.payload,
        content: [
          ...state.allEmailNotification.content,
          ...action.payload.content,
        ],
      };
    },

    setGetDetailedEmailNotification: (
      state,
      action: PayloadAction<EmailNotificationContentType>
    ) => {
      state.detailedEmailNotification = action.payload;
    },
  },
});

export const {
  setGetAllEmailNotification,
  setGetDetailedEmailNotification,
  setSearchGetAllEmailNotification,
} = emailNotification.actions;

export default emailNotification.reducer;
