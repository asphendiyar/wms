import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import { RiFileExcel2Line } from "react-icons/ri"
import Select from "react-select"
import { ReactSelectValues } from "../../../app/commonTypes"
import {
  appColors,
  checkPrivilege,
  customStyles,
  customTheme,
  EmptyString,
  randomNumberIdGenerator,
} from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  setGetCategoryTreeList,
  setSelectedProductCategory,
} from "../../../app/reducers/product-catalog"
import {
  getAllProductCatalogAction,
  getDetailedProductCatalogAction,
  getSearchAllProductCatalogAction,
} from "../../../app/reducers/product-catalog/actions"
import {
  selectProductCatalog,
  selectProductCatalogList,
} from "../../../app/reducers/product-catalog/selectors"
import { ProductCatalogEnums } from "../../../app/reducers/product-catalog/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../../app/reducers/requests"
import { ReactComponent as DetailsIcon } from "../../../assets/icons/info.svg"
import Alert, { AlertListItem } from "../../Common/Alert"
import IconButton from "../../Common/Button/icon"
import { LoadingIcon } from "../../Common/LoadingIcon"
import Modal from "../../Common/Modal"
import {
  ActionGroupWrapper,
  MoreButton,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../../Common/styled"
import CustomTable from "../../Common/Table"
import Details from "../Details"
import { ProductForm } from "../ProductForm"
import { tableColumns } from "./columns"

export interface ProductTableData {
  id: number
  barcodes: string
  code_sticky: string
  created_date: string
  state: string
  state_title: string
  updated_date: string
  description_sticky: string
  is_suitable: boolean
  type: string
  kit_type: string
  kit_type_title: string
  processing_type: string
  processing_type_title: string
  rotation: string
  rotation_title: string
  measure_unit: string
  image_url: string
  note: string
  popularity_code: string
  commodity_code: string
  measure_state: string
  measure_state_title: string
  accuracy_of_production_date: string
  accuracy_of_production_date_title: string
  is_track_expiration_date: boolean
  is_print_expiration_date: boolean
  accuracy_of_expiration_date: string
  accuracy_of_expiration_date_title: string
  expiration_date: string
  min_expiration_date_for_inbound: number
  min_expiration_date_for_outbound: number
  min_count_in_picking: string
  max_count_in_picking: string
  type_of_trade_item: string
  equipment_type: string
  account_serial_number: string
  account_serial_number_title: string
  count_serial_number: number
  net_weight: number
  gross_weight: number
  length: number
  width: number
  height: number
  volume: number
  cell_height: number
}

const Products: React.FC<{
  category_id?: string
}> = ({ category_id }) => {
  const isProductDetailsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductCatalogEnums.getDetailedProduct)
  )
  const data = useAppSelector(selectProductCatalogList)

  const { total_pages, number } = useAppSelector(selectProductCatalog)

  const isFetchingPostProductCatalog = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductCatalogEnums.postProductCatalog)
  )
  const fetchErrorPostProductCatalog = useAppSelector((state) =>
    namedRequestError(state, ProductCatalogEnums.postProductCatalog)
  )
  const isFetchingPutProductCatalog = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductCatalogEnums.putProductCatalog)
  )
  const fetchErrorPutProductCatalog = useAppSelector((state) =>
    namedRequestError(state, ProductCatalogEnums.putProductCatalog)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<string>(EmptyString)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("code")
  const [codeQuery, setCodeQuery] = useState<string>(EmptyString)
  const [descriptionQuery, setDescriptionQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleCloseFormModal = () => {
    setModal(false)
    if (
      isFetchingPostProductCatalog === "success" ||
      isFetchingPutProductCatalog === "success"
    ) {
      dispatch(
        getSearchAllProductCatalogAction({ page: 1, category_id: category_id })
      )
    }
    dispatch(
      setSelectedProductCategory({
        level_five: null,
        level_four: null,
        level_three: null,
        level_two: null,
        level_one: null,
      })
    )
    dispatch(setGetCategoryTreeList([]))
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getAllProductCatalogAction({
        page: number + 1,
        description: descriptionQuery,
        code: codeQuery,
        category_id: category_id,
      })
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "code"
      ? setCodeQuery(e.target.value.toLowerCase())
      : setDescriptionQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllProductCatalogAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllProductCatalogAction({
          code: codeQuery,
          description: descriptionQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllProductCatalogAction({
        code: codeQuery,
        description: descriptionQuery,
      })
    )
  }

  const handleClickRow = (args: ProductTableData) => {
    setSelectedProduct(args.code_sticky)
  }

  useEffect(() => {
    if (isFetchingPostProductCatalog === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ProductCatalogEnums.postProductCatalog))
          },
        },
      ])
      handleCloseFormModal()
    } else if (isFetchingPostProductCatalog === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostProductCatalog?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ProductCatalogEnums.postProductCatalog))
          },
        },
      ])
    if (isFetchingPutProductCatalog === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ProductCatalogEnums.putProductCatalog))
          },
        },
      ])
      handleCloseFormModal()
    } else if (isFetchingPutProductCatalog === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutProductCatalog?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ProductCatalogEnums.putProductCatalog))
          },
        },
      ])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostProductCatalog,
    fetchErrorPutProductCatalog,
    isFetchingPostProductCatalog,
    isFetchingPutProductCatalog,
  ])

  useEffect(() => {
    category_id
      ? dispatch(
          getSearchAllProductCatalogAction({
            category_id: category_id,
            page: 1,
          })
        )
      : dispatch(
          getSearchAllProductCatalogAction({
            page: 1,
          })
        )
  }, [dispatch, category_id])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <Modal
        open={modal}
        title={editMode ? t("buttons.edit") : t("buttons.new")}
        onClose={handleCloseFormModal}
        className="side"
      >
        {isProductDetailsFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <ProductForm
            editMode={editMode}
            onClose={handleCloseFormModal}
            code={selectedProduct}
          />
        )}
      </Modal>
      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details code={selectedProduct} />
      </Modal>
      <PageTableOperations>
        <div className={"filter-operations"}>
          <Select<ReactSelectValues>
            options={[
              {
                value: "code",
                label: `${t("columns.code")}`,
              },
              {
                value: "description",
                label: `${t("columns.description")}`,
              },
            ]}
            placeholder="Выберите фильтр"
            theme={customTheme}
            styles={customStyles({ width: 300 })}
            value={[
              {
                value: "code",
                label: `${t("columns.code")}`,
              },
              {
                value: "description",
                label: `${t("columns.description")}`,
              },
            ].find((item) => item.value === selectedFilterOption)}
            menuPosition="fixed"
            onChange={(value) => {
              typeof value?.value === "string" &&
                setSelectedFilterOption(value.value)
              setDescriptionQuery(EmptyString)
              setCodeQuery(EmptyString)
              dispatch(
                getSearchAllProductCatalogAction({
                  page: 1,
                })
              )
            }}
            isSearchable={false}
          />
          <SearchInputWrapper>
            <StyledInput
              className="styled-input"
              name="search"
              placeholder={`${
                [
                  {
                    value: "code",
                    label: `${t("columns.code")}`,
                  },
                  {
                    value: "description",
                    label: `${t("columns.description")}`,
                  },
                ].find((item) => item.value === selectedFilterOption)?.label
              }`}
              type={"text"}
              value={
                selectedFilterOption === "code" ? codeQuery : descriptionQuery
              }
              onChange={handleChange}
              onKeyPress={handleSearchKeyDown}
            />
            <StyledIcon
              onClick={handleSearchClick}
              className="search-input__icon"
            >
              <AiOutlineSearch />
            </StyledIcon>
          </SearchInputWrapper>
        </div>

        <ActionGroupWrapper>
          {checkPrivilege("Sku", "Browse") && (
            <IconButton
              onClick={() => {
                if (selectedProduct) {
                  setDetailModal(true)
                } else {
                  setAlertList([
                    ...alertList,
                    {
                      id: randomNumberIdGenerator(),
                      title: t("alerts.warning"),
                      message: t("alerts.warningMessage"),
                      icon: AiOutlineWarning,
                      bgColor: appColors.warning,
                    },
                  ])
                }
              }}
              popupText={t("buttons.details")}
            >
              <DetailsIcon />
            </IconButton>
          )}
          {checkPrivilege("Sku", "Create") && (
            <IconButton
              onClick={() => {
                setModal(true)
                setEditMode(false)
              }}
              popupText={t("buttons.new")}
            >
              <AiOutlinePlus />
            </IconButton>
          )}
          {checkPrivilege("Sku", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedProduct) {
                  setEditMode(true)
                  setModal(true)
                  dispatch(getDetailedProductCatalogAction(selectedProduct))
                } else {
                  setAlertList([
                    ...alertList,
                    {
                      id: randomNumberIdGenerator(),
                      title: t("alerts.warning"),
                      message: t("alerts.warningMessage"),
                      icon: AiOutlineWarning,
                      bgColor: appColors.warning,
                    },
                  ])
                }
              }}
              popupText={t("buttons.edit")}
            >
              <AiOutlineEdit />
            </IconButton>
          )}

          <IconButton onClick={() => null} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      <TableWrapper height="calc(100vh - 234px)">
        <CustomTable<ProductTableData>
          columns={tableColumns}
          data={data}
          handleClickRow={handleClickRow}
          selectedRowChecker="code"
          selectedRow={selectedProduct}
          columnIndex={1}
          rowStateChecker={"state"}
          rowStateCheckerValue={"not_ready"}
        />
      </TableWrapper>
      {total_pages !== number && data.length !== 0 && (
        <MoreButton onClick={handleClickMoreBtn}>
          {t("buttons.showMore")}
        </MoreButton>
      )}
    </>
  )
}
export default Products
