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
  getAllPartnersAction,
  getDetailedPartnersAction,
  getSearchAllPartnersAction,
} from "../../app/reducers/partner/actions"
import {
  selectPartners,
  selectPartnersList,
} from "../../app/reducers/partner/selectors"
import {
  PartnerEnums,
  PartnersTableData,
} from "../../app/reducers/partner/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox"
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
import { PartnerForm } from "./PartnerForm"

export const tableColumns: Array<Column<PartnersTableData>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code_sticky",
  },
  {
    Header: () => i18n.t("columns.company_code"),
    accessor: "company_code_sticky",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name_sticky",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.address"),
    accessor: "address",
  },
  {
    Header: () => i18n.t("columns.is_b2b"),
    accessor: "is_b2b",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },

  {
    Header: () => i18n.t("columns.customer"),
    accessor: "customer",
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

const Partner: React.FC = () => {
  const data = useAppSelector(selectPartnersList)
  const { number, total_pages } = useAppSelector(selectPartners)

  const isPartnerFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.getAllPartners)
  )
  const isDetailedPartnerFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.getDetailedPartners)
  )
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PartnerEnums.getAllPartners)
  )
  const isFetchingPostPartner = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.postPartners)
  )
  const fetchErrorPostPartner = useAppSelector((state) =>
    namedRequestError(state, PartnerEnums.postPartners)
  )
  const isFetchingPutPartner = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.putPartners)
  )
  const fetchErrorPutPartner = useAppSelector((state) =>
    namedRequestError(state, PartnerEnums.putPartners)
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

  const handleClickRow = (args: PartnersTableData) => {
    setSelectedRow(args.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectedFilterOption === "code"
      ? setCodeQuery(e.target.value)
      : setNameQuery(e.target.value)
    if (e.target.value.length === 0) {
      dispatch(getSearchAllPartnersAction({ page: 1 }))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllPartnersAction({
          page: 1,
          name: nameQuery,
          code: codeQuery,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllPartnersAction({
        page: 1,
        name: nameQuery,
        code: codeQuery,
      })
    )
  }

  const handleClickMoreBtn = () => {
    dispatch(getAllPartnersAction({ page: number + 1 }))
  }

  const handleCloseFormModal = () => {
    setCreateModal(false)
    if (
      isFetchingPostPartner === "success" ||
      isFetchingPutPartner === "success"
    ) {
      dispatch(getSearchAllPartnersAction({ page: 1 }))
    }
  }
  useEffect(() => {
    if (isFetchingPostPartner === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PartnerEnums.postPartners))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPutPartner === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(PartnerEnums.putPartners))
          },
        },
      ])
      handleCloseFormModal()
    }
    if (isFetchingPostPartner === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostPartner?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PartnerEnums.postPartners))
          },
        },
      ])
    if (isFetchingPutPartner === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutPartner?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(PartnerEnums.putPartners))
          },
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostPartner,
    fetchErrorPutPartner,
    isFetchingPostPartner,
    isFetchingPutPartner,
  ])

  useEffect(() => {
    dispatch(getSearchAllPartnersAction({ page: 1 }))
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
        {isDetailedPartnerFetching === "pending" ? (
          <LoadingIcon />
        ) : (
          <PartnerForm onClose={handleCloseFormModal} editMode={editMode} />
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
              dispatch(getSearchAllPartnersAction({ page: 1 }))
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
          {checkPrivilege("Partners", "Browse") && (
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
          {checkPrivilege("Partners", "Create") && (
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
          {checkPrivilege("Partners", "Modify") && (
            <IconButton
              onClick={() => {
                if (selectedRow) {
                  dispatch(getDetailedPartnersAction(selectedRow.toString()))
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

      {isPartnerFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<PartnersTableData>
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

export default Partner
