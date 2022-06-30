import { PutResponse } from "../../commonTypes";
import { ShipmentsWithPage } from "../shipments/types";

export type OutboundContentType = {
  id: number;
  number: string;
  state: string;
  state_title: string;
  external_number: string;
  type: string;
  document_date: string;
  created_date: string;
  merchant_code: string;
  creation_source: string;
  erp_warehouse: string;
  carrier_code: string;
  warehouse_id: number;
  route: string;
  complete_percentage: number;
  delivery: {
    name: string;
    code: string;
    country_code: string;
    region: string;
    district: string;
    postal_code: string;
    street: string;
    house_number: string;
    apartment_number: string;
    phone: string;
    email: string;
    comment: string;
    type: string;
    method: string;
  };
  shipment_id: number;
  shipment_note: string;
  products: OutboundProduct[];
  tradeItems: OutboundTradeItems[];
};

export type OutboundsWithPage = {
  content: OutboundContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
};

export type OutboundProduct = {
  line_number: number;
  state: string;
  state_title: string;
  sku: string;
  price: number;
  description: string;
  quantity: number;
  actual_quantity: number;
  barcode: string;
  trade_item_barcode: string;
  erp_warehouse: string;
  created_date: string;
  updated_date: string;
};
export type OutboundTradeItems = {
  state: string;
  state_title: string;
  barcode: string;
  cell: string;
  erp_warehouse: string;
  actual_volume: number;
  max_volume: number;
  actual_weight: number;
  max_weight: number;
  created_date: string;
  updated_date: string;
};

export interface OutboundsTableData {
  id: number;
  number: string;
  state: string;
  state_title: string;
  external_number: string;
  type: string;
  document_date: string;
  merchant_code: string;
  creation_source: string;
  erp_warehouse: string;
  carrier_code: string;
  warehouse_id: number;
  route: string;
  complete_percentage: number;
  shipment_id: number;
  shipment_note: string;
  created_date: string;
}

export type OutboundProductControl = {
  is_track_expiration_date: boolean;
  account_serial_number: string;
};

export interface PatchOutboundParams {
  id?: string;
  shipment_id?: string;
}

export interface OutboundInitials {
  allOutbounds: OutboundsWithPage;
  outbound: OutboundContentType | null;
  patchCollectOutbound: PutResponse | null;
  patchCloseOutbound: PutResponse | null;
  patchAttachToShipment: PutResponse | null;
  selectedOutbound: OutboundsTableData | null;
  allShipments: ShipmentsWithPage;
}

export enum OutboundEnums {
  getAllOutbound = "outbound/get/all",
  getSearchAllOutbound = "outbound/get/search",
  getOneOutbound = "outbound/get/one",
  patchOutboundCollect = "outbound/patch/open",
  patchOutboundClose = "outbound/patch/close",
  patchOutboundAttach = "outbound/patch/attach",
}
