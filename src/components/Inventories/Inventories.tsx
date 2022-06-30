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
import { VscDebugRestart } from "react-icons/vsc"
import Select from "react-select"
import { Column } from "react-table"
import { ReactSelectValues } from "../../app/commonTypes"
import {
  appColors,
  checkPrivilege,
  customStyles,
  customTheme,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllInventoriesAction,
  getDetailedInventoriesAction,
  getSearchAllInventoriesAction,
  patchRestartInventoriesAction,
} from "../../app/reducers/inventories/action"

import {
  selectInventories,
  selectInventoriesList,
} from "../../app/reducers/inventories/selectors"
import {
  InventoriesContentType,
  InventoriesEnums,
} from "../../app/reducers/inventories/types"
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
import ModalConfirmModal from "../Common/Modal/ConfirmModal"
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
import { InventoriesForm } from "./InventoriesForm"

export const tableColumns: Array<Column<InventoriesContentType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.region"),
    accessor: "region",
  },
  {
    Header: () => i18n.t("columns.row"),
    accessor: "row",
  },
  {
    Header: () => i18n.t("columns.interval"),
    accessor: "interval",
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

const Inventories: React.FC = () => {
  const data = useAppSelector(selectInventoriesList)
  const { number, total_pages } = useAppSelector(selectInventories)

  const isInventoriesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.getAllInventories)
  )
  const isDetailedInventoriesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.getDetailedInventories)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, InventoriesEnums.getAllInventories)
  )
  const isFetchingPostInventories = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.postInventories)
  )
  const fetchErrorPostInventories = useAppSelector((state) =>
    namedRequestError(state, InventoriesEnums.postInventories)
  )
  const isFetchingPutInventories = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.putInventories)
  )
  const fetchErrorPutInventories = useAppSelector((state) =>
    namedRequestError(state, InventoriesEnums.putInventories)
  )

  const [patchRestartModal, setPatchRestartModal] = useState<boolean>(false)
  const [patchStatusModal, setPatchStatusModal] = useState<boolean>(false)

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("state")

  const [stateQuery, setStateQuery] = useState<string>(EmptyString)
  const [warehouseQuery, setWarehouseQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: InventoriesContentType) => {
    setSelectedRow(args.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "state"
      ? setStateQuery(e.target.value)
      : setWarehouseQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllInventoriesAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllInventoriesAction({
          page: 1,
          warehouse_id: warehouseQuery,
          state: stateQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllInventoriesAction({
        page: 1,
        state: stateQuery,
        warehouse_id: warehouseQuery,
      })
    )
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllInventoriesAction({ page: number + 1 }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostInventories === "success" ||
      isFetchingPutInventories === "success"
    ) {
      dispatch(getSearchAllInventoriesAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostInventories === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(InventoriesEnums.postInventories))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutInventories === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(InventoriesEnums.putInventories))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostInventories === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostInventories?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(InventoriesEnums.postInventories))
          },
        },
      ])
    if (isFetchingPutInventories === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutInventories?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(InventoriesEnums.putInventories))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostInventories,
    fetchErrorPutInventories,
    isFetchingPostInventories,
    isFetchingPutInventories,
  ])

  useEffect(() => {
    dispatch(getSearchAllInventoriesAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <ModalConfirmModal
        headerText={t("buttons.restart") + "?"}
        message={t("confirmations.close")}
        opened={patchRestartModal}
        onAllClose={() =>
          dispatch(
            patchRestartInventoriesAction(
              selectedRow?.toString() || EmptyString
            )
          )
        }
        onClose={() => setPatchRestartModal(false)}
      />

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
        {isDetailedInventoriesFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <InventoriesForm onClose={handleCloseFormModal} editMode={editMode} />
        )}
      </Modal>
      <PageTableOperations>
        <div className="filter-operations">
          <Select<ReactSelectValues>
            options={[
              { value: "state", label: `${t("columns.state")}` },
              { value: "warehouse_id", label: `${t("columns.warehouse_id")}` },
            ]}
            placeholder={t("placeholders.chooseFilter")}
            theme={customTheme}
            styles={customStyles({ width: 300 })}
            value={[
              { value: "state", label: `${t("columns.state")}` },
              { value: "warehouse_id", label: `${t("columns.warehouse_id")}` },
            ].find((item) => item.value === selectedFilterOption)}
            menuPosition={"fixed"}
            onChange={(value) => {
              typeof value?.value === "string" &&
                setSelectedFilterOption(value.value)
              setStateQuery(EmptyString)
              setWarehouseQuery(EmptyString)
              dispatch(
                getSearchAllInventoriesAction({
                  page: 1,
                })
              )
            }}
            isSearchable={false}
          />
          <SearchInputWrapper>
            <StyledInput
              className={"styled-input"}
              name={"search"}
              placeholder={`${
                [
                  { value: "state", label: `${t("columns.state")}` },
                  {
                    value: "warehouse_id",
                    label: `${t("columns.warehouse_id")}`,
                  },
                ].find((item) => item.value === selectedFilterOption)?.label
              }`}
              type={"text"}
              value={
                selectedFilterOption === "warehouse_id"
                  ? warehouseQuery
                  : stateQuery
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
          {checkPrivilege("InventoryLocationTreeBrw", "Browse") && (
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
          {checkPrivilege("InventoryLocationTreeBrw", "Create") && (
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
          {checkPrivilege("InventoryLocationTreeBrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedInventoriesAction(selectedRow.toString()))
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

          <IconButton
            onClick={() => {
              selectedRow
                ? setPatchRestartModal(true)
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
            popupText={t("buttons.restart")}
          >
            <VscDebugRestart />
          </IconButton>
          <IconButton onClick={() => null} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      {isInventoriesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<InventoriesContentType>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"id"}
              columnIndex={2}
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

export default Inventories
