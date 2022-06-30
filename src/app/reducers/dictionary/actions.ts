import { createAction } from "@reduxjs/toolkit";
import { DictionaryEnums } from "./types";

export const getDictionaryContentAction = createAction<string>(
  DictionaryEnums.getDictionaryContent
);
