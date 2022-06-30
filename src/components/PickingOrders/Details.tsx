import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FieldWithLabel } from "../Common/DetailsComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import {
  PickingOrderEnums,
  PickingOrdersContentType,
} from "../../app/reducers/picking-orders/types";
import PickingOrderProducts from "./PickingOrderProductsTable";
import ReservedProducts from "./ReservedProductsTable";
import { DetailsWrapper } from "../Common/styled";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import {
  getDetailedPickingOrdersAction,
  getPickingTasksAction,
} from "../../app/reducers/picking-orders/actions";
import { useTranslation } from "react-i18next";
import PickingTasks from "./PickingTasksTable";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedPickingOrders: PickingOrdersContentType | null = useAppSelector(
    (state: RootState) => state.pickingOrders.detailedPickingOrder
  );

  const isDetailedPickingOrdersFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingOrderEnums.getDetailedPickingOrder)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PickingOrderEnums.getDetailedPickingOrder)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedPickingOrdersAction(id?.toString() || EmptyString));
    dispatch(getPickingTasksAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedPickingOrdersFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedPickingOrders && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("columns.outbound_delivery_code")}</Tab>
                <Tab>{t("tabs.detailsDeliveryPicking")}</Tab>
                <Tab>{t("tabs.pickingProducts")}</Tab>
                <Tab>{t("tabs.reservedProducts")}</Tab>
                <Tab>{t("tabs.pickingTasks")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.id")}
                  name={detailedPickingOrders.id}
                />
                <FieldWithLabel
                  label={t("columns.state_title")}
                  name={detailedPickingOrders.state_title}
                />
                <FieldWithLabel
                  label={t("columns.planned_shipping_date")}
                  name={detailedPickingOrders.planned_shipping_date}
                />
                <FieldWithLabel
                  label={t("columns.route")}
                  name={detailedPickingOrders.route}
                />
                <FieldWithLabel
                  label={t("columns.trade_item_type")}
                  name={detailedPickingOrders.trade_item_type}
                />
                <FieldWithLabel
                  label={t("columns.is_picking_allowed")}
                  value={detailedPickingOrders.is_picking_allowed}
                />
                <FieldWithLabel
                  label={t("columns.is_not_enough_quantity_in_func_zone")}
                  value={
                    detailedPickingOrders.is_not_enough_quantity_in_func_zone
                  }
                />
                <FieldWithLabel
                  label={t("columns.is_not_enough_quantity_in_warehouse")}
                  value={
                    detailedPickingOrders.is_not_enough_quantity_in_warehouse
                  }
                />
                <FieldWithLabel
                  label={t("columns.is_picking_allowed")}
                  value={detailedPickingOrders.is_picking_allowed}
                />
                <FieldWithLabel
                  label={t("columns.number_of_lines")}
                  name={detailedPickingOrders.number_of_lines}
                />
                <FieldWithLabel
                  label={t("columns.functional_zone_code")}
                  name={detailedPickingOrders.functional_zone_code}
                />
                <FieldWithLabel
                  label={t("columns.volume")}
                  name={detailedPickingOrders.volume}
                />
                <FieldWithLabel
                  label={t("columns.net_weight")}
                  name={detailedPickingOrders.net_weight}
                />
                <FieldWithLabel
                  label={t("columns.gross_weight")}
                  name={detailedPickingOrders.gross_weight}
                />
                <FieldWithLabel
                  label={t("columns.ordered_quantity")}
                  name={detailedPickingOrders.ordered_quantity}
                />

                <FieldWithLabel
                  label={t("columns.actual_quantity")}
                  name={detailedPickingOrders.actual_quantity}
                />
                <FieldWithLabel
                  label={t("columns.created_date")}
                  name={detailedPickingOrders.created_date}
                />
                <FieldWithLabel
                  label={t("columns.updated_date")}
                  name={detailedPickingOrders.updated_date}
                />
              </TabPanel>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.number")}
                  name={detailedPickingOrders.outbound.number}
                />
                <FieldWithLabel
                  label={t("columns.external_number")}
                  name={detailedPickingOrders.outbound.external_number}
                />

                <FieldWithLabel
                  label={t("columns.document_date")}
                  name={detailedPickingOrders.outbound.document_date}
                />
                <FieldWithLabel
                  label={t("columns.merchant_code")}
                  name={detailedPickingOrders.outbound.merchant_code}
                />
                <FieldWithLabel
                  label={t("columns.erp_warehouse")}
                  name={detailedPickingOrders.outbound.erp_warehouse}
                />
                <FieldWithLabel
                  label={t("columns.carrier_code")}
                  name={detailedPickingOrders.outbound.carrier_code}
                />
                <FieldWithLabel
                  label={t("columns.warehouse_id")}
                  name={detailedPickingOrders.outbound.warehouse_id}
                />
              </TabPanel>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.name")}
                  name={detailedPickingOrders.outbound.delivery.name}
                />
                <FieldWithLabel
                  label={t("columns.code")}
                  name={detailedPickingOrders.outbound.delivery.code}
                />
                <FieldWithLabel
                  label={t("columns.country_code")}
                  name={detailedPickingOrders.outbound.delivery.country_code}
                />

                <FieldWithLabel
                  label={t("columns.district")}
                  name={detailedPickingOrders.outbound.delivery.district}
                />
                <FieldWithLabel
                  label={t("columns.postal_code")}
                  name={detailedPickingOrders.outbound.delivery.postal_code}
                />
                <FieldWithLabel
                  label={t("columns.street")}
                  name={detailedPickingOrders.outbound.delivery.street}
                />
                <FieldWithLabel
                  label={t("columns.house_number")}
                  name={detailedPickingOrders.outbound.delivery.house_number}
                />
                <FieldWithLabel
                  label={t("columns.apartment_number")}
                  name={
                    detailedPickingOrders.outbound.delivery.apartment_number
                  }
                />
                <FieldWithLabel
                  label={t("columns.phone")}
                  name={detailedPickingOrders.outbound.delivery.phone}
                />
                <FieldWithLabel
                  label={t("columns.email")}
                  name={detailedPickingOrders.outbound.delivery.email}
                />
                <FieldWithLabel
                  label={t("columns.type")}
                  name={detailedPickingOrders.outbound.delivery.type}
                />
                <FieldWithLabel
                  label={t("columns.comment")}
                  name={detailedPickingOrders.outbound.delivery.comment}
                />
              </TabPanel>
              <TabPanel>
                <PickingOrderProducts />
              </TabPanel>
              <TabPanel>
                <ReservedProducts />
              </TabPanel>
              <TabPanel>
                <PickingTasks />
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
