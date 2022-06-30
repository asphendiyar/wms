import React, { useMemo, useState } from "react"
import { EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setSelectedErpWarehouse } from "../../../app/reducers/erp-warehouses"
import { ErpWarehousesContentType } from "../../../app/reducers/erp-warehouses/types"
import { WarehouseContentType } from "../../../app/reducers/warehouse/types"
import { RootState } from "../../../app/store"
import { TableWrapper } from "../../Common/styled"
import CustomTable from "../../Common/Table"
import { tableColumns } from "../../ErpWarehouses/ErpWarehouse"

const TableErpWarehouses: React.FC = () => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const data: ErpWarehousesContentType[] = useMemo(
    (): ErpWarehousesContentType[] =>
      detailedWarehouse
        ? detailedWarehouse.erp_warehouse.map((item) => ({
            ...item,
          }))
        : [],
    [detailedWarehouse]
  )

  const dispatch = useAppDispatch()

  const handleClickRow = (args: ErpWarehousesContentType) => {
    dispatch(setSelectedErpWarehouse(args))
    setSelectedRow(args.code)
  }
  return (
    <TableWrapper>
      <CustomTable<ErpWarehousesContentType>
        columns={tableColumns}
        data={data}
        handleClickRow={handleClickRow}
        selectedRowChecker="code"
        selectedRow={selectedRow}
      />
    </TableWrapper>
  )
}

export default TableErpWarehouses
