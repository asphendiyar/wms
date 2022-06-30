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
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllPopularitiesAction,
  getDetailedPopularitiesAction,
  getSearchAllPopularitiesAction,
} from "../../app/reducers/popularities/actions"
import {
  selectPopularities,
  selectPopularitiesList,
} from "../../app/reducers/popularities/selectors"
import {
  PopularitiesContentType,
  PopularityEnums,
} from "../../app/reducers/popularities/types"
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
import { PopularitiesForm } from "./PopularitiesForm"

export const tableColumns: Array<Column<PopularitiesContentType>> = [
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
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
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

const Popularity: React.FC = () => {
  const isPopularitiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PopularityEnums.getAllPopularities)
  )
  const isDetailedPopularitiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PopularityEnums.getDetailedPopularities)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PopularityEnums.getAllPopularities)
  )

  const isFetchingPostPopularity = useAppSelector((state) =>
    namedRequestsInProgress(state, PopularityEnums.postPopularities)
  )
  const fetchErrorPostPopularity = useAppSelector((state) =>
    namedRequestError(state, PopularityEnums.postPopularities)
  )
  const isFetchingPutPopularity = useAppSelector((state) =>
    namedRequestsInProgress(state, PopularityEnums.putPopularities)
  )
  const fetchErrorPutPopularity = useAppSelector((state) =>
    namedRequestError(state, PopularityEnums.putPopularities)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [query, setQuery] = useState<string>(EmptyString)
  const [detailsModal, setDetailModal] = useState<boolean>(false)

  const data = useAppSelector(selectPopularitiesList)
  const { number, total_pages } = useAppSelector(selectPopularities)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllPopularitiesAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllPopularitiesAction({
          page: 1,
          warehouse_id: query,
        })
      )
    }
  }

  const handleClickRow = (args: PopularitiesContentType) => {
    setSelectedRow(args.code)
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getAllPopularitiesAction({ page: number + 1, warehouse_id: query })
    )
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostPopularity === "success" ||
      isFetchingPutPopularity === "success"
    ) {
      dispatch(getSearchAllPopularitiesAction({ page: 1 }))
    }
  }

  useEffect(() => {
    if (isFetchingPostPopularity === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PopularityEnums.postPopularities))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutPopularity === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PopularityEnums.putPopularities))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostPopularity === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostPopularity?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PopularityEnums.postPopularities))
          },
        },
      ])
    if (isFetchingPutPopularity === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutPopularity?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PopularityEnums.putPopularities))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostPopularity,
    fetchErrorPutPopularity,
    isFetchingPostPopularity,
    isFetchingPutPopularity,
  ])

  useEffect(() => {
    dispatch(getSearchAllPopularitiesAction({ page: 1 }))
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
        {isDetailedPopularitiesFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <PopularitiesForm
            onClose={handleCloseFormModal}
            editMode={editMode}
          />
        )}
      </Modal>
      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details code={selectedRow} />
      </Modal>
      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className={"styled-input"}
            name={"search"}
            placeholder={t("placeholders.searchByWarehouseID")}
            type={"text"}
            value={query}
            onChange={handleChange}
            onKeyPress={handleSearchKeyDown}
          />
          <StyledIcon className={"search-input__icon"}>
            <AiOutlineSearch />
          </StyledIcon>
        </SearchInputWrapper>

        <ActionGroupWrapper>
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
          <IconButton
            onClick={() => {
              setCreateModal(true)
              setEditMode(false)
            }}
            popupText={t("buttons.new")}
          >
            <AiOutlinePlus />
          </IconButton>
          <IconButton
            onClick={() => {
              if (selectedRow) {
                dispatch(getDetailedPopularitiesAction(selectedRow))
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
          <IconButton onClick={() => null} popupText={t("buttons.export")}>
            <RiFileExcel2Line />
          </IconButton>
        </ActionGroupWrapper>
      </PageTableOperations>

      {isPopularitiesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<PopularitiesContentType>
              columns={tableColumns}
              data={data}
              handleClickRow={handleClickRow}
              selectedRow={selectedRow || EmptyString}
              selectedRowChecker={"code"}
              columnIndex={1}
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

export default Popularity
