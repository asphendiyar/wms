import React, { useEffect } from "react";
import { FieldWithLabel } from "../Common/DetailsComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import {
  InventoriesEnums,
  InventoriesContentType,
} from "../../app/reducers/inventories/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";
import {
  getDetailedInventoriesAction,
  getSearchAllInventoryTasksAction,
} from "../../app/reducers/inventories/action";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { DetailsWrapper } from "../Common/styled";
import { InventoryTasks } from "./InventoryTasks";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedInventories: InventoriesContentType | null = useAppSelector(
    (state: RootState) => state.inventories.detailedInventories
  );

  const isDetailedInventoriesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.getDetailedInventories)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, InventoriesEnums.getDetailedInventories)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedInventoriesAction(id?.toString() || EmptyString));
    dispatch(
      getSearchAllInventoryTasksAction({
        inventory_id: id?.toString() || EmptyString,
      })
    );
  }, [dispatch, id]);
  return (
    <>
      {isDetailedInventoriesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedInventories && (
          <DetailsWrapper>
            <Tabs>
              <TabList>
                <Tab>{t("tabs.general")}</Tab>
                <Tab>{t("tabs.inventoryTasks")}</Tab>
              </TabList>
              <TabPanel>
                <FieldWithLabel
                  label={t("columns.name")}
                  name={detailedInventories.name}
                />
                <FieldWithLabel
                  label={t("columns.state")}
                  name={detailedInventories.state}
                />
                <FieldWithLabel
                  label={t("columns.warehouse_id")}
                  name={detailedInventories.warehouse_id}
                />
                <FieldWithLabel
                  label={t("columns.created_date")}
                  name={detailedInventories.created_date}
                />
                <FieldWithLabel
                  label={t("columns.updated_date")}
                  name={detailedInventories.updated_date}
                />
              </TabPanel>
              <TabPanel>
                <InventoryTasks />
              </TabPanel>
            </Tabs>
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
