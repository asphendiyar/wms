import React, { Fragment, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Column } from "react-table"
import { appColors, EmptyString, normalizeDate } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { setSelectedProductCategory } from "../../app/reducers/product-catalog"
import {
  CategoryListType,
  SelectedProductCategoryType,
} from "../../app/reducers/product-catalog/types"
import { RootState } from "../../app/store"
import { Button } from "../Common/Button"
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox"
import {
  FormGroup,
  SearchInputWrapper,
  SearchWrapper,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"

interface CategoryTableData {
  id: number
  code: string
  name: string
  created_date: string
  updated_date: string
  has_child: boolean
}

const columns: Column<CategoryTableData>[] = [
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
    accessor: "name",
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
  {
    Header: () => i18n.t("columns.has_child"),
    accessor: "has_child",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
]

type ProductCategoryProps = {
  onClose: () => void
  levels: {
    levelOne: boolean
    levelTwo: boolean
    levelThree: boolean
    levelFour: boolean
    levelFive: boolean
  }
}
const ProductCategory: React.FC<ProductCategoryProps> = ({
  onClose,
  levels,
}) => {
  const [query, setQuery] = useState<string>(EmptyString)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)

  const productCategoryList: CategoryListType[] = useAppSelector(
    (state: RootState) => state.productCatalog.categoryList
  )
  const selectedProductCategory: SelectedProductCategoryType = useAppSelector(
    (state: RootState) => state.productCatalog.selectedProductCategory
  )

  let data: CategoryTableData[] = useMemo(
    (): CategoryTableData[] =>
      productCategoryList
        ? productCategoryList.map((item) => ({
            ...item,
            created_date: normalizeDate(item.created_date),
            updated_date: normalizeDate(item.updated_date),
          }))
        : [],
    [productCategoryList]
  )

  data = data.filter((item) =>
    item.code.toLowerCase().includes(query.toLowerCase())
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)

  const handleClickRow = (args: CategoryTableData) => {
    setSelectedRow(args.code)

    if (levels.levelOne) {
      dispatch(
        setSelectedProductCategory({
          ...selectedProductCategory,
          level_one: {
            code: args.code,
            id: args.id,
            has_child: args.has_child,
            name: args.name,
            created_date: args.created_date,
            updated_date: args.updated_date,
          },
        })
      )
    } else if (levels.levelTwo) {
      dispatch(
        setSelectedProductCategory({
          ...selectedProductCategory,
          level_two: {
            code: args.code,
            id: args.id,
            has_child: args.has_child,
            name: args.name,
            created_date: args.created_date,
            updated_date: args.updated_date,
          },
        })
      )
    } else if (levels.levelThree) {
      dispatch(
        setSelectedProductCategory({
          ...selectedProductCategory,
          level_three: {
            code: args.code,
            id: args.id,
            has_child: args.has_child,
            name: args.name,
            created_date: args.created_date,
            updated_date: args.updated_date,
          },
        })
      )
    } else if (levels.levelFour) {
      dispatch(
        setSelectedProductCategory({
          ...selectedProductCategory,
          level_four: {
            code: args.code,
            id: args.id,
            has_child: args.has_child,
            name: args.name,
            created_date: args.created_date,
            updated_date: args.updated_date,
          },
        })
      )
    } else if (levels.levelFive) {
      dispatch(
        setSelectedProductCategory({
          ...selectedProductCategory,
          level_five: {
            code: args.code,
            id: args.id,
            has_child: args.has_child,
            name: args.name,
            created_date: args.created_date,
            updated_date: args.updated_date,
          },
        })
      )
    }
  }

  return (
    <Fragment>
      <SearchWrapper>
        <SearchInputWrapper>
          <StyledInput
            name="search"
            placeholder={t("placeholders.searchByCode")}
            type="text"
            value={query}
            onChange={handleChange}
          />
        </SearchInputWrapper>
      </SearchWrapper>
      <br />
      <TableWrapper>
        <CustomTable<CategoryTableData>
          columns={columns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker="code"
          selectedRow={selectedRow || EmptyString}
        />
      </TableWrapper>
      <br />
      <div>
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
            colors={{ bgColor: appColors.primary, textColor: appColors.white }}
            type={"button"}
            onClick={onClose}
            disabled={selectedRow.length ? false : true}
          >
            <span className="btn-text">Сохрaнить</span>
          </Button>
        </FormGroup>
      </div>
    </Fragment>
  )
}

export default ProductCategory
