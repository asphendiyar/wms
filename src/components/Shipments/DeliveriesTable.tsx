import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch } from "react-icons/ai"
import { Column } from "react-table"
import { EmptyString } from "../../app/helpers"
import { useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  ShipmentDeliveries,
  ShipmentsContentType,
} from "../../app/reducers/shipments/types"
import { RootState } from "../../app/store"
import {
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"

const tableColumns: Array<Column<ShipmentDeliveries>> = [
  {
    Header: () => i18n.t("columns.outbound_id"),
    accessor: "outbound_id",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.country_code"),
    accessor: "country_code",
  },
  {
    Header: () => i18n.t("columns.region"),
    accessor: "region",
  },
  {
    Header: () => i18n.t("columns.district"),
    accessor: "district",
  },
  {
    Header: () => i18n.t("columns.postal_code"),
    accessor: "postal_code",
  },
  {
    Header: () => i18n.t("columns.street"),
    accessor: "street",
  },
  {
    Header: () => i18n.t("columns.house_number"),
    accessor: "house_number",
  },
  {
    Header: () => i18n.t("columns.apartment_number"),
    accessor: "apartment_number",
  },
  {
    Header: () => i18n.t("columns.phone"),
    accessor: "phone",
  },
  {
    Header: () => i18n.t("columns.email"),
    accessor: "email",
  },
  {
    Header: () => i18n.t("columns.comment"),
    accessor: "comment",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.method"),
    accessor: "method",
  },
]

const ShipmentsDeliveries: React.FC = () => {
  const detailedShipment: ShipmentsContentType | null = useAppSelector(
    (state: RootState) => state.shipments.detailedShipment
  )
  const [query, setQuery] = useState<string>(EmptyString)

  let data: ShipmentDeliveries[] = useMemo(
    (): ShipmentDeliveries[] =>
      detailedShipment?.deliveries
        ? detailedShipment.deliveries.map((item) => ({
            ...item,
          }))
        : [],
    [detailedShipment]
  )

  data = data.filter((item) =>
    item.name.toString().includes(query.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }

  const { t } = useTranslation()
  return (
    <>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByName")}
            type={"text"}
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>
      </PageTableOperations>
      <TableWrapper>
        <CustomTable<ShipmentDeliveries>
          columns={tableColumns}
          data={data}
          selectedRowChecker={EmptyString}
        />
      </TableWrapper>
    </>
  )
}

export default ShipmentsDeliveries
