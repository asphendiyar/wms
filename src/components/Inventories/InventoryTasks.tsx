import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { customStyles, customTheme, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  MoreButton,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled";
import CustomTable from "../Common/Table";
import i18n from "../../app/i18n";
import {
  InventoriesEnums,
  InventoryTasksTable,
} from "../../app/reducers/inventories/types";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { ReactSelectValues } from "../../app/commonTypes";
import { AiOutlineSearch } from "react-icons/ai";
import { LoadingIcon } from "../Common/LoadingIcon";
import {
  getAllInventoryTasksAction,
  getSearchAllInventoryTasksAction,
} from "../../app/reducers/inventories/action";
import {
  selectInventoryTasks,
  selectInventoryTasksList,
} from "../../app/reducers/inventories/selectors";

const tableColumns: Array<Column<InventoryTasksTable>> = [
  {
    Header: () => i18n.t("columns.inventory_id"),
    accessor: "inventory_id",
  },
  {
    Header: () => i18n.t("columns.cell"),
    accessor: "cell",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.interval_id"),
    accessor: "interval_id",
  },
];

export const InventoryTasks: React.FC = () => {
  const data = useAppSelector(selectInventoryTasksList);
  const { number, total_pages } = useAppSelector(selectInventoryTasks);

  const isInventoryTasksFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.getInventoryTasks)
  );
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, InventoriesEnums.getAllInventories)
  );
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("state");

  const [stateQuery, setStateQuery] = useState<string>(EmptyString);
  const [intervalQuery, setIntervalQuery] = useState<string>(EmptyString);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "state"
      ? setStateQuery(e.target.value)
      : setIntervalQuery(e.target.value);
    if (e.target.value.length === 0) {
      dispatch(getSearchAllInventoryTasksAction({ page: 1 }));
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllInventoryTasksAction({
          page: 1,
          interval_id: intervalQuery,
          state: stateQuery,
        })
      );
    }
  };

  const handleSearchClick = () => {
    dispatch(
      getSearchAllInventoryTasksAction({
        page: 1,
        state: stateQuery,
        interval_id: intervalQuery,
      })
    );
  };

  const handleClickMoreBtn = () => {
    dispatch(getAllInventoryTasksAction({ page: number + 1 }));
  };

  useEffect(() => {
    dispatch(getSearchAllInventoryTasksAction({ page: 1 }));
  }, [dispatch]);

  return (
    <>
      <PageTableOperations>
        <div className="filter-operations">
          <Select<ReactSelectValues>
            options={[
              { value: "state", label: `${t("columns.state")}` },
              { value: "interval_id", label: `${t("columns.interval_id")}` },
            ]}
            placeholder={t("placeholders.chooseFilter")}
            theme={customTheme}
            styles={customStyles({ width: 300 })}
            value={[
              { value: "state", label: `${t("columns.state")}` },
              { value: "interval_id", label: `${t("columns.interval_id")}` },
            ].find((item) => item.value === selectedFilterOption)}
            menuPosition={"fixed"}
            onChange={(value) => {
              typeof value?.value === "string" &&
                setSelectedFilterOption(value.value);
              setStateQuery(EmptyString);
              setIntervalQuery(EmptyString);
              dispatch(
                getSearchAllInventoryTasksAction({
                  page: 1,
                })
              );
            }}
            isSearchable={false}
          />
          <SearchInputWrapper>
            <StyledInput
              className={"styled-input"}
              name={"search"}
              placeholder={`${
                [
                  { value: "state", label: `${t("columns.state")}` },
                  {
                    value: "interval_id",
                    label: `${t("columns.interval_id")}`,
                  },
                ].find((item) => item.value === selectedFilterOption)?.label
              }`}
              type={"text"}
              value={
                selectedFilterOption === "interval_id"
                  ? intervalQuery
                  : stateQuery
              }
              onChange={handleChange}
              onKeyPress={handleSearchKeyDown}
            />
            <StyledIcon
              onClick={handleSearchClick}
              className={"search-input__icon"}
            >
              <AiOutlineSearch />
            </StyledIcon>
          </SearchInputWrapper>
        </div>
      </PageTableOperations>

      {isInventoryTasksFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<InventoryTasksTable>
              columns={tableColumns}
              data={data}
            />
          </TableWrapper>
          {total_pages !== number && data.length !== 0 && (
            <MoreButton onClick={handleClickMoreBtn}>
              {t("buttons.showMore")}
            </MoreButton>
          )}
        </>
      )}
    </>
  );
};
