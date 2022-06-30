import { createSelector } from "@reduxjs/toolkit";
import { EmptyString } from "../../helpers";
import { RootState } from "../../store";
import { CategoryListType, ProductCatalogAllTypes } from "./types";

export const selectProductCatalog = (
  state: RootState
): ProductCatalogAllTypes => state.productCatalog.allProducts;

export const selectProductCategory = (state: RootState): CategoryListType[] =>
  state.productCatalog.categoryList;

export const selectProductCatalogList = createSelector(
  selectProductCatalog,
  (productList: ProductCatalogAllTypes) =>
    productList.content.map((item) => ({
      ...item,
      accuracy_of_production_date: item.control.accuracy_of_production_date,
      accuracy_of_production_date_title:
        item.control.accuracy_of_production_date_title,
      is_track_expiration_date: item.control.is_track_expiration_date,
      is_print_expiration_date: item.control.is_print_expiration_date,
      accuracy_of_expiration_date_title:
        item.control.accuracy_of_expiration_date_title,
      accuracy_of_expiration_date: item.control.accuracy_of_expiration_date,
      expiration_date: item.control.expiration_date,
      min_expiration_date_for_inbound:
        item.control.min_expiration_date_for_inbound,
      min_expiration_date_for_outbound:
        item.control.min_expiration_date_for_outbound,
      min_count_in_picking: item.control.min_count_in_picking,
      max_count_in_picking: item.control.max_count_in_picking,
      type_of_trade_item: item.control.type_of_trade_item,
      equipment_type: item.control.equipment_type,
      account_serial_number: item.control.account_serial_number,
      account_serial_number_title: item.control.account_serial_number_title,
      count_serial_number: item.control.count_serial_number,
      net_weight: item.measurement.net_weight,
      gross_weight: item.measurement.gross_weight,
      length: item.measurement.length,
      width: item.measurement.width,
      height: item.measurement.height,
      volume: item.measurement.volume,
      cell_height: item.measurement.cell_height,
      barcodes:
        item.barcodes.find((x) => x.is_primary === true)?.code || EmptyString,
      code_sticky: item.code,
      description_sticky: item.description,
    }))
);
