import { createAction } from "@reduxjs/toolkit";
import { FilterPayloadTypes } from "../../commonTypes";
import { OutboundEnums, PatchOutboundParams } from "./types";

export const getAllOutboundsAction = createAction<FilterPayloadTypes>(
  OutboundEnums.getAllOutbound
);
export const getSearchAllOutboundsAction = createAction<FilterPayloadTypes>(
  OutboundEnums.getSearchAllOutbound
);

export const getOneOutboundsAction = createAction<string>(
  OutboundEnums.getOneOutbound
);

export const patchOutboundCollectAction = createAction<PatchOutboundParams>(
  OutboundEnums.patchOutboundCollect
);

export const patchOutboundCloseAction = createAction<PatchOutboundParams>(
  OutboundEnums.patchOutboundClose
);

export const patchOutboundAttachAction = createAction<PatchOutboundParams>(
  OutboundEnums.patchOutboundAttach
);
