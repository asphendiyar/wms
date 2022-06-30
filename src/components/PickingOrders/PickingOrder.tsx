import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineSearch,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import {
  appColors,
  checkPrivilege,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setSelectedPickingOrder } from "../../app/reducers/picking-orders"
import {
  getAllPickingOrdersAction,
  getSearchAllPickingOrdersAction,
  patchPickingOrdersPickAction,
} from "../../app/reducers/picking-orders/actions"
import {
  selectPickingOrderList,
  selectPickingOrders,
} from "../../app/reducers/picking-orders/selectors"
import {
  PickingOrderEnums,
  PickingOrdersBase,
} from "../../app/reducers/picking-orders/types"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import { RootState } from "../../app/store"
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
import { tableColumns } from "./columns"
import Details from "./Details"

const PickingOrder: React.FC = () => {
  const data = useAppSelector(selectPickingOrderList)
  const { number, total_pages } = useAppSelector(selectPickingOrders)

  const selectedPickingOrder: PickingOrdersBase | null = useAppSelector(
    (state: RootState) => state.pickingOrders.selectedPickingOrder
  )

  const isPickingFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingOrderEnums.getAllPickingOrders)
  )

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PickingOrderEnums.getAllPickingOrders)
  )

  const isFetchingPatchPick = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingOrderEnums.patchPickPickingOrders)
  )

  const fetchErrorPatchPick = useAppSelector((state) =>
    namedRequestError(state, PickingOrderEnums.patchPickPickingOrders)
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const [detailsModal, setDetailModal] = useState<boolean>(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [query, setQuery] = useState<string>(EmptyString)
  const [patchPickTrueModal, setPatchPickTrueModal] = useState<boolean>(false)
  const [patchPickFalseModal, setPatchPickFalseModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handlePickPatchPickTrueModal = () => {
    setPatchPickTrueModal(false)
  }
  const handlePickPatchPickFalseModal = () => {
    setPatchPickFalseModal(false)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(
        getSearchAllPickingOrdersAction({
          page: 1,
          outbound_id: query,
        })
      )
    }
  }

  const handleSearchClick = () => {
    dispatch(
      getSearchAllPickingOrdersAction({
        page: 1,
        outbound_id: query,
      })
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length === 0) {
      dispatch(getSearchAllPickingOrdersAction({ page: 1 }))
    }
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getAllPickingOrdersAction({ page: number + 1, outbound_id: query })
    )
  }
  const handleClickRow = (args: PickingOrdersBase) => {
    setSelectedRow(args.id)
    dispatch(setSelectedPickingOrder(args))
  }

  useEffect(
    () => {
      if (isFetchingPatchPick === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(PickingOrderEnums.patchPickPickingOrders))
            },
          },
        ])
        handlePickPatchPickTrueModal()
        handlePickPatchPickFalseModal()
        dispatch(getSearchAllPickingOrdersAction({ page: 1 }))
      }

      if (isFetchingPatchPick === "failed")
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.error"),
            message: fetchErrorPatchPick?.message || "",
            icon: BiErrorCircle,
            bgColor: appColors.error,
            onDelete: () => {
              dispatch(filterRequests(PickingOrderEnums.patchPickPickingOrders))
            },
          },
        ])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchErrorPatchPick, isFetchingPatchPick]
  )

  useEffect(() => {
    dispatch(getSearchAllPickingOrdersAction({ page: 1 }))
  }, [dispatch])

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <ModalConfirmModal
        headerText={t("buttons.allow") + "?"}
        message={t("confirmations.allowPickingOrder")}
        opened={patchPickTrueModal}
        onAllClose={() =>
          dispatch(
            patchPickingOrdersPickAction({
              id: selectedRow?.toString(),
              pickStatus: true,
            })
          )
        }
        onClose={() => setPatchPickTrueModal(false)}
      />

      <ModalConfirmModal
        headerText={t("buttons.notAllow") + "?"}
        message={t("confirmations.notAllowPickingOrder")}
        opened={patchPickFalseModal}
        onAllClose={() =>
          dispatch(
            patchPickingOrdersPickAction({
              id: selectedRow?.toString(),
              pickStatus: false,
            })
          )
        }
        onClose={() => setPatchPickFalseModal(false)}
      />

      <Modal
        open={detailsModal}
        title={t("buttons.details")}
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details id={selectedRow || 0} />
      </Modal>

      <PageTableOperations>
        <SearchInputWrapper>
          <StyledInput
            className="styled-input"
            name="search"
            placeholder={t("placeholders.searchByOutboundID")}
            type="text"
            value={query}
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

        <ActionGroupWrapper>
          {checkPrivilege("SysOrders", "Browse") && (
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
          {checkPrivilege("SysOrders", "CA_CAN_PICK") && (
            <IconButton
              onClick={() =>
                selectedRow
                  ? setPatchPickTrueModal(true)
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
              }
              popupText={t("buttons.allow")}
              disabled={
                selectedPickingOrder?.state === "closed" ||
                selectedPickingOrder?.state === "in_progress"
              }
            >
              Разрешить
            </IconButton>
          )}
          {checkPrivilege("SysOrders", "CA_CANNOT_PICK") && (
            <IconButton
              onClick={() =>
                selectedRow
                  ? setPatchPickFalseModal(true)
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
              }
              popupText={t("buttons.notAllow")}
              disabled={
                selectedPickingOrder?.state === "closed" ||
                selectedPickingOrder?.state === "in_progress"
              }
            >
              Запретить
            </IconButton>
          )}
        </ActionGroupWrapper>
      </PageTableOperations>

      {isPickingFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        <>
          <TableWrapper height="calc(100vh - 234px)">
            <CustomTable<PickingOrdersBase>
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

export default PickingOrder
