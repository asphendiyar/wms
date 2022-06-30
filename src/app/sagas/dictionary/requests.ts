import { fetchHelper } from "../../helpers";
import { BASE_URL, pathnames } from "../../pathnames";

export const getDictionaryContent = async (code: string) =>
  fetchHelper(`${BASE_URL + pathnames.dictionary}?code=${code}`, "GET");
