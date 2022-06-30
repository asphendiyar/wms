import { PutResponse, PostResponse } from "../../commonTypes";

export interface MeasureUnitsFormValues {
  code: string;
  name: string;
}
export interface MeasureUnitsBase {
  name: string;
  state: string;
}
export interface MeasureUnitsContentType {
  id: number;
  code: string;
  created_date: string;
  updated_date: string;
  name: string;
  state: string;
  state_title: string;
}

export type MeasureUnitsParams = {
  code: string;
  data: MeasureUnitsBase;
};

export interface MeasureUnitsInitials {
  allMeasureUnits: MeasureUnitsContentType[];
  detailedMeasureUnits: MeasureUnitsContentType | null;
  createMeasureUnits: PostResponse | null;
  putMeasureUnits: PutResponse | null;
}

export enum MeasureUnitEnums {
  getAllMeasureUnits = "measure-units/get/all",
  getDetailedMeasureUnits = "measure-units/get/one",
  postMeasureUnits = "measure-units/post/one",
  putMeasureUnits = "measure-units/put/one",
}
