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
import { Column } from "react-table"
import {
  appColors,
  checkPrivilege,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  getAllTradeItemsAction,
  getDetailedTradeItemsAction,
} from "../../app/reducers/trade-items/actions"
import { selectTradeItemsList } from "../../app/reducers/trade-items/selectors"
import {
  TradeItemEnums,
  TradeItemsTableData,
} from "../../app/reducers/trade-items/types"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { LoadingIcon } from "../Common/LoadingIcon"
import Modal from "../Common/Modal"
import {
  ActionGroupWrapper,
  PageTableOperations,
  SearchInputWrapper,
  StyledIcon,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"
import { TradeItemsForm } from "./TradeItemsForm"

export const tableColumns: Array<Column<TradeItemsTableData>> = [
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type_sticky",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code_sticky",
  },
  {
    Header: () => i18n.t("columns.value"),
    accessor: "value",
  },
  {
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description",
  },
  {
    Header: () => i18n.t("columns.length"),
    accessor: "length",
  },
  {
    Header: () => i18n.t("columns.width"),
    accessor: "width",
  },
  {
    Header: () => i18n.t("columns.height"),
    accessor: "height",
  },
  {
    Header: () => i18n.t("columns.max_volume"),
    accessor: "max_volume",
  },
  {
    Header: () => i18n.t("columns.max_weight"),
    accessor: "max_weight",
  },
  {
    Header: () => i18n.t("columns.content"),
    accessor: "content",
  },
]

const TradeItem: React.FC = () => {
  const isTradeItemsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, TradeItemEnums.getAllTradeItems)
  )
  const isDetailedTradeItemsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, TradeItemEnums.getDetailedTradeItems)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, TradeItemEnums.getAllTradeItems)
  )
  const isFetchingPostTradeItem = useAppSelector((state) =>
    namedRequestsInProgress(state, TradeItemEnums.postTradeItems)
  )
  const fetchErrorPostTradeItem = useAppSelector((state) =>
    namedRequestError(state, TradeItemEnums.postTradeItems)
  )
  const isFetchingPutTradeItem = useAppSelector((state) =>
    namedRequestsInProgress(state, TradeItemEnums.putTradeItems)
  )
  const fetchErrorPutTradeItem = useAppSelector((state) =>
    namedRequestError(state, TradeItemEnums.putTradeItems)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [query, setQuery] = useState<string>(EmptyString)

  let data = useAppSelector(selectTradeItemsList)

  data = data.filter((item) =>
    item.type.toLowerCase().includes(query.toLowerCase())
  )

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }
  const handleClickRow = (args: TradeItemsTableData) => {
    setSelectedRow(args.code_sticky)
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostTradeItem === "success" ||
      isFetchingPutTradeItem === "success"
    ) {
      dispatch(getAllTradeItemsAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostTradeItem === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(TradeItemEnums.postTradeItems))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutTradeItem === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(TradeItemEnums.putTradeItems))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostTradeItem === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostTradeItem?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(TradeItemEnums.postTradeItems))
          },
        },
      ])
    if (isFetchingPutTradeItem === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutTradeItem?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(TradeItemEnums.putTradeItems))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostTradeItem,
    fetchErrorPutTradeItem,
    isFetchingPostTradeItem,
    isFetchingPutTradeItem,
  ])
  useEffect(() => {
    dispatch(getAllTradeItemsAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <Modal
        open={createModal}
        title={`${!editMode ? t("buttons.new") : t("buttons.edit")}`}
        onClose={handleCloseFormModal}
        className={"side"}
      >
        {isDetailedTradeItemsFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <TradeItemsForm onClose={handleCloseFormModal} editMode={editMode} />
        )}
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByType")}
            type={"text"}
            value={query}
            onChange={handleChange}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
          {checkPrivilege("PackTypebrw", "Create") && (
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
          {checkPrivilege("PackTypebrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedTradeItemsAction(selectedRow))
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

      {isTradeItemsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<TradeItemsTableData>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"code"}
              columnIndex={1}
            />
          </TableWrapper>
        </>
      )}
    </>
  )
}

export default TradeItem
