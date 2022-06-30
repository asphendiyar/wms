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
import { Column } from "react-table"
import { ReactSelectValues } from "../../app/commonTypes"
import {
  appColors,
  checkPrivilege,
  customStyles,
  customTheme,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllErpWarehousesAction,
  getDetailedErpWarehousesAction,
  getSearchAllErpWarehousesAction,
} from "../../app/reducers/erp-warehouses/actions"
import {
  selectErpWarehouses,
  selectErpWarehousesList,
} from "../../app/reducers/erp-warehouses/selectors"
import {
  ErpWarehouseEnums,
  ErpWarehousesContentType,
} from "../../app/reducers/erp-warehouses/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { LoadingIcon } from "../Common/LoadingIcon"
import Modal from "../Common/Modal"
import {
  ActionGroupWrapper,
  MoreButton,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"
import Details from "./Details"
import { ErpWarehouseForm } from "./ErpWarehouseForm"

export const tableColumns: Array<Column<ErpWarehousesContentType>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
]

const ErpWarehouse: React.FC = () => {
  const data = useAppSelector(selectErpWarehousesList)
  const { total_pages, number } = useAppSelector(selectErpWarehouses)

  const isERPwarehouseFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.getAllErpWarehouses)
  )
  const isDetailedERPwarehouseFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.getDetailedErpWarehouses)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, ErpWarehouseEnums.getAllErpWarehouses)
  )

  const isFetchingPostErpWarehouse = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.postErpWarehouses)
  )
  const fetchErrorPostErpWarehouse = useAppSelector((state) =>
    namedRequestError(state, ErpWarehouseEnums.postErpWarehouses)
  )
  const isFetchingPutErpWarehouse = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.putErpWarehouses)
  )
  const fetchErrorPutErpWarehouse = useAppSelector((state) =>
    namedRequestError(state, ErpWarehouseEnums.putErpWarehouses)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("code")

  const [warehouseQuery, setWarehouseQuery] = useState<string>(EmptyString)
  const [codeQuery, setCodeQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: ErpWarehousesContentType) => {
    setSelectedRow(args.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "code"
      ? setCodeQuery(e.target.value)
      : setWarehouseQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllErpWarehousesAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllErpWarehousesAction({
          page: 1,
          warehouse_id: warehouseQuery,
          code: codeQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllErpWarehousesAction({
        page: 1,
        warehouse_id: warehouseQuery,
        code: codeQuery,
      })
    )
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getAllErpWarehousesAction({
        page: number + 1,
        warehouse_id: warehouseQuery,
        code: codeQuery,
      })
    )
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostErpWarehouse === "success" ||
      isFetchingPutErpWarehouse === "success"
    ) {
      dispatch(getSearchAllErpWarehousesAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostErpWarehouse === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.postErpWarehouses))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutErpWarehouse === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.putErpWarehouses))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostErpWarehouse === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostErpWarehouse?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.postErpWarehouses))
          },
        },
      ])
    if (isFetchingPutErpWarehouse === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutErpWarehouse?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.putErpWarehouses))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostErpWarehouse,
    fetchErrorPutErpWarehouse,
    isFetchingPostErpWarehouse,
    isFetchingPutErpWarehouse,
  ])
  useEffect(() => {
    dispatch(getSearchAllErpWarehousesAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />

      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className={"side"}
      >
        <Details id={selectedRow || 0} />
      </Modal>
      <Modal
        open={createModal}
        title={`${!editMode ? t("buttons.new") : t("buttons.edit")}`}
        onClose={handleCloseFormModal}
        className={"side"}
      >
        {isDetailedERPwarehouseFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <ErpWarehouseForm
            onClose={handleCloseFormModal}
            editMode={editMode}
          />
        )}
      </Modal>
      <PageTableOperations>
        <div className="filter-operations">
          <Select<ReactSelectValues>
            options={[
              { value: "code", label: `${t("columns.code")}` },
              { value: "warehouse_id", label: `${t("columns.warehouse_id")}` },
            ]}
            placeholder={t("placeholders.chooseFilter")}
            theme={customTheme}
            styles={customStyles({ width: 300 })}
            value={[
              { value: "code", label: `${t("columns.code")}` },
              { value: "warehouse_id", label: `${t("columns.warehouse_id")}` },
            ].find((item) => item.value === selectedFilterOption)}
            menuPosition={"fixed"}
            onChange={(value) => {
              typeof value?.value === "string" &&
                setSelectedFilterOption(value.value)
              dispatch(getSearchAllErpWarehousesAction({ page: 1 }))
              setCodeQuery(EmptyString)
              setWarehouseQuery(EmptyString)
            }}
            isSearchable={false}
          />
          <SearchInputWrapper>
            <StyledInput
              className={"styled-input"}
              name={"search"}
              placeholder={` ${
                [
                  { value: "code", label: `${t("columns.code")}` },
                  {
                    value: "warehouse_id",
                    label: `${t("columns.warehouse_id")}`,
                  },
                ].find((item) => item.value === selectedFilterOption)?.label
              }`}
              type={selectedFilterOption === "warehouse_id" ? "number" : "text"}
              value={
                selectedFilterOption === "code" ? codeQuery : warehouseQuery
              }
              onChange={handleChange}
              onKeyPress={handleSearchKeyDown}
            />
            <StyledIcon
              onClick={handleSearchClick}
              className={"search-input__icon"}
            >
              <AiOutlineSearch />
            </StyledIcon>
          </SearchInputWrapper>
        </div>

        <ActionGroupWrapper>
          {checkPrivilege("Erpwarehousesbrw", "Browse") && (
            <IconButton
              onClick={() => {
                selectedRow
                  ? setDetailModal(true)
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
              popupText={t("buttons.details")}
            >
              <DetailsIcon />
            </IconButton>
          )}
          {checkPrivilege("Erpwarehousesbrw", "Create") && (
            <IconButton
              onClick={() => {
                setCreateModal(true)
                setEditMode(false)
              }}
              popupText={t("buttons.new")}
            >
              <AiOutlinePlus />
            </IconButton>
          )}
          {checkPrivilege("Erpwarehousesbrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(
                    getDetailedErpWarehousesAction(selectedRow.toString())
                  )
                  setCreateModal(true)
                  setEditMode(true)
                } else
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

      {isERPwarehouseFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<ErpWarehousesContentType>
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
    </>
  )
}

export default ErpWarehouse
