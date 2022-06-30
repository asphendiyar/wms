import { PutResponse } from "../../commonTypes";

export interface PickingOrdersBase {
  id: number;
  outbound_id: number;
  state: string;
  state_title: string;
  route: string;
  planned_shipping_date: string;
  trade_item_type: string;
  is_picking_allowed: boolean;
  is_not_enough_quantity_in_func_zone: boolean;
  is_not_enough_quantity_in_warehouse: boolean;
  do_not_delay: boolean;
  number_of_lines: number;
  functional_zone_code: string;
  volume: number;
  net_weight: number;
  gross_weight: number;
  ordered_quantity: number;
  actual_quantity: number;
  created_date: string;
  updated_date: string;
}

export type PickingOrderOutboundsType = {
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
  delivery: {
    name: string;
    code: string;
    country_code: string;
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
};

export type PickingOrderProductsType = {
  sku: string;
  line_number: number;
  description: string;
  barcode: string;
  erp_warehouse: string;
  quantity_in_outbound: number;
  actual_quantity: number;
  left_quantity: number;
  actual_volume: number;
  actual_weight: number;
  note: string;
};

export type PatchPickingOrdersParams = {
  id?: string;
  pickStatus?: boolean;
};

export type PickingOrderReservedProductsType = {
  cell: string;
  quantity: number;
  sku: string;
  barcode: string;
  erp_warehouse: string;
  description: string;
  trade_item_barcode: string;
};
export interface PickingOrdersContentType extends PickingOrdersBase {
  outbound: PickingOrderOutboundsType;
  products: PickingOrderProductsType[];
  reserved_products: PickingOrderReservedProductsType[];
}

export interface PickingTasksTable {
  type: string;
  type_title: string;
  state: string;
  state_title: string;
  warehouse_id: number;
  source_erp_warehouse: string;
  target_erp_warehouse: string;
  picking_order_id: number;
  outbound_id: number;
  priority: number;
  functional_zone_code: string;
  route: string;
  source_cell: string;
  target_cell: string;
  sku: string;
  quantity: number;
  actual_quantity: number;
  description: string;
  trade_item_barcode: string;
  profile_login: string;
  created_date: string;
  updated_date: string;
}

export interface PickingOrdersWithPage {
  content: PickingOrdersBase[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}

export interface PickingOrdersInitials {
  allPickingOrders: PickingOrdersWithPage;
  detailedPickingOrder: PickingOrdersContentType | null;
  selectedPickingOrder: PickingOrdersBase | null;
  patchPickPickingOrders: PutResponse | null;
  pickingTasks: PickingTasksTable[];
}

export enum PickingOrderEnums {
  getAllPickingOrders = "picking-orders/get/all",
  getDetailedPickingOrder = "picking-orders/get/one",
  getSearchAllPickingOrders = "picking-orders/get/search",
  patchPickPickingOrders = "picking-orders/patch/pick",
  getPickingTasks = "picking-orders/get/picking-tasks",
}
