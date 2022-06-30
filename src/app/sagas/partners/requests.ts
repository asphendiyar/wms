import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";

import {} from "../../reducers/erp-warehouses/types";
import {
  PartnersContentType,
  PartnersFormValues,
  PartnersParams,
  PartnersWithPage,
} from "../../reducers/partner/types";

export const postPartners = async (data: PartnersFormValues) => {
  return fetchHelper<PartnersFormValues>(
    BASE_URL + pathnames.partners,
    "POST",
    data
  );
};

export const putPartners = async ({ id, data }: PartnersParams) => {
  return fetchHelper<PartnersFormValues>(
    BASE_URL + pathnames.partners + id,
    "PUT",
    data
  );
};

export const getAllPartners = async ({
  page,
  size,
  name,
  code,
}: FilterPayloadTypes) =>
  fetchHelper<PartnersWithPage>(
    `${BASE_URL + pathnames.partners}page/filter?page=${page || 1}&size=${
      size || 10
    }${name ? "&name=" + name : EmptyString}${
      code ? "&code=" + code : EmptyString
    }`,
    "GET"
  );

export const getDetailedPartners = async (id: string) =>
  fetchHelper<PartnersContentType>(
    `${BASE_URL + pathnames.partners}${id}`,
    "GET"
  );
