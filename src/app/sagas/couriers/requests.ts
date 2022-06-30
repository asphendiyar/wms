import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  CouriersContentType,
  CouriersFormValues,
  CouriersParams,
  CouriersPutForm,
  CouriersWithPage,
} from "../../reducers/couriers/types";

export const postCouriers = async (data: CouriersFormValues) => {
  return fetchHelper<CouriersFormValues>(
    BASE_URL + pathnames.couriers,
    "POST",
    data
  );
};

export const putCouriers = async ({ code, data }: CouriersParams) => {
  return fetchHelper<CouriersPutForm>(
    BASE_URL + pathnames.couriers + code,
    "PUT",
    data
  );
};

export const getAllCouriers = async ({ page, state }: FilterPayloadTypes) =>
  fetchHelper<CouriersWithPage>(
    `${BASE_URL + pathnames.couriers}page/filter?page=${page || 1}${
      state ? "&state=" + state : EmptyString
    }`,
    "GET"
  );

export const getDetailedCouriers = async (code: string) =>
  fetchHelper<CouriersContentType>(
    `${BASE_URL + pathnames.couriers}${code}`,
    "GET"
  );
