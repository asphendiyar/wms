import { useFormik } from "formik"
import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineSearch } from "react-icons/ai"
import Select from "react-select"
import { Column } from "react-table"
import { FormPropTypes, ReactSelectValues } from "../../../app/commonTypes"
import {
  appColors,
  customStyles,
  customTheme,
  EmptyString,
} from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import i18n from "../../../app/i18n"
import { namedRequestsInProgress } from "../../../app/reducers/requests"
import {
  postPopularityWarehouseAction,
  putPopularityWarehouseAction,
} from "../../../app/reducers/warehouse/actions"
import {
  WarehouseContentType,
  WarehouseECPType,
  WarehouseEnums,
} from "../../../app/reducers/warehouse/types"
import { RootState } from "../../../app/store"
import { Button } from "../../Common/Button"
import { InputWithLabel } from "../../Common/Input"
import {
  FormGroup,
  SearchInputWrapper,
  SearchWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../../Common/styled"
import CustomTable from "../../Common/Table"

export interface WarehouseCommonDataTable {
  id: string
  code: string
  value: string
  address: string
  state: string
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
    Header: () => i18n.t("columns.address"),
    accessor: "address",
  },
  {
    Header: "Статус",
    accessor: "state",
  },
]

export const CreatePopularityForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )
  const selectedPopularity: WarehouseECPType | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedPopularity
  )

  const isFetchingPostPopularities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postPopularityWarehouse)
  )
  const isFetchingPutPopularities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putPopularityWarehouse)
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const statusOptions: ReactSelectValues[] = [
    { value: "active", label: "Активный" },
    { value: "disabled", label: "Отключен" },
  ]

  const allPopularities: WarehouseECPType[] = useAppSelector(
    (state: RootState) => state.warehouse.getPopularity
  )
  const [query, setQuery] = useState<string>(EmptyString)

  let data: WarehouseCommonDataTable[] = useMemo(
    (): WarehouseCommonDataTable[] =>
      allPopularities
        ? allPopularities.map((item) => ({
            ...item,
          }))
        : [],
    [allPopularities]
  )

  data = data.filter((item) =>
    item.description.toLowerCase().includes(query.toLowerCase())
  )
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: WarehouseCommonDataTable) => {
    setSelectedRow(args.code)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)

  const formik = useFormik({
    initialValues:
      editMode && selectedPopularity
        ? {
            state: EmptyString,
          }
        : {
            code: EmptyString,
          },
    onSubmit: (args) => {
      editMode && selectedPopularity
        ? dispatch(
            putPopularityWarehouseAction({
              id: detailedWarehouse?.id,
              data: { state: args.state },
              code: selectedPopularity.code,
            })
          )
        : dispatch(
            postPopularityWarehouseAction({
              id: detailedWarehouse?.id,
              data: { code: selectedRow },
            })
          )
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {editMode ? (
          <div>
            <FormGroup>
              <InputWithLabel
                id="code"
                name="code"
                type="text"
                label={t("columns.code")}
                value={selectedPopularity?.code || EmptyString}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id="value"
                name="value"
                type="text"
                label={t("columns.value")}
                value={selectedPopularity?.value || EmptyString}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id="description"
                name="description"
                type="text"
                label={t("columns.description")}
                value={selectedPopularity?.description || EmptyString}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id="created_date"
                name="created_date"
                type="text"
                label={t("columns.created_date")}
                value={selectedPopularity?.created_date || t("alerts.noData")}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id="code"
                name="code"
                type="text"
                label={t("columns.updated_date")}
                value={selectedPopularity?.updated_date || t("alerts.noData")}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <Select<ReactSelectValues>
              className="selectWrapper"
              options={statusOptions}
              placeholder="Выберите статус"
              theme={customTheme}
              styles={customStyles()}
              menuPosition="fixed"
              onChange={(i) => {
                formik.setFieldValue("state", i?.value)
              }}
              value={statusOptions.find(
                (item) => item.value === formik.values.state
              )}
              isSearchable={false}
            />
          </div>
        ) : (
          <div>
            <SearchWrapper>
              <p>Выберите зону популярности</p>
              <SearchInputWrapper>
                <StyledInput
                  className="styleForBorder"
                  name="search"
                  placeholder={t("placeholders.searchByDesc")}
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
              <CustomTable<WarehouseCommonDataTable>
                columns={tableColumns}
                data={data}
                handleClickRow={handleClickRow}
                selectedRowChecker="code"
                selectedRow={selectedRow}
              />
            </TableWrapper>
          </div>
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
            type="submit"
          >
            <span className="btn-text">
              {isFetchingPostPopularities === "pending" ||
              isFetchingPutPopularities === "pending"
                ? t("buttons.wait")
                : editMode
                ? t("buttons.save")
                : t("buttons.add")}
            </span>
          </Button>
        </FormGroup>
      </form>
    </>
  )
}
