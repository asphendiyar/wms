import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  PrintersFormValues,
  PrintersParams,
  PrintersPutFormValues,
} from "../../reducers/printers/types";

export const postPrinters = async (data: PrintersFormValues) => {
  return fetchHelper<PrintersFormValues>(
    BASE_URL + pathnames.printers,
    "POST",
    data
  );
};

export const putPrinters = async ({ id, data }: PrintersParams) => {
  return fetchHelper<PrintersPutFormValues>(
    BASE_URL + pathnames.printers + id,
    "PUT",
    data
  );
};

export const getAllPrinters = async ({
  page,
  name,
  code,
}: FilterPayloadTypes) => {
  return fetchHelper<PrintersPutFormValues>(
    `${BASE_URL + pathnames.printers}page/filter?page=${page || 1}${
      name ? "&name=" + name : EmptyString
    }${code ? "&code=" + code : EmptyString}`,
    "GET"
  );
};
export const getDetailedPrinters = async (id: string) => {
  return fetchHelper<PrintersPutFormValues>(
    `${BASE_URL + pathnames.printers + id}`,
    "GET"
  );
};
