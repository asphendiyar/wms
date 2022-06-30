import React, { useMemo, useState } from "react"
import { Column } from "react-table"
import { EmptyString, normalizeDate } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import i18n from "../../../app/i18n"
import { setSelectedCommodityWarehouse } from "../../../app/reducers/warehouse"
import { WarehouseContentType } from "../../../app/reducers/warehouse/types"
import { RootState } from "../../../app/store"
import { TableWrapper } from "../../Common/styled"
import CustomTable from "../../Common/Table"

export interface WarehouseCommonDataTable {
  id: string
  code: string
  value: string
  address: string
  state: string
  state_title: string
  description: string
  created_date: string
  updated_date: string
}

export const tableColumns: Array<Column<WarehouseCommonDataTable>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.value"),
    accessor: "value",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description",
  },
  {
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
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
]

const TableCommodities: React.FC = () => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const data: WarehouseCommonDataTable[] = useMemo(
    (): WarehouseCommonDataTable[] =>
      detailedWarehouse
        ? detailedWarehouse.commodities.map((item) => ({
            ...item,
          }))
        : [],
    [detailedWarehouse]
  )

  const dispatch = useAppDispatch()
  const handleClickRow = (args: WarehouseCommonDataTable) => {
    dispatch(setSelectedCommodityWarehouse(args))
    setSelectedRow(args.code)
  }
  return (
    <TableWrapper>
      <CustomTable<WarehouseCommonDataTable>
        columns={tableColumns}
        data={data}
        handleClickRow={handleClickRow}
        selectedRowChecker="code"
        selectedRow={selectedRow}
      />
    </TableWrapper>
  )
}

export default TableCommodities
