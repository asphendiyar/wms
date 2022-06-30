export interface TradeItemDocumentsBase {
  id: number;
  state: string;
  state_title: string;
  barcode: string;
  type: string;
  warehouse_id: number;
  cell: number;
  erp_warehouse: string;
  actual_volume: number;
  max_volume: number;
  actual_weight: number;
  max_weight: number;
  outbound_id: number;
  outbound_delivery_code: string;
}

export interface TradeItemDocumentsContentType extends TradeItemDocumentsBase {
  products: TradeItemDocumentsProductType[];
}

export type TradeItemDocumentsProductType = {
  id: number;
  sku: string;
  description: string;
  barcode: string;
  commodity_code: string;
  quantity: number;
  available_quantity: number;
  reserved_quantity: number;
  created_date: string;
  updated_date: string;
};
export interface TradeItemDocumentsWithPage {
  content: TradeItemDocumentsBase[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
}

export interface TradeItemDocumentsInitials {
  allTradeItemDocuments: TradeItemDocumentsWithPage;
  detailedTradeItemDocuments: TradeItemDocumentsContentType | null;
}

export enum TradeItemDocumentEnums {
  getAllTradeItemDocuments = "trade-item-documents/get/all",
  getSearchAllTradeItemDocuments = "trade-item-documents/get/search",
  getDetailedTradeItemDocuments = "trade-item-documents/get/one",
}
