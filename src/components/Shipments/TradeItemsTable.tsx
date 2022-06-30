import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { Column } from "react-table";
import { EmptyString, normalizeDate } from "../../app/helpers";
import { useAppSelector } from "../../app/hooks";
import i18n from "../../app/i18n";
import { ShipmentsContentType } from "../../app/reducers/shipments/types";
import { RootState } from "../../app/store";
import IconButton from "../Common/Button/icon";
import {
  ActionGroupWrapper,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled";
import CustomTable from "../Common/Table";
import { TradeItemsTableData } from "../Outbound/DetailTradeItemsTable";

const tableColumns: Array<Column<TradeItemsTableData>> = [
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state",
  },
  {
    Header: () => i18n.t("columns.cell"),
    accessor: "cell",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
  {
    Header: () => i18n.t("columns.actual_volume"),
    accessor: "actual_volume",
  },
  {
    Header: () => i18n.t("columns.max_volume"),
    accessor: "max_volume",
  },
  {
    Header: () => i18n.t("columns.actual_weight"),
    accessor: "actual_weight",
  },
  {
    Header: () => i18n.t("columns.max_weight"),
    accessor: "max_weight",
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

const ShipmentsTradeItems: React.FC = () => {
  const detailedShipments: ShipmentsContentType | null = useAppSelector(
    (state: RootState) => state.shipments.detailedShipment
  );
  const [query, setQuery] = useState<string>(EmptyString);

  let data: TradeItemsTableData[] = useMemo(
    (): TradeItemsTableData[] =>
      detailedShipments?.tradeItems
        ? detailedShipments.tradeItems.map((item) => ({
            ...item,
            created_date: normalizeDate(item.created_date),
            updated_date: normalizeDate(item.updated_date),
          }))
        : [],
    [detailedShipments]
  );

  data = data.filter((item) =>
    item.barcode.toString().includes(query.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };

  const { t } = useTranslation();
  return (
    <>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByBarcode")}
            type={"text"}
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          <IconButton
            onClick={() => {}}
            popupText={t("buttons.close")}
          ></IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>
      <TableWrapper>
        <CustomTable<TradeItemsTableData>
          columns={tableColumns}
          data={data}
          selectedRow={EmptyString}
        />
      </TableWrapper>
    </>
  );
};

export default ShipmentsTradeItems;
