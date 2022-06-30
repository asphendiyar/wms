import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  ErpWarehousesContentType,
  ErpWarehousesFormValues,
  ErpWarehousesParams,
  ErpWarehousesWithPage,
} from "../../reducers/erp-warehouses/types";

export const postErpWarehouses = async (data: ErpWarehousesFormValues) => {
  return fetchHelper<ErpWarehousesFormValues>(
    BASE_URL + pathnames.erpWarehouses,
    "POST",
    data
  );
};

export const putErpWarehouses = async ({ id, data }: ErpWarehousesParams) => {
  return fetchHelper<ErpWarehousesFormValues>(
    BASE_URL + pathnames.erpWarehouses + id,
    "PUT",
    data
  );
};

export const getAllErpWarehouses = async ({
  page,
  size,
  warehouse_id,
  code,
}: FilterPayloadTypes) =>
  fetchHelper<ErpWarehousesWithPage>(
    `${BASE_URL + pathnames.erpWarehouses}page/filter?page=${page || 1}&size=${
      size || 10
    }${warehouse_id ? "&warehouse_id=" + warehouse_id : EmptyString}${
      code ? "&code=" + code : EmptyString
    }`,
    "GET"
  );

export const getDetailedErpWarehouse = async (id: string) =>
  fetchHelper<ErpWarehousesContentType>(
    `${BASE_URL + pathnames.erpWarehouses}${id}`,
    "GET"
  );
