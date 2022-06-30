import { FilterPayloadTypes } from "../../commonTypes";
import { EmptyString, fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  CellTypesBase,
  CellTypesContentType,
  CellTypesFormValues,
  CellTypesParams,
  CellTypesWithPage,
} from "../../reducers/cell-types/types";
import {} from "../../reducers/cell-types/types";

export const postCellTypes = async (data: CellTypesFormValues) => {
  return fetchHelper<CellTypesFormValues>(
    BASE_URL + pathnames.cellTypes,
    "POST",
    data
  );
};

export const putCellTypes = async ({ code, data }: CellTypesParams) => {
  return fetchHelper<CellTypesBase>(
    BASE_URL + pathnames.cellTypes + code,
    "PUT",
    data
  );
};

export const getAllCellTypes = async ({
  page,
  size,
  code,
}: FilterPayloadTypes) =>
  fetchHelper<CellTypesWithPage>(
    `${BASE_URL + pathnames.cellTypes}page/filter?page=${page || 1}&size=${
      size || 10
    }${code ? "&code=" + code : EmptyString}`,
    "GET"
  );

export const getDetailedCellType = async (code: string) =>
  fetchHelper<CellTypesContentType>(
    BASE_URL + pathnames.cellTypes + code,
    "GET"
  );
