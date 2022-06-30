import React, { useEffect, useMemo } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FieldWithLabel } from "../Common/DetailsComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import {
  BackgroundTaskEnums,
  BackgroundTasksContentType,
  BackgroundTasksHistoryType,
} from "../../app/reducers/background-tasks/types";
import { DetailsWrapper, TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";
import { normalizeDate } from "../../app/helpers";
import { Column } from "react-table";
import { getDetailedBackgroundTasksAction } from "../../app/reducers/background-tasks/actions";
import { DetailPropTypes } from "../../app/commonTypes";
import { useTranslation } from "react-i18next";
import i18n from "../../app/i18n";

const tableColumns: Array<Column<BackgroundTasksHistoryType>> = [
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state",
  },
  {
    Header: () => i18n.t("columns.date"),
    accessor: "date",
    Cell: (row) => normalizeDate(row.value),
  },
];

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedBackgroundTasks: BackgroundTasksContentType | null =
    useAppSelector(
      (state: RootState) => state.backgroundTasks.detailedBackgroundTasks
    );

  const isDetailedBackgroundTasksFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      BackgroundTaskEnums.getDetailedBackgroundTasks
    )
  );

  const data: BackgroundTasksHistoryType[] = useMemo(
    (): BackgroundTasksHistoryType[] =>
      detailedBackgroundTasks?.history
        ? detailedBackgroundTasks.history.map((item) => ({
            ...item,
            created_date: normalizeDate(item.date),
          }))
        : [],
    [detailedBackgroundTasks]
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, BackgroundTaskEnums.getDetailedBackgroundTasks)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedBackgroundTasksAction(id || 0));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedBackgroundTasksFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedBackgroundTasks && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.history")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.name")}
                  name={detailedBackgroundTasks.name}
                />
                <FieldWithLabel
                  label={t("columns.state_title")}
                  name={detailedBackgroundTasks.state_title}
                />
                <FieldWithLabel
                  label={t("columns.type")}
                  name={detailedBackgroundTasks.type_title}
                />
                <FieldWithLabel
                  label={t("columns.manual_start")}
                  value={detailedBackgroundTasks.manual_start}
                />

                <FieldWithLabel
                  label={t("columns.period")}
                  name={detailedBackgroundTasks.period}
                />
                {detailedBackgroundTasks.last_run_at && (
                  <FieldWithLabel
                    label={t("columns.last_run_at")}
                    name={detailedBackgroundTasks.last_run_at}
                  />
                )}
                {detailedBackgroundTasks.next_run_at && (
                  <FieldWithLabel
                    label={t("columns.next_run_at")}
                    name={detailedBackgroundTasks.next_run_at}
                  />
                )}
                <FieldWithLabel
                  label={t("columns.error_email")}
                  name={detailedBackgroundTasks.notification.error_email}
                />
                <FieldWithLabel
                  label={t("columns.information_email")}
                  name={detailedBackgroundTasks.notification.information_email}
                />
                <FieldWithLabel
                  label={t("columns.warning_email")}
                  name={detailedBackgroundTasks.notification.warning_email}
                />
              </TabPanel>
              <TabPanel>
                <TableWrapper>
                  <CustomTable<BackgroundTasksHistoryType>
                    columns={tableColumns}
                    data={data}
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
