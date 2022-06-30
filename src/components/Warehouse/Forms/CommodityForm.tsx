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
  postCommodityWarehouseAction,
  putCommodityWarehouseAction,
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
    Header: () => i18n.t("columns.state"),
    accessor: "state",
  },
]

export const CreateCommodityForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  )
  const allCommodity: WarehouseECPType[] = useAppSelector(
    (state: RootState) => state.warehouse.getCommodity
  )
  const selectedCommodity: WarehouseECPType | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedCommodity
  )

  const isFetchingPostCommodities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postCommodityWarehouse)
  )

  const isFetchingPutCommodities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putCommodityWarehouse)
  )
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const statusOptions: ReactSelectValues[] = [
    { value: "active", label: "Активный" },
    { value: "disabled", label: "Отключен" },
  ]

  const [query, setQuery] = useState<string>(EmptyString)

  let data: WarehouseCommonDataTable[] = useMemo(
    (): WarehouseCommonDataTable[] =>
      allCommodity
        ? allCommodity.map((item) => ({
            ...item,
          }))
        : [],
    [allCommodity]
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
      editMode && selectedCommodity
        ? {
            state: selectedCommodity.state,
          }
        : {
            code: EmptyString,
          },
    onSubmit: (values) => {
      editMode && selectedCommodity
        ? dispatch(
            putCommodityWarehouseAction({
              id: detailedWarehouse?.id,
              data: { state: values.state },
              code: selectedCommodity.code,
            })
          )
        : dispatch(
            postCommodityWarehouseAction({
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
                value={selectedCommodity?.code || EmptyString}
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
                value={selectedCommodity?.value || EmptyString}
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
                value={selectedCommodity?.description || EmptyString}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id="created_date"
                name="created_date"
                type="text"
                label={t("columns.updated_date")}
                value={selectedCommodity?.created_date || t("alerts.noData")}
                onChange={() => null}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id="updated_date"
                name="updated_date"
                type="text"
                label={t("columns.updated_date")}
                value={selectedCommodity?.updated_date || t("alerts.noData")}
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
              <p>Выберите зону хранения</p>
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
              {isFetchingPostCommodities === "pending" ||
              isFetchingPutCommodities === "pending"
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
