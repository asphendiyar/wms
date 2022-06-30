export interface EmailNotificationContentType {
  id: number;
  state: string;
  state_title: string;
  to: string;
  subject: string;
  payload: string;
  created_date: string;
  updated_date: string;
}

export interface EmailNotificationWithPage {
  content: EmailNotificationContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}

export interface EmailNotificationInitials {
  allEmailNotification: EmailNotificationWithPage;
  detailedEmailNotification: EmailNotificationContentType | null;
}

export enum EmailNotificationEnums {
  getAllEmailNotification = "email-notification/get/all",
  getSearchAllEmailNotification = "email-notification/get/search",
  getDetailedEmailNotification = "email-notification/get/one",
}
