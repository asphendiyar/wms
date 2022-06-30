import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { EmailNotificationEnums } from "./types";

export const getAllEmailNotificationAction = createAction<FilterPayloadTypes>(
  EmailNotificationEnums.getAllEmailNotification
);
export const getSearchAllEmailNotificationAction =
  createAction<FilterPayloadTypes>(
    EmailNotificationEnums.getSearchAllEmailNotification
  );

export const getDetailedEmailNotificationAction = createAction<string>(
  EmailNotificationEnums.getDetailedEmailNotification
);
