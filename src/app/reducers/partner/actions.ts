import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { PartnerEnums, PartnersFormValues, PartnersParams } from "./types";

export const getAllPartnersAction = createAction<FilterPayloadTypes>(
  PartnerEnums.getAllPartners
);
export const getSearchAllPartnersAction = createAction<FilterPayloadTypes>(
  PartnerEnums.getSearchAllPartners
);

export const getDetailedPartnersAction = createAction<string>(
  PartnerEnums.getDetailedPartners
);

export const postPartnersAction = createAction<PartnersFormValues>(
  PartnerEnums.postPartners
);

export const putPartnersAction = createAction<PartnersParams>(
  PartnerEnums.putPartners
);
