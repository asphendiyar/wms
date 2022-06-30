import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DictionaryInitials, DictionaryType } from "./types";
import { lists } from "./initials";
import { DoublePayload } from "../../commonTypes";
import { transformToUppercase } from "../../helpers";

const initialState: DictionaryInitials = {
  lists,
};

const dictionary = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setLists: (
      state,
      action: PayloadAction<DoublePayload<DictionaryType[], string>>
    ) => {
      const splittedLocalPayload = action.payload.localPayload.split(".");
      const transformedLocalPayload0 = transformToUppercase(
        splittedLocalPayload[0]
      );
      const transformedLocalPayload1 = transformToUppercase(
        splittedLocalPayload[1]
      );
      //@ts-ignore
      state.lists[transformedLocalPayload0] = {
        //@ts-ignore
        ...state.lists[transformedLocalPayload0],
        [transformedLocalPayload1]: action.payload.payload.map((item) => ({
          label: item.name,
          value: item.code,
        })),
      };
    },
  },
});

export const { setLists } = dictionary.actions;

export default dictionary.reducer;
