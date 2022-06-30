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
  ShipmentEnums,
  ShipmentsContentType,
} from "../../app/reducers/shipments/types";
import ShipmentsDeliveries from "./DeliveriesTable";
import ShipmentsProducts from "./ProductsTable";
import ShipmentsOutbouds from "./OutboundsTable";
import { DetailsWrapper } from "../Common/styled";
import { EmptyString } from "../../app/helpers";
import { DetailPropTypes } from "../../app/commonTypes";
import { getDetailedShipmentAction } from "../../app/reducers/shipments/actions";
import { useTranslation } from "react-i18next";
import ShipmentsTradeItems from "./TradeItemsTable";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedShipment: ShipmentsContentType | null = useAppSelector(
    (state: RootState) => state.shipments.detailedShipment
  );

  const isDetailedShipmentFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.getDetailedShipments)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, ShipmentEnums.getDetailedShipments)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedShipmentAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedShipmentFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedShipment && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.date")}</Tab>
                <Tab>{t("tabs.transport")}</Tab>
                <Tab>{t("tabs.outboundPoint")}</Tab>
                <Tab>{t("tabs.outboundProducts")}</Tab>
                <Tab>{t("tabs.outboundTE")}</Tab>
                <Tab>{t("tabs.outbounds")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.id")}
                  name={detailedShipment.id}
                />
                <FieldWithLabel
                  label={t("columns.warehouse_id")}
                  name={detailedShipment.warehouse_id}
                />
                <FieldWithLabel
                  label={t("columns.state")}
                  name={detailedShipment.state_title}
                />
                <FieldWithLabel
                  label={t("columns.functional_zone")}
                  name={detailedShipment.functional_zone}
                />
                <FieldWithLabel
                  label={t("columns.ramp")}
                  name={detailedShipment.ramp}
                />
                <FieldWithLabel
                  label={t("columns.is_picking_allowed")}
                  value={detailedShipment.is_picking_allowed}
                />
                <FieldWithLabel
                  label={t("columns.note")}
                  name={detailedShipment.note}
                />
                <FieldWithLabel
                  label={t("columns.periodic_reservation_code")}
                  name={detailedShipment.periodic_reservation_code}
                />
                <FieldWithLabel
                  label={t("columns.weight")}
                  name={detailedShipment.weight}
                />
              </TabPanel>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.date")}
                  name={detailedShipment.date}
                />
                <FieldWithLabel
                  label={t("columns.started_date")}
                  name={detailedShipment.started_date}
                />
                <FieldWithLabel
                  label={t("columns.end_date")}
                  name={detailedShipment.end_date}
                />
                <FieldWithLabel
                  label={t("columns.created_date")}
                  name={detailedShipment.created_date}
                />
                <FieldWithLabel
                  label={t("columns.updated_date")}
                  name={detailedShipment.updated_date}
                />
              </TabPanel>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.plate_number")}
                  name={detailedShipment.plate_number}
                />
                <FieldWithLabel
                  label={t("columns.carrier")}
                  name={detailedShipment.carrier}
                />
                <FieldWithLabel
                  label={t("columns.carrier_code")}
                  name={detailedShipment.carrier_code}
                />
              </TabPanel>
              <TabPanel>
                <ShipmentsDeliveries />
              </TabPanel>
              <TabPanel>
                <ShipmentsProducts />
              </TabPanel>
              <TabPanel>
                <ShipmentsTradeItems />
              </TabPanel>
              <TabPanel>
                <ShipmentsOutbouds />
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
