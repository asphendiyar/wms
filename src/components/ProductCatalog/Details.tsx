import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FieldWithLabel } from "../Common/DetailsComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  CategoryTreeListType,
  ProductCatalogEnums,
  ProductContentType,
} from "../../app/reducers/product-catalog/types";
import { RootState } from "../../app/store";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import TableEP from "./TableEP";
import TableBarcodes from "./TableBarcodes";
import { EmptyString } from "../../app/helpers";
import { DetailsWrapper } from "../Common/styled";
import {
  getDetailedProductCatalogAction,
  getProductCategoryTreeListAction,
} from "../../app/reducers/product-catalog/actions";
import { useTranslation } from "react-i18next";

export const Details: React.FC<{
  code?: string;
}> = ({ code }) => {
  const detailedProduct: ProductContentType | null = useAppSelector(
    (state: RootState) => state.productCatalog.detailedProduct
  );
  const categoryTreeList: CategoryTreeListType[] = useAppSelector(
    (state: RootState) => state.productCatalog.categoryTreeList
  );

  const isProductDetailsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductCatalogEnums.getDetailedProduct)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, ProductCatalogEnums.getDetailedProduct)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedProductCatalogAction(code || EmptyString));
  }, [dispatch, code]);

  useEffect(() => {
    dispatch(getProductCategoryTreeListAction(code || EmptyString));
  }, [dispatch, code]);

  return (
    <>
      {isProductDetailsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedProduct && (
          <DetailsWrapper>
            <div className="top-details">
              <Tabs>
                <TabList>
                  <Tab>{t("tabs.general")}</Tab>
                  <Tab>{t("tabs.control")}</Tab>
                  <Tab>{t("tabs.measurements")}</Tab>
                  <Tab>{t("tabs.categories")}</Tab>
                </TabList>

                <TabPanel>
                  <FieldWithLabel
                    label={t("columns.code")}
                    name={detailedProduct.code}
                  />
                  <FieldWithLabel
                    label={t("columns.state")}
                    name={detailedProduct.state_title}
                  />
                  <FieldWithLabel
                    label={t("columns.barcodes")}
                    name={
                      detailedProduct.barcodes.find(
                        (x) => x.is_primary === true
                      )?.code || EmptyString
                    }
                  />
                  <FieldWithLabel
                    label={t("columns.description")}
                    name={detailedProduct.description}
                  />

                  <FieldWithLabel
                    label={t("columns.kit_type")}
                    name={detailedProduct.kit_type_title}
                  />
                  <FieldWithLabel
                    label={t("columns.rotation")}
                    name={detailedProduct.rotation_title}
                  />
                  <FieldWithLabel
                    label={t("columns.type")}
                    name={detailedProduct.type}
                  />
                  <FieldWithLabel
                    label={t("columns.measure_state")}
                    name={detailedProduct.measure_state_title}
                  />

                  <FieldWithLabel
                    label={t("columns.note")}
                    name={detailedProduct.note}
                  />
                  <FieldWithLabel
                    label={t("columns.processing_type")}
                    name={detailedProduct.processing_type_title}
                  />
                  <FieldWithLabel
                    label={t("columns.popularity_code")}
                    name={detailedProduct.popularity_code}
                  />
                  <FieldWithLabel
                    label={t("columns.commodity_code")}
                    name={detailedProduct.commodity_code}
                  />
                </TabPanel>
                <TabPanel>
                  <FieldWithLabel
                    label={t("columns.accuracy_of_production_date")}
                    name={
                      detailedProduct.control.accuracy_of_production_date_title
                    }
                  />
                  <FieldWithLabel
                    label={t("columns.is_track_expiration_date")}
                    value={detailedProduct.control.is_track_expiration_date}
                  />
                  <FieldWithLabel
                    label={t("columns.is_print_expiration_date")}
                    value={detailedProduct.control.is_print_expiration_date}
                  />

                  <FieldWithLabel
                    label={t("columns.accuracy_of_expiration_date")}
                    name={
                      detailedProduct.control.accuracy_of_expiration_date_title
                    }
                  />
                  <FieldWithLabel
                    label={t("columns.expiration_date")}
                    name={detailedProduct.control.expiration_date}
                  />
                  <FieldWithLabel
                    label={t("columns.min_expiration_date_for_inbound")}
                    name={
                      detailedProduct.control.min_expiration_date_for_inbound
                    }
                  />
                  <FieldWithLabel
                    label={t("columns.min_expiration_date_for_outbound")}
                    name={
                      detailedProduct.control.min_expiration_date_for_outbound
                    }
                  />
                  <FieldWithLabel
                    label={t("columns.min_count_in_picking")}
                    name={detailedProduct.control.min_count_in_picking}
                  />
                  <FieldWithLabel
                    label={t("columns.max_count_in_picking")}
                    name={detailedProduct.control.max_count_in_picking}
                  />
                  <FieldWithLabel
                    label={t("columns.type_of_trade_item")}
                    name={detailedProduct.control.type_of_trade_item}
                  />
                  <FieldWithLabel
                    label={t("columns.equipment_type")}
                    name={detailedProduct.control.equipment_type}
                  />
                  <FieldWithLabel
                    label={t("columns.account_serial_number")}
                    name={detailedProduct.control.account_serial_number_title}
                  />
                  <FieldWithLabel
                    label={t("columns.count_serial_number")}
                    name={detailedProduct.control.count_serial_number}
                  />
                </TabPanel>

                <TabPanel>
                  <FieldWithLabel
                    label={t("columns.net_weight")}
                    name={detailedProduct.measurement.net_weight}
                  />
                  <FieldWithLabel
                    label={t("columns.gross_weight")}
                    name={detailedProduct.measurement.gross_weight}
                  />
                  <FieldWithLabel
                    label={t("columns.length")}
                    name={detailedProduct.measurement.length}
                  />
                  <FieldWithLabel
                    label={t("columns.width")}
                    name={detailedProduct.measurement.width}
                  />
                  <FieldWithLabel
                    label={t("columns.height")}
                    name={detailedProduct.measurement.height}
                  />
                  <FieldWithLabel
                    label={t("columns.volume")}
                    name={detailedProduct.measurement.volume}
                  />
                  <FieldWithLabel
                    label={t("columns.cell_height")}
                    name={detailedProduct.measurement.cell_height}
                  />
                </TabPanel>
                <TabPanel>
                  {categoryTreeList.map((x) => (
                    <FieldWithLabel
                      label={t(
                        `columns.${
                          x.level === 2
                            ? "level_two"
                            : x.level === 3
                            ? "level_three"
                            : x.level === 4
                            ? "level_four"
                            : x.level === 5
                            ? "level_five"
                            : "level_one"
                        }`
                      )}
                      name={x.name}
                      key={x.id}
                    />
                  ))}
                </TabPanel>
              </Tabs>
            </div>
            <div className="bottom-details">
              <Tabs>
                <TabList>
                  <Tab>{t("tabs.standardMeasurements")}</Tab>
                  <Tab>{t("tabs.barcodes")}</Tab>
                </TabList>

                <TabPanel>
                  <TableEP />
                </TabPanel>
                <TabPanel>
                  <TableBarcodes />
                </TabPanel>
              </Tabs>
            </div>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
