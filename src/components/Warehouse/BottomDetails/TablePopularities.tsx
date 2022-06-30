import React, { useMemo, useState } from "react"
import { EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setSelectedPopularityWarehouse } from "../../../app/reducers/warehouse"
import { WarehouseContentType } from "../../../app/reducers/warehouse/types"
import { RootState } from "../../../app/store"
import { TableWrapper } from "../../Common/styled"
import CustomTable from "../../Common/Table"
import { tableColumns, WarehouseCommonDataTable } from "./TableCommodities"

const TablePopularities: React.FC = () => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const data: WarehouseCommonDataTable[] = useMemo(
    (): WarehouseCommonDataTable[] =>
      detailedWarehouse
        ? detailedWarehouse.popularities.map((item) => ({
            ...item,
          }))
        : [],
    [detailedWarehouse]
  )

  const dispatch = useAppDispatch()
  const handleClickRow = (args: WarehouseCommonDataTable) => {
    dispatch(setSelectedPopularityWarehouse(args))
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

export default TablePopularities
