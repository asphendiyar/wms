import { lists } from "./initials";
export type DictionaryType = {
  code: string;
  name: string;
};

export interface DictionaryInitials {
  lists: typeof lists;
}

export enum DictionaryEnums {
  getDictionaryContent = "dictionary/get/one",
}
