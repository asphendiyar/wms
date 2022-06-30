import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch } from "react-icons/ai"
import { Column } from "react-table"
import { appColors, EmptyString } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { setSelectedRampsInbound } from "../../app/reducers/inbound"
import { getAllRampsInboundAction } from "../../app/reducers/inbound/actions"
import { InboundEnums } from "../../app/reducers/inbound/types"
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { RampsContentType } from "../../app/reducers/warehouse/types"
import { RootState } from "../../app/store"
import { Button } from "../Common/Button"
import { LoadingIcon } from "../Common/LoadingIcon"
import {
  FormGroup,
  SearchInputWrapper,
  SearchWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"

export interface RampsTableData {
  code: string
  value: string
}

export const tableColumns: Array<Column<RampsTableData>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.value"),
    accessor: "value",
  },
]

export const RampsInboundForm: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const isRampsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.getAllRampsInbound)
  )

  const allRamps: RampsContentType[] = useAppSelector(
    (state: RootState) => state.inbound.allRampsInbound.content
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, InboundEnums.getAllRampsInbound)
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const [query, setQuery] = useState<string>(EmptyString)

  let data: RampsTableData[] = useMemo(
    (): RampsTableData[] =>
      allRamps
        ? allRamps.map((item) => ({
            ...item,
          }))
        : [],
    [allRamps]
  )

  data = data.filter((item) =>
    item.code.toLowerCase().includes(query.toLowerCase())
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: RampsContentType) => {
    setSelectedRow(args.code)
    dispatch(setSelectedRampsInbound(args))
  }

  useEffect(() => {
    dispatch(getAllRampsInboundAction(null))
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)

  return (
    <>
      {isRampsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <SearchWrapper>
            <p>Выберите запись (-си)</p>
            <SearchInputWrapper>
              <StyledInput
                className="styleForBorder"
                name="search"
                placeholder={t("placeholders.searchByCode")}
                type="text"
                value={query}
                onChange={handleChange}
              />
              <StyledIcon className="search-category">
                <AiOutlineSearch />
              </StyledIcon>
            </SearchInputWrapper>
          </SearchWrapper>
          <TableWrapper>
            <CustomTable<RampsTableData>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRowChecker="code"
              selectedRow={selectedRow}
            />
          </TableWrapper>
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
          onClick={onClose}
          disabled={!selectedRow.length}
        >
          <span className="btn-text">Сохранить</span>
        </Button>
      </FormGroup>
    </>
  )
}
