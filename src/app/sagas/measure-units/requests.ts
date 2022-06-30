import { fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";
import {
  MeasureUnitsBase,
  MeasureUnitsContentType,
  MeasureUnitsParams,
} from "../../reducers/measure-units/types";

export const postMeasureUnits = async (data: MeasureUnitsBase) => {
  return fetchHelper<MeasureUnitsBase>(
    BASE_URL + pathnames.measureUnits,
    "POST",
    data
  );
};

export const putMeasureUnits = async ({ code, data }: MeasureUnitsParams) => {
  return fetchHelper<MeasureUnitsBase>(
    BASE_URL + pathnames.measureUnits + code,
    "PUT",
    data
  );
};

export const getAllMeasureUnits = async () =>
  fetchHelper<MeasureUnitsContentType[]>(
    `${BASE_URL + pathnames.measureUnits}`,
    "GET"
  );

export const getDetailedMeasureUnits = async (code: string) =>
  fetchHelper<MeasureUnitsContentType>(
    `${BASE_URL + pathnames.measureUnits}${code}`,
    "GET"
  );
