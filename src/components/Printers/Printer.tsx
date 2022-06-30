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
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getAllPrintersAction,
  getDetailedPrintersAction,
  getSearchAllPrintersAction,
} from "../../app/reducers/printers/action"

import {
  selectPrinters,
  selectPrintersList,
} from "../../app/reducers/printers/selectors"
import {
  PrintersContentType,
  PrintersEnums,
} from "../../app/reducers/printers/types"
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
import { PrintersForm } from "./PrintersForm"

export const tableColumns: Array<Column<PrintersContentType>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.queue"),
    accessor: "queue",
  },
  {
    Header: () => i18n.t("columns.port"),
    accessor: "port",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
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

const Printer: React.FC = () => {
  const data = useAppSelector(selectPrintersList)
  const { number, total_pages } = useAppSelector(selectPrinters)

  const isPrinterFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.getAllPrinters)
  )
  const isDetailedPrinterFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.getDetailedPrinters)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PrintersEnums.getAllPrinters)
  )
  const isFetchingPostPrinter = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.postPrinters)
  )
  const fetchErrorPostPrinter = useAppSelector((state) =>
    namedRequestError(state, PrintersEnums.postPrinters)
  )
  const isFetchingPutPrinter = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.putPrinters)
  )
  const fetchErrorPutPrinter = useAppSelector((state) =>
    namedRequestError(state, PrintersEnums.putPrinters)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<string>("code")

  const [nameQuery, setNameQuery] = useState<string>(EmptyString)
  const [codeQuery, setCodeQuery] = useState<string>(EmptyString)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleClickRow = (args: PrintersContentType) => {
    setSelectedRow(args.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "code"
      ? setCodeQuery(e.target.value)
      : setNameQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllPrintersAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllPrintersAction({
          page: 1,
          name: nameQuery,
          code: codeQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllPrintersAction({
        page: 1,
        name: nameQuery,
        code: codeQuery,
      })
    )
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllPrintersAction({ page: number + 1 }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostPrinter === "success" ||
      isFetchingPutPrinter === "success"
    ) {
      dispatch(getSearchAllPrintersAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostPrinter === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PrintersEnums.postPrinters))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutPrinter === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PrintersEnums.putPrinters))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostPrinter === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostPrinter?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PrintersEnums.postPrinters))
          },
        },
      ])
    if (isFetchingPutPrinter === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutPrinter?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PrintersEnums.putPrinters))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostPrinter,
    fetchErrorPutPrinter,
    isFetchingPostPrinter,
    isFetchingPutPrinter,
  ])

  useEffect(() => {
    dispatch(getSearchAllPrintersAction({ page: 1 }))
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
        {isDetailedPrinterFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <PrintersForm onClose={handleCloseFormModal} editMode={editMode} />
        )}
      </Modal>
      <PageTableOperations>
        <div className="filter-operations">
          <Select<ReactSelectValues>
            options={[
              { value: "code", label: `${t("columns.code")}` },
              { value: "name", label: `${t("columns.name")}` },
            ]}
            placeholder={t("placeholders.chooseFilter")}
            theme={customTheme}
            styles={customStyles({ width: 300 })}
            value={[
              { value: "code", label: `${t("columns.code")}` },
              { value: "name", label: `${t("columns.name")}` },
            ].find((item) => item.value === selectedFilterOption)}
            menuPosition={"fixed"}
            onChange={(value) => {
              typeof value?.value === "string" &&
                setSelectedFilterOption(value.value)
              setNameQuery(EmptyString)
              setCodeQuery(EmptyString)
              dispatch(
                getSearchAllPrintersAction({
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
                  { value: "code", label: `${t("columns.code")}` },
                  { value: "name", label: `${t("columns.name")}` },
                ].find((item) => item.value === selectedFilterOption)?.label
              }`}
              type={"text"}
              value={selectedFilterOption === "code" ? codeQuery : nameQuery}
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
          {checkPrivilege("PrintersBrw", "Browse") && (
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
          {checkPrivilege("PrintersBrw", "Create") && (
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
          {checkPrivilege("PrintersBrw", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedPrintersAction(selectedRow.toString()))
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

      {isPrinterFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<PrintersContentType>
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

export default Printer
