import React, { useMemo, useState } from "react"
import { Column } from "react-table"
import { EmptyString, normalizeDate } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import i18n from "../../../app/i18n"
import { setSelectedAdressWarehouse } from "../../../app/reducers/warehouse"
import { WarehouseContentType } from "../../../app/reducers/warehouse/types"
import { RootState } from "../../../app/store"
import { DetailedCheckbox } from "../../Common/Checkbox/DetailedCheckBox"
import { TableWrapper } from "../../Common/styled"
import CustomTable from "../../Common/Table"

export interface AddressesTable {
  id: number
  name: string
  postal_code: string
  city: string
  address: string
  address_additional: string
  contact_person: string
  phone_number: string
  email: string
  is_primary: boolean
  created_date: string
  updated_date: string
}

const tableColumns: Array<Column<AddressesTable>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.postal_code"),
    accessor: "postal_code",
  },
  {
    Header: () => i18n.t("columns.city"),
    accessor: "city",
  },
  {
    Header: () => i18n.t("columns.address"),
    accessor: "address",
  },
  {
    Header: () => i18n.t("columns.address_additional"),
    accessor: "address_additional",
  },
  {
    Header: () => i18n.t("columns.contact_person"),
    accessor: "contact_person",
  },
  {
    Header: () => i18n.t("columns.phone_number"),
    accessor: "phone_number",
  },
  {
    Header: () => i18n.t("columns.email"),
    accessor: "email",
  },
  {
    Header: () => i18n.t("columns.is_primary"),
    accessor: "is_primary",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
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

const TableAddresses: React.FC = () => {
  const dispatch = useAppDispatch()
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const data: AddressesTable[] = useMemo(
    (): AddressesTable[] =>
      detailedWarehouse
        ? detailedWarehouse.addresses.map((item) => ({
            ...item,
          }))
        : [],
    [detailedWarehouse]
  )

  const handleClickRow = (args: AddressesTable) => {
    dispatch(setSelectedAdressWarehouse(args))
    setSelectedRow(args.name)
  }

  return (
    <TableWrapper>
      <CustomTable<AddressesTable>
        columns={tableColumns}
        data={data}
        handleClickRow={handleClickRow}
        selectedRowChecker="name"
        selectedRow={selectedRow}
      />
    </TableWrapper>
  )
}

export default TableAddresses
