import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { EmailNotificationWithPage } from "./types";

export const selectEmailNotification = (
  state: RootState
): EmailNotificationWithPage => state.emailNotification.allEmailNotification;

export const selectEmailNotificationList = createSelector(
  selectEmailNotification,
  (emailNotificationList: EmailNotificationWithPage) =>
    emailNotificationList.content.map((item) => ({
      ...item,
    }))
);
