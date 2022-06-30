import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch, AiOutlineWarning } from "react-icons/ai"
import { Column } from "react-table"
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { patchDeattachFromShipmentsAction } from "../../app/reducers/shipments/actions"
import {
  ShipmentOutbounds,
  ShipmentsContentType,
} from "../../app/reducers/shipments/types"
import { RootState } from "../../app/store"
import { ReactComponent as DeattachIcon } from "../../assets/icons/deattach.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import ModalConfirmModal from "../Common/Modal/ConfirmModal"
import {
  ActionGroupWrapper,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"

const tableColumns: Array<Column<ShipmentOutbounds>> = [
  {
    Header: () => i18n.t("columns.number"),
    accessor: "number",
  },
  {
    Header: () => i18n.t("columns.external_number"),
    accessor: "external_number",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.document_date"),
    accessor: "document_date",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.erp_warehouse"),
    accessor: "erp_warehouse",
  },
  {
    Header: () => i18n.t("columns.merchant_code"),
    accessor: "merchant_code",
  },
  {
    Header: () => i18n.t("columns.carrier_code"),
    accessor: "carrier_code",
  },
  {
    Header: () => i18n.t("columns.creation_source"),
    accessor: "creation_source",
  },
]

const ShipmentsOutbouds: React.FC = () => {
  const detailedShipment: ShipmentsContentType | null = useAppSelector(
    (state: RootState) => state.shipments.detailedShipment
  )
  const [query, setQuery] = useState<string>(EmptyString)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [deattachModal, setDeattachModal] = useState<boolean>(false)

  let data: ShipmentOutbounds[] = useMemo(
    (): ShipmentOutbounds[] =>
      detailedShipment?.outbounds
        ? detailedShipment.outbounds.map((item) => ({
            ...item,
          }))
        : [],
    [detailedShipment]
  )

  data = data.filter((item) =>
    item.warehouse_id.toString().includes(query.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  const handleClickRow = (args: ShipmentOutbounds) => {
    setSelectedRow(args.type)
  }

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <ModalConfirmModal
        headerText={t("buttons.close") + "?"}
        message={t("confirmations.close")}
        opened={deattachModal}
        onAllClose={() =>
          dispatch(
            patchDeattachFromShipmentsAction({
              shipment_id: detailedShipment?.id.toString(),
              id: selectedRow,
            })
          )
        }
        onClose={() => setDeattachModal(false)}
      />
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByWarehouseID")}
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
            onClick={() => {
              selectedRow
                ? setDeattachModal(true)
                : setAlertList([
                    ...alertList,
                    {
                      id: randomNumberIdGenerator(),
                      title: t("alerts.warning"),
                      message: t("alerts.warningMessage"),
                      icon: AiOutlineWarning,
                      bgColor: appColors.warning,
                    },
                  ])
            }}
            popupText={t("buttons.deattachFromShipment")}
          >
            <DeattachIcon />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>
      <TableWrapper>
        <CustomTable<ShipmentOutbounds>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker={"type"}
          selectedRow={selectedRow || EmptyString}
        />
      </TableWrapper>
    </>
  )
}

export default ShipmentsOutbouds
