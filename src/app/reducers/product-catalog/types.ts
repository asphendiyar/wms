import { PostResponse, PutResponse } from "../../commonTypes";

export type ProductCatalogFormValues = {
  id?: number;
  code: string;
  barcodes: { code: string; type: string; is_primary: boolean }[];
  description: string;
  is_suitable: boolean;
  type: string;
  kit_type: string;
  processing_type: string;
  rotation: string;
  measure_unit: string;
  image_url: string;
  note: string;
  measure_state: string;
  commodity_code: string;
  popularity_code: string;
  control: {
    accuracy_of_production_date: string;
    is_track_expiration_date: boolean;
    is_print_expiration_date: boolean;
    accuracy_of_expiration_date: string;
    expiration_date: number;
    min_expiration_date_for_inbound: number;
    min_expiration_date_for_outbound: number;
    min_count_in_picking: string;
    max_count_in_picking: string;
    type_of_trade_item: string;
    equipment_type: string;
    account_serial_number: string;
  };
  measurement: {
    net_weight: number;
    gross_weight: number;
    length: number;
    width: number;
    height: number;
    volume: number;
    cell_height: number;
  };
  category: {
    category_id: number;
  };
};
export type BarcodeTypes = {
  code: string;
  type: string;
  is_primary: boolean;
};
export type ProductContentType = {
  id: number;
  state: string;
  state_title: string;
  code: string;
  barcodes: BarcodeTypes[];
  created_date: string;
  updated_date: string;
  description: string;
  is_suitable: boolean;
  type: string;
  kit_type: string;
  kit_type_title: string;
  processing_type: string;
  processing_type_title: string;
  rotation: string;
  rotation_title: string;
  measure_unit: string;
  image_url: string;
  note: string;
  measure_state: string;
  measure_state_title: string;
  commodity_code: string;
  popularity_code: string;
  control: {
    accuracy_of_production_date: string;
    accuracy_of_production_date_title: string;
    is_track_expiration_date: boolean;
    is_print_expiration_date: boolean;
    accuracy_of_expiration_date: string;
    accuracy_of_expiration_date_title: string;
    expiration_date: string;
    min_expiration_date_for_inbound: number;
    min_expiration_date_for_outbound: number;
    min_count_in_picking: string;
    max_count_in_picking: string;
    type_of_trade_item: string;
    equipment_type: string;
    account_serial_number: string;
    account_serial_number_title: string;
    count_serial_number: number;
  };
  measurement: {
    net_weight: number;
    gross_weight: number;
    length: number;
    width: number;
    height: number;
    volume: number;
    cell_height: number;
  };
  standard_measurements: {
    id: number;
    denominator: number;
    measure_unit: {
      id: number;
      code: string;
      created_date: string;
      updated_date: string;
      name: string;
      state: string;
    };
  }[];
};

export type ProductCatalogAllTypes = {
  content: ProductContentType[];
  number: number;
  number_of_elements: number;
  total_elements: number;
  total_pages: number;
};

export type CategoryListType = {
  id: number;
  code: string;
  created_date: string;
  updated_date: string;
  name: string;
  has_child: boolean;
};

export type SelectedProductCategoryType = {
  level_one?: CategoryListType | null;
  level_two?: CategoryListType | null;
  level_three?: CategoryListType | null;
  level_four?: CategoryListType | null;
  level_five?: CategoryListType | null;
};

export type CategoryTreeListType = {
  level: number;
  name: string;
  id: number;
  code: string;
};

export interface ProductCatalogInitials {
  allProducts: ProductCatalogAllTypes;
  createProduct: PostResponse | null;
  detailedProduct: ProductContentType | null;
  categoryList: CategoryListType[];
  selectedProductCategory: SelectedProductCategoryType;
  categoryTreeList: CategoryTreeListType[];
  putProduct: PutResponse | null;
}

export enum ProductCatalogEnums {
  postProductCatalog = "productCatalog/post/one",
  putProductCatalog = "productCatalog/put/one",
  getCategoryTreeList = "productCatalog/get/byCode/catergoryList",
  getProductCatalog = "productCatalog/get/all",
  getSearchProductCatalog = "productCatalog/get/search",
  getDetailedProduct = "productCatalog/get/one",
  getCategoryList = "productCategoryList/get/all",
  getRootCategory = "productCategoryList/get/root",
}
