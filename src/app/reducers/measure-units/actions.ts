import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import {
  MeasureUnitEnums,
  MeasureUnitsFormValues,
  MeasureUnitsParams,
} from "./types";

export const getAllMeasureUnitsAction = createAction<FilterPayloadTypes>(
  MeasureUnitEnums.getAllMeasureUnits
);

export const getDetailedMeasureUnitsAction = createAction<string>(
  MeasureUnitEnums.getDetailedMeasureUnits
);

export const postMeasureUnitsAction = createAction<MeasureUnitsFormValues>(
  MeasureUnitEnums.postMeasureUnits
);

export const putMeasureUnitsAction = createAction<MeasureUnitsParams>(
  MeasureUnitEnums.putMeasureUnits
);
