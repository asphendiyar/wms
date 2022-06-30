import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  EmailNotificationContentType,
  EmailNotificationWithPage,
} from "../../reducers/email-notification/types";

export const getAllEmailNotification = async ({
  page,
  state,
}: FilterPayloadTypes) =>
  fetchHelper<EmailNotificationWithPage>(
    `${BASE_URL + pathnames.emailNotification}page/filter?page=${page || 1}${
      state ? "&state=" + state : EmptyString
    }`,
    "GET"
  );

export const getDetailedEmailNotification = async (code: string) =>
  fetchHelper<EmailNotificationContentType>(
    `${BASE_URL + pathnames.emailNotification}${code}`,
    "GET"
  );
