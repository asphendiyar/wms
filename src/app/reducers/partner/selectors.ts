import { createSelector } from "@reduxjs/toolkit";
import { ReactSelectValues } from "../../commonTypes";
import { normalizeDate } from "../../helpers";
import { RootState } from "../../store";
import { PartnersWithPage } from "./types";

export const selectPartners = (state: RootState): PartnersWithPage =>
  state.partners.allPartners;

export const selectPartnersList = createSelector(
  selectPartners,
  (partnersList: PartnersWithPage) =>
    partnersList.content.map((item) => ({
      ...item,
      code_sticky: item.code,
      name_sticky: item.name,
      company_code_sticky: item.company_code,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
);

export const selectPartnerList = createSelector(
  selectPartnersList,
  (list): ReactSelectValues[] =>
    list.map((item) => ({ value: item.id, label: item.name }))
);
