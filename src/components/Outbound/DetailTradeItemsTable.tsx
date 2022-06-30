import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { Column } from "react-table";
import { EmptyString, normalizeDate } from "../../app/helpers";
import { useAppSelector } from "../../app/hooks";
import i18n from "../../app/i18n";
import { OutboundContentType } from "../../app/reducers/outbound/types";
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

export interface TradeItemsTableData {
  state: string;
  state_title: string;
  barcode: string;
  cell: string;
  erp_warehouse: string;
  actual_volume: number;
  max_volume: number;
  actual_weight: number;
  max_weight: number;
  created_date: string;
  updated_date: string;
}

const tableColumns: Array<Column<TradeItemsTableData>> = [
  {
    Header: () => i18n.t("columns.barcode"),
    accessor: "barcode",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
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

const OutboundTradeItems: React.FC = () => {
  const detailedOutbound: OutboundContentType | null = useAppSelector(
    (state: RootState) => state.outbound.outbound
  );
  const [query, setQuery] = useState<string>(EmptyString);

  let data: TradeItemsTableData[] = useMemo(
    (): TradeItemsTableData[] =>
      detailedOutbound?.tradeItems
        ? detailedOutbound.tradeItems.map((item) => ({
            ...item,
            created_date: normalizeDate(item.created_date),
            updated_date: normalizeDate(item.updated_date),
          }))
        : [],
    [detailedOutbound]
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
            className="styled-input"
            name="search"
            placeholder={t("placeholders.searchByBarcode")}
            type="text"
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className="search-input__icon">
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          <IconButton onClick={() => {}} popupText={t("buttons.close")} />
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

export default OutboundTradeItems;
