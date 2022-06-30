import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  InboundContentType,
  InboundEnums,
} from "../../app/reducers/inbound/types";
import { RootState } from "../../app/store";
import { DetailsWrapper } from "../Common/styled";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FieldWithLabel } from "../Common/DetailsComponent";
import InboundProducts from "./ProductsTable";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import { getOneInboundAction } from "../../app/reducers/inbound/actions";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";

export const InboundDetails: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedInbound: InboundContentType | null = useAppSelector(
    (state: RootState) => state.inbound.inbound
  );

  const isDetailedShipmentFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.getOneInbound)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, InboundEnums.getOneInbound)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOneInboundAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedShipmentFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedInbound && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.inboundProducts")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.id")}
                  name={detailedInbound.id}
                />
                <FieldWithLabel
                  label={t("columns.state")}
                  name={detailedInbound.state}
                />
                <FieldWithLabel
                  label={t("columns.inboundNumber")}
                  name={detailedInbound.number}
                />
                <FieldWithLabel
                  label={t("columns.external_number")}
                  name={detailedInbound.external_number}
                />
                <FieldWithLabel
                  label={t("columns.warehouse_id")}
                  name={detailedInbound.warehouse_id}
                />
                <FieldWithLabel
                  label={t("columns.number_of_lines")}
                  name={detailedInbound.number_of_lines}
                />
                <FieldWithLabel
                  label={t("columns.accepted_lines")}
                  name={detailedInbound.accepted_lines}
                />
                <FieldWithLabel
                  label={t("columns.document_date")}
                  name={detailedInbound.document_date}
                />
                <FieldWithLabel
                  label={t("columns.erp_warehouse")}
                  name={detailedInbound.erp_warehouse}
                />
                <FieldWithLabel
                  label={t("columns.merchant_id")}
                  name={detailedInbound.merchant_id}
                />
                <FieldWithLabel
                  label={t("columns.merchant")}
                  name={detailedInbound.merchant}
                />
                <FieldWithLabel
                  label={t("columns.merchant_code")}
                  name={detailedInbound.merchant_code}
                />
                <FieldWithLabel
                  label={t("columns.type")}
                  name={detailedInbound.type}
                />
                <FieldWithLabel
                  label={t("columns.creation_source")}
                  name={detailedInbound.creation_source}
                />
              </TabPanel>
              <TabPanel>
                <InboundProducts />
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default InboundDetails;
