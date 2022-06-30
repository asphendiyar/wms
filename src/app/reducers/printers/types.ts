import { PostResponse, PutResponse } from "../../commonTypes";

export interface PrintersFormValues {
  code: string;
  type: string;
  name: string;
  queue: string;
  port: string;
  warehouse_id: number;
}

export interface PrintersPutFormValues extends PrintersFormValues {
  state: string;
}

export type PrintersParams = {
  id: string;
  data: PrintersPutFormValues;
};

export type PrintersContentType = {
  id: number;
  state: string;
  code: string;
  type: string;
  name: string;
  queue: string;
  port: string;
  warehouse_id: number;
  created_date: string;
  updated_date: string;
};

export type PrintersWithPage = {
  content: PrintersContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
};

export type PrintersInitials = {
  allPrinters: PrintersWithPage;
  detailedPrinters: PrintersContentType | null;
  createPrinters: PostResponse | null;
  putPrinters: PutResponse | null;
};

export enum PrintersEnums {
  getAllPrinters = "printers/get/all",
  getSearchAllPrinters = "printers/get/search",
  getDetailedPrinters = "printers/get/one",
  postPrinters = "printers/post/one",
  putPrinters = "printers/put/one",
}
