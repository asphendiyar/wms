import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";

import {} from "../../reducers/erp-warehouses/types";
import {
  PatchPickingOrdersParams,
  PickingOrdersContentType,
  PickingOrdersWithPage,
  PickingTasksTable,
} from "../../reducers/picking-orders/types";

export const getAllPickingOrders = async ({
  page,
  size,
  outbound_id,
}: FilterPayloadTypes) =>
  fetchHelper<PickingOrdersWithPage>(
    `${BASE_URL + pathnames.pickingOrders}page/filter?page=${page || 1}&size=${
      size || 10
    }${outbound_id ? "&outbound_id=" + outbound_id : EmptyString}`,
    "GET"
  );

export const getDetailedPickingOrders = async (id: string) =>
  fetchHelper<PickingOrdersContentType>(
    `${BASE_URL + pathnames.pickingOrders}${id}`,
    "GET"
  );
export const getPickingTasks = async (id: string) =>
  fetchHelper<PickingTasksTable[]>(
    `${BASE_URL + pathnames.pickingTasks}picking-order/${id}`,
    "GET"
  );

export const patchPickPickingOrders = async ({
  pickStatus,
  id,
}: PatchPickingOrdersParams) => {
  return fetchHelper<PatchPickingOrdersParams>(
    `${BASE_URL + pathnames.pickingOrders + id}/pick/${pickStatus}`,
    "PATCH"
  );
};
