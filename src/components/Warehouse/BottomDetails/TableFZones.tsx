import React, { useMemo, useState } from "react"
import { Column } from "react-table"
import { EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import i18n from "../../../app/i18n"
import { setSelectedFZoneWarehouse } from "../../../app/reducers/warehouse"
import { WarehouseContentType } from "../../../app/reducers/warehouse/types"
import { RootState } from "../../../app/store"
import { DetailedCheckbox } from "../../Common/Checkbox/DetailedCheckBox"
import { TableWrapper } from "../../Common/styled"
import CustomTable from "../../Common/Table"

export interface FZoneTable {
  id: string
  state: string
  code: string
  name_kk: string
  name_ru: string
  name_en: string
  function: string
  picking_method: string
  replenishment_method: string
  max_picking_orders: string
  commodity_unit_disassembly_rule: string
  package_disassembly_rule: string
  is_save_without_commodity_unit: boolean
  is_save_comm_unit_same_level: boolean
  is_used_for_picking: boolean
  is_mezzanine: boolean
  packing_station_type: string
}

export const tableColumns: Array<Column<FZoneTable>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name_ru",
  },
  {
    Header: () => i18n.t("columns.function"),
    accessor: "function",
  },
  {
    Header: () => i18n.t("columns.picking_method"),
    accessor: "picking_method",
  },
  {
    Header: () => i18n.t("columns.replenishment_method"),
    accessor: "replenishment_method",
  },
  {
    Header: () => i18n.t("columns.max_picking_orders"),
    accessor: "max_picking_orders",
  },
  {
    Header: () => i18n.t("columns.commodity_unit_disassembly_rule"),
    accessor: "commodity_unit_disassembly_rule",
  },
  {
    Header: () => i18n.t("columns.package_disassembly_rule"),
    accessor: "package_disassembly_rule",
  },
  {
    Header: () => i18n.t("columns.is_save_without_commodity_unit"),
    accessor: "is_save_without_commodity_unit",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
  {
    Header: () => i18n.t("columns.is_save_comm_unit_same_level"),
    accessor: "is_save_comm_unit_same_level",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
  {
    Header: () => i18n.t("columns.is_used_for_picking"),
    accessor: "is_used_for_picking",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
]

const TableFZones: React.FC = () => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const data: FZoneTable[] = useMemo(
    (): FZoneTable[] =>
      detailedWarehouse
        ? detailedWarehouse.functional_zones.map((item) => ({
            ...item,
          }))
        : [],
    [detailedWarehouse]
  )

  const dispatch = useAppDispatch()

  const handleClickRow = (args: FZoneTable) => {
    dispatch(setSelectedFZoneWarehouse(args))
    setSelectedRow(args.code)
  }
  return (
    <TableWrapper>
      <CustomTable<FZoneTable>
        columns={tableColumns}
        data={data}
        handleClickRow={handleClickRow}
        selectedRowChecker="code"
        selectedRow={selectedRow}
      />
    </TableWrapper>
  )
}

export default TableFZones
