import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { appColors, EmptyString } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { patchOutboundAttachAction } from "../../app/reducers/outbound/actions"
import { OutboundsTableData } from "../../app/reducers/outbound/types"
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  getAllShipmentsAction,
  getSearchAllShipmentsAction,
} from "../../app/reducers/shipments/actions"
import {
  selectShipments,
  selectShipmentsList,
} from "../../app/reducers/shipments/selectors"
import {
  ShipmentEnums,
  ShipmentsContentType,
} from "../../app/reducers/shipments/types"
import { RootState } from "../../app/store"
import { Button } from "../Common/Button"
import { LoadingIcon } from "../Common/LoadingIcon"
import {
  FormGroup,
  MoreButton,
  SearchInputWrapper,
  SearchWrapper,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"
import { tableColumns } from "../Shipments/Shipment"

export const ShipmentsOutboundForm: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const isShipmentsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.getAllShipments)
  )

  const data = useAppSelector(selectShipmentsList)
  const { total_pages, number } = useAppSelector(selectShipments)

  const selectedOutbound: OutboundsTableData | null = useAppSelector(
    (state: RootState) => state.outbound.selectedOutbound
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, ShipmentEnums.getAllShipments)
  )

  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const [query, setQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: ShipmentsContentType) => {
    setSelectedRow(args.id)
  }

  const handleSubmit = () => {
    dispatch(
      patchOutboundAttachAction({
        id: selectedOutbound?.id.toString(),
        shipment_id: selectedRow?.toString(),
      })
    )
  }
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllShipmentsAction({
          page: 1,
          warehouse_id: query,
        })
      )
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllShipmentsAction({ page: 1 }))
    }
  }
  const handleClickMoreBtn = () => {
    dispatch(getAllShipmentsAction({ page: number + 1, warehouse_id: query }))
  }

  useEffect(() => {
    dispatch(getAllShipmentsAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <SearchWrapper>
        <p>Выберите запись (-си)</p>

        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByWarehouseID")}
            type={"number"}
            value={query}
            onChange={handleChange}
            onKeyPress={handleSearchKeyDown}
          />
        </SearchInputWrapper>
      </SearchWrapper>

      {isShipmentsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<ShipmentsContentType>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"id"}
            />
          </TableWrapper>
          {total_pages !== number && data.length !== 0 && (
            <MoreButton onClick={handleClickMoreBtn}>
              {t("buttons.showMore")}
            </MoreButton>
          )}
        </>
      )}
      <FormGroup className="form-btns d-flex">
        <Button
          colors={{
            bgColor: appColors.silver,
            textColor: appColors.black,
          }}
          onClick={onClose}
          type="button"
        >
          <span className="btn-text">{t("buttons.cancel")}</span>
        </Button>
        <Button
          colors={{
            bgColor: appColors.primary,
            textColor: appColors.white,
          }}
          type="button"
          onClick={handleSubmit}
          disabled={!selectedRow?.toString().length}
        >
          <span className="btn-text">{t("buttons.add")}</span>
        </Button>
      </FormGroup>
    </>
  )
}
