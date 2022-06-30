import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { InboundEnums, PatchInboundParams } from "./types";

export const getAllInboundsAction = createAction<FilterPayloadTypes>(
  InboundEnums.getAllInbound
);

export const getSearchAllInboundsAction = createAction<FilterPayloadTypes>(
  InboundEnums.getSearchAllInbound
);

export const getOneInboundAction = createAction<string>(
  InboundEnums.getOneInbound
);

export const patchInboundOpenAction = createAction<PatchInboundParams>(
  InboundEnums.patchInboundOpen
);

export const patchInboundCloseAction = createAction<PatchInboundParams>(
  InboundEnums.patchInboundClose
);

export const patchInboundDeclineAction = createAction<PatchInboundParams>(
  InboundEnums.patchInboundDecline
);

export const getAllRampsInboundAction = createAction<null>(
  InboundEnums.getAllRampsInbound
);
