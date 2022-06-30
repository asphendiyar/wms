import { PutResponse, PostResponse } from "../../commonTypes";
import { OutboundTradeItems } from "../outbound/types";
import {
  FunctionalZones,
  RampsContentType,
  RampsType,
} from "../warehouse/types";

export type ShipmentsFormValues = {
  warehouse_id: number;
  date: string;
  functional_zone_code: string;
  ramp_code: string;
  is_picking_allowed: boolean;
  note: string;
  route: string;
  plate_number: string;
  carrier: string;
  carrier_code?: string;
  weight?: number;
  volume?: number;
  periodic_reservation_code?: string;
};

export type ShipmentsParams = { id: string; data: ShipmentsFormValues };

export interface ShipmentsContentType {
  id: number;
  warehouse_id: number;
  state: string;
  state_title: string;
  date: string;
  functional_zone: string;
  ramp: string;
  is_picking_allowed: boolean;
  note: string;
  route: string;
  plate_number: string;
  carrier: string;
  carrier_code: string;
  weight: number;
  volume: number;
  periodic_reservation_code: string;
  started_date: string;
  end_date: string;
  created_date: string;
  updated_date: string;
  deliveries: ShipmentDeliveries[];
  outbounds: ShipmentOutbounds[];
  products: ShipmentProducts[];
  tradeItems: OutboundTradeItems[];
  reservation_lines: ShipmentReservationLines[];
}

export type ShipmentDeliveries = {
  outbound_id: number;
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

export type ShipmentOutbounds = {
  number: string;
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
};

export type ShipmentProducts = {
  outbound_id: number;
  state: string;
  line_number: number;
  sku: string;
  quantity: number;
  actual_quantity: number;
  price: number;
  description: string;
  barcode: string;
  trade_item_barcode: string;
  erp_warehouse: string;
  created_date: string;
  updated_date: string;
};
export type ShipmentReservationLines = {
  cell_address: string;
};

export interface ShipmentsWithPage {
  content: ShipmentsContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}
export interface ShipmentsInitials {
  allShipments: ShipmentsWithPage;
  detailedShipment: ShipmentsContentType | null;
  createShipment: PostResponse | null;
  putShipment: PutResponse | null;
  allRampsShipment: RampsType;
  selectedRampShipment: RampsContentType | null;
  allFzonesShipment: FunctionalZones[];
  selectedFzoneShipment: FunctionalZones | null;
  selectedShipment: ShipmentsContentType | null;
  patchOpenShipment: PutResponse | null;
  deattachFromShipment: PutResponse | null;
}

export enum ShipmentEnums {
  getAllShipments = "shipments/get/all",
  getSearchAllShipments = "shipments/get/search",
  getDetailedShipments = "shipments/get/one",
  postShipments = "shipments/post/one",
  putShipments = "shipments/put/one",
  getAllFzonesShipment = "shipments/fzones/get/all",
  getAllRampsShipment = "warehouse/ramps/get/all/shipments",
  patchOpenShipment = "shipments/patch/collect",
  patchDeattachFromShipment = "shipments/patch/deattach",
}
