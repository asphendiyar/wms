import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  PickingPrioritiesBase,
  PickingPrioritiesContentType,
  PickingPrioritiesParams,
} from "../../reducers/picking-priority/types";

export const postPickingPriorities = async (data: PickingPrioritiesBase) => {
  return fetchHelper<PickingPrioritiesBase>(
    BASE_URL + pathnames.pickingPriorities,
    "POST",
    data
  );
};

export const putPickingPriorities = async ({
  id,
  data,
}: PickingPrioritiesParams) => {
  return fetchHelper<PickingPrioritiesBase>(
    BASE_URL + pathnames.pickingPriorities + id,
    "PUT",
    data
  );
};

export const getAllPickingPriorities = async ({
  page,
  state,
}: FilterPayloadTypes) =>
  fetchHelper<PickingPrioritiesContentType[]>(
    `${BASE_URL + pathnames.pickingPriorities}page/filter?page=${page || 1}${
      state ? "&state=" + state : EmptyString
    }`,
    "GET"
  );

export const getDetailedPickingPriorities = async (code: string) =>
  fetchHelper<PickingPrioritiesContentType>(
    `${BASE_URL + pathnames.pickingPriorities}${code}`,
    "GET"
  );
