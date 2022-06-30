import { InboundsTableData } from "../../../components/Inbound/Inbounds";
import { PutResponse } from "../../commonTypes";
import { RampsContentType, RampsType } from "../warehouse/types";

export type InboundContentType = {
  id: number;
  state: string;
  state_title: string;
  number: string;
  external_number: string;
  number_of_lines: number;
  accepted_lines: number;
  document_date: string;
  finished_date: string;
  merchant_id: number;
  merchant_code: string;
  merchant: string;
  type: string;
  creation_source: string;
  erp_warehouse: string;
  warehouse_id: number;
  products: InboundProduct[];
};

export type InboundsWithPage = {
  content: InboundContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
};

export type InboundProduct = {
  line_number: number;
  state: string;
  sku: string;
  description: string;
  barcode: number;
  quantity: number;
  accepted_quantity: number;
  left_quantity: number;
  erp_warehouse: string;
  is_unlimited_quantity: boolean;
  is_finished: boolean;
  control: InboundProductControl;
  serials: string[];
  created_date: string;
  updated_date: string;
};

export interface PatchOpenInbound {
  ramp_code: string;
}

export type InboundProductControl = {
  is_track_expiration_date: boolean;
  account_serial_number: string;
};

export interface PatchInboundParams {
  id?: string;
  data?: PatchOpenInbound;
}

export interface InboundDetailsTable {
  line_number: number;
  state: string;
  sku: string;
  description: string;
  barcode: number;
  quantity: number;
  accepted_quantity: number;
  left_quantity: number;
  erp_warehouse: string;
  is_unlimited_quantity: boolean;
  is_finished: boolean;
  is_track_expiration_date: boolean;
  account_serial_number: string;
  created_date: string;
  updated_date: string;
  serials: string[];
}
export interface InboundInitials {
  allInbounds: InboundsWithPage;
  inbound: InboundContentType | null;
  patchOpenInbound: PutResponse | null;
  patchCloseInbound: PutResponse | null;
  patchDeclineInbound: PutResponse | null;
  selectedInbound: InboundsTableData | null;
  selectedRampsInbound: RampsContentType | null;
  allRampsInbound: RampsType;
  selectedInboundProduct: InboundDetailsTable | null;
}

export enum InboundEnums {
  getAllInbound = "inbound/get/all",
  getSearchAllInbound = "inbound/get/search",
  getOneInbound = "inbound/get/one",
  patchInboundOpen = "inbound/patch/open",
  patchInboundClose = "inbound/patch/close",
  patchInboundDecline = "inbound/patch/decline",
  getAllRampsInbound = "warehouse/ramps/get/all/inbound",
}
