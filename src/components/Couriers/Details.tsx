import React, { useEffect, useMemo } from "react";
import { FieldWithLabel } from "../Common/DetailsComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import {
  CourierEnums,
  CouriersContentType,
  CouriersConfigurationsTable,
} from "../../app/reducers/couriers/types";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { DetailsWrapper, TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";
import { EmptyString, normalizeDate } from "../../app/helpers";
import { Column } from "react-table";
import { DetailPropTypes } from "../../app/commonTypes";
import { getDetailedCouriersAction } from "../../app/reducers/couriers/actions";
import { useTranslation } from "react-i18next";
import i18n from "../../app/i18n";

const tableColumns: Array<Column<CouriersConfigurationsTable>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.url"),
    accessor: "url",
  },
  {
    Header: () => i18n.t("columns.username"),
    accessor: "username",
  },
  {
    Header: () => i18n.t("columns.password"),
    accessor: "password",
  },
  {
    Header: () => i18n.t("columns.created_date"),
    accessor: "created_date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.updated_date"),
    accessor: "updated_date",
    Cell: (row) => normalizeDate(row.value),
  },
];

export const Details: React.FC<DetailPropTypes> = ({ code }) => {
  const detailedCouriers: CouriersContentType | null = useAppSelector(
    (state: RootState) => state.couriers.detailedCouriers
  );

  const isDetailedCouriersFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.getDetailedCouriers)
  );

  const data: CouriersConfigurationsTable[] = useMemo(
    (): CouriersConfigurationsTable[] =>
      detailedCouriers?.configurations
        ? detailedCouriers.configurations.map((item) => ({
            ...item,
            created_date: normalizeDate(item.created_date),
            updated_date: normalizeDate(item.updated_date),
          }))
        : [],
    [detailedCouriers]
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, CourierEnums.getDetailedCouriers)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedCouriersAction(code || EmptyString));
  }, [dispatch, code]);

  return (
    <>
      {isDetailedCouriersFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedCouriers && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.configurations")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.id")}
                  name={detailedCouriers.id}
                />
                <FieldWithLabel
                  label={t("columns.state_title")}
                  name={detailedCouriers.state_title}
                />
                <FieldWithLabel
                  label={t("columns.code")}
                  name={detailedCouriers.code}
                />
                <FieldWithLabel
                  label={t("columns.create_manifest")}
                  name={detailedCouriers.create_manifest}
                />
                <FieldWithLabel
                  label={t("columns.create_parcel")}
                  name={detailedCouriers.create_parcel}
                />
                <FieldWithLabel
                  label={t("columns.barcode_parcel")}
                  name={detailedCouriers.barcode_parcel}
                />
                <FieldWithLabel
                  label={t("columns.create_service")}
                  name={detailedCouriers.create_service}
                />
                <FieldWithLabel
                  label={t("columns.created_date")}
                  name={detailedCouriers.created_date}
                />
                <FieldWithLabel
                  label={t("columns.updated_date")}
                  name={detailedCouriers.updated_date}
                />
              </TabPanel>
              <TabPanel>
                <TableWrapper>
                  <CustomTable<CouriersConfigurationsTable>
                    columns={tableColumns}
                    data={data}
                    selectedRow={EmptyString}
                  />
                </TableWrapper>
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
