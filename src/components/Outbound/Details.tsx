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
  OutboundContentType,
  OutboundEnums,
} from "../../app/reducers/outbound/types";
import OutboundProducts from "./DetailProductTable";
import OutboundTradeItems from "./DetailTradeItemsTable";
import { DetailsWrapper } from "../Common/styled";
import { DetailPropTypes } from "../../app/commonTypes";
import { getOneOutboundsAction } from "../../app/reducers/outbound/actions";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedOutbound: OutboundContentType | null = useAppSelector(
    (state: RootState) => state.outbound.outbound
  );

  const isDetailedOutboundFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, OutboundEnums.getOneOutbound)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, OutboundEnums.getOneOutbound)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOneOutboundsAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedOutboundFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedOutbound && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.detailsDelivery")}</Tab>
                <Tab>{t("tabs.outboundProducts")}</Tab>
                <Tab>{t("tabs.outboundTE")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.number")}
                  name={detailedOutbound.number}
                />
                <FieldWithLabel
                  label={t("columns.external_number")}
                  name={detailedOutbound.external_number}
                />
                <FieldWithLabel
                  label={t("columns.state")}
                  name={detailedOutbound.state_title}
                />
                <FieldWithLabel
                  label={t("columns.document_date")}
                  name={detailedOutbound.document_date}
                />
                <FieldWithLabel
                  label={t("columns.merchant_code")}
                  name={detailedOutbound.merchant_code}
                />
                <FieldWithLabel
                  label={t("columns.creation_source")}
                  name={detailedOutbound.creation_source}
                />
                <FieldWithLabel
                  label={t("columns.erp_warehouse")}
                  name={detailedOutbound.erp_warehouse}
                />
                <FieldWithLabel
                  label={t("columns.carrier_code")}
                  name={detailedOutbound.carrier_code}
                />
                <FieldWithLabel
                  label={t("columns.warehouse_id")}
                  name={detailedOutbound.warehouse_id}
                />
                <FieldWithLabel
                  label={t("columns.complete_percentage")}
                  percentage={detailedOutbound.complete_percentage}
                />
              </TabPanel>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.name")}
                  name={detailedOutbound.delivery.name}
                />
                <FieldWithLabel
                  label={t("columns.code")}
                  name={detailedOutbound.delivery.code}
                />
                <FieldWithLabel
                  label={t("columns.country_code")}
                  name={detailedOutbound.delivery.country_code}
                />
                <FieldWithLabel
                  label={t("columns.region")}
                  name={detailedOutbound.delivery.region}
                />
                <FieldWithLabel
                  label={t("columns.district")}
                  name={detailedOutbound.delivery.district}
                />
                <FieldWithLabel
                  label={t("columns.postal_code")}
                  name={detailedOutbound.delivery.postal_code}
                />
                <FieldWithLabel
                  label={t("columns.street")}
                  name={detailedOutbound.delivery.street}
                />
                <FieldWithLabel
                  label={t("columns.house_number")}
                  name={detailedOutbound.delivery.house_number}
                />
                <FieldWithLabel
                  label={t("columns.apartment_number")}
                  name={detailedOutbound.delivery.apartment_number}
                />
                <FieldWithLabel
                  label={t("columns.phone")}
                  name={detailedOutbound.delivery.phone}
                />
                <FieldWithLabel
                  label={t("columns.email")}
                  name={detailedOutbound.delivery.email}
                />
                <FieldWithLabel
                  label={t("columns.type")}
                  name={detailedOutbound.delivery.type}
                />
                <FieldWithLabel
                  label={t("columns.comment")}
                  name={detailedOutbound.delivery.comment}
                />
              </TabPanel>
              <TabPanel>
                <OutboundProducts />
              </TabPanel>
              <TabPanel>
                <OutboundTradeItems />
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
