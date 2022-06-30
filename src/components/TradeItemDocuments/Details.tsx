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
  TradeItemDocumentEnums,
  TradeItemDocumentsContentType,
} from "../../app/reducers/trade-item-documents/types";
import { DetailsWrapper } from "../Common/styled";
import TradeItemDocumentsProductTable from "./ProductsTable";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { getDetailedTradeItemDocumentsAction } from "../../app/reducers/trade-item-documents/actions";
import { useTranslation } from "react-i18next";
export const Details: React.FC<DetailPropTypes> = ({ code }) => {
  const detailedTradeItemDocuments: TradeItemDocumentsContentType | null =
    useAppSelector(
      (state: RootState) => state.tradeItemDocuments.detailedTradeItemDocuments
    );

  const isDetailedTradeItemDocumentsFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      TradeItemDocumentEnums.getDetailedTradeItemDocuments
    )
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(
      state,
      TradeItemDocumentEnums.getDetailedTradeItemDocuments
    )
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedTradeItemDocumentsAction(code || EmptyString));
  }, [dispatch, code]);
  return (
    <>
      {isDetailedTradeItemDocumentsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedTradeItemDocuments && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.outboundProducts")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.type")}
                  name={detailedTradeItemDocuments.type}
                />
                <FieldWithLabel
                  label={t("columns.barcode")}
                  name={detailedTradeItemDocuments.barcode}
                />
                <FieldWithLabel
                  label={t("columns.state")}
                  name={detailedTradeItemDocuments.state}
                />
                <FieldWithLabel
                  label={t("columns.cell")}
                  name={detailedTradeItemDocuments.cell}
                />
                <FieldWithLabel
                  label={t("columns.erp_warehouse")}
                  name={detailedTradeItemDocuments.erp_warehouse}
                />
                <FieldWithLabel
                  label={t("columns.warehouse_id")}
                  name={detailedTradeItemDocuments.warehouse_id}
                />
                <FieldWithLabel
                  label={t("columns.actual_volume")}
                  name={detailedTradeItemDocuments.actual_volume}
                />
                <FieldWithLabel
                  label={t("columns.max_volume")}
                  name={detailedTradeItemDocuments.max_volume}
                />
                <FieldWithLabel
                  label={t("columns.actual_weight")}
                  name={detailedTradeItemDocuments.actual_weight}
                />
                <FieldWithLabel
                  label={t("columns.max_weight")}
                  name={detailedTradeItemDocuments.max_weight}
                />
              </TabPanel>
              <TabPanel>
                <TradeItemDocumentsProductTable />
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
