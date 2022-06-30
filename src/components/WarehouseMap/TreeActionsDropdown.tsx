import React, { Dispatch, Fragment, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineAppstoreAdd, AiOutlineCheckCircle } from "react-icons/ai"
import { BiEditAlt } from "react-icons/bi"
import { MdKeyboardArrowRight } from "react-icons/md"
import ReactSwitch from "react-switch"
import {
  appColors,
  checkPrivilege,
  randomNumberIdGenerator,
} from "../../app/helpers"
import {
  useAppDispatch,
  useAppSelector,
  useOnClickOutside,
} from "../../app/hooks"
import {
  filterRequests,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  changeCellStateAction,
  getCellByIdAction,
} from "../../app/reducers/warehouse-map/actions"
import {
  PostPutECPInCellsType,
  WarehouseMapEnums,
} from "../../app/reducers/warehouse-map/types"
import { ReactComponent as GenerateCells } from "../../assets/icons/services.svg"
import {
  TreeActionItemWrapper,
  TreeActionsWrapper,
} from "../../pages/WarehouseMap/style"
import Alert, { AlertListItem } from "../Common/Alert"
import { ActionGroupWrapper } from "../Common/styled"
import CreateActionsDropdown from "./CreateActionDropdown"

type TreeActionsDropdownProps = {
  ref: React.Ref<HTMLDivElement>
  handleClickCellsGenerator: () => void
  handleClickTreeItemEditor: () => void
  handleClickCreateActionsItem: (type: PostPutECPInCellsType) => void
  alertList: AlertListItem[]
  setAlertList: Dispatch<AlertListItem[]>
}
const TreeActionsDropdown = React.forwardRef<
  HTMLDivElement,
  TreeActionsDropdownProps
>(
  (
    {
      handleClickCellsGenerator,
      handleClickTreeItemEditor,
      handleClickCreateActionsItem,
      setAlertList,
      alertList,
    },
    ref
  ) => {
    const dispatch = useAppDispatch()
    const cellData = useAppSelector((state) => state.warehouseMap.cellData)
    const changeCellStateStatus = useAppSelector((state) =>
      namedRequestsInProgress(state, WarehouseMapEnums.changeCellState)
    )
    const selectedNode = useAppSelector(
      (state) => state.warehouseMap.selectedNode
    )
    const selectedRootWarehouseId = useAppSelector(
      (state) => state.warehouseMap.selectedRootWarehouseId
    )

    const [active, setActive] = useState<boolean>(
      cellData?.state === "active" ? true : false
    )
    const [createActionsDropdown, setCreateActionsDropdown] =
      useState<boolean>(false)

    const handleChangeActive = (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setActive(!active)
      selectedNode &&
        dispatch(
          changeCellStateAction({
            address: selectedNode?.id,
            warehouse_id: selectedRootWarehouseId,
            state: active ? "disabled" : "active",
          })
        )
    }

    const createActionsRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref, () => {
      setCreateActionsDropdown(false)
    })

    const handleMouseEnter = () => {
      setCreateActionsDropdown(true)
    }
    const { t } = useTranslation()

    useEffect(() => {
      if (changeCellStateStatus === "success") {
        setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.success"),
            message: t("alerts.successMessage"),
            icon: AiOutlineCheckCircle,
            bgColor: appColors.green,
            onDelete: () => {
              dispatch(filterRequests(WarehouseMapEnums.changeCellState))
            },
          },
        ])
        selectedNode?.originalId &&
          dispatch(getCellByIdAction(selectedNode.originalId))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeCellStateStatus])

    return (
      <Fragment>
        <Alert alertList={alertList} autoDelete timeout={3000} />
        <TreeActionsWrapper ref={ref} className={"tree-actions"}>
          <TreeActionItemWrapper onClick={handleChangeActive}>
            <ActionGroupWrapper>
              <ReactSwitch
                checked={active}
                onChange={() => undefined}
                offColor={appColors.lightGray}
                onColor={appColors.primary}
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={10}
                height={20}
                width={40}
              />
              <span>{t("buttons.active")}</span>
            </ActionGroupWrapper>
          </TreeActionItemWrapper>

          {checkPrivilege("LocationListTreeBrw", "CA_GENERATE_LOCATIONS") && (
            <TreeActionItemWrapper onClick={handleClickCellsGenerator}>
              <ActionGroupWrapper>
                <GenerateCells />
                <span>{t("columns.cell_generator")}</span>
              </ActionGroupWrapper>
            </TreeActionItemWrapper>
          )}
          {checkPrivilege("LocationListTreeBrw", "Modify") && (
            <TreeActionItemWrapper onClick={handleClickTreeItemEditor}>
              <ActionGroupWrapper>
                <BiEditAlt />
                <span>{t("buttons.edit")}</span>
              </ActionGroupWrapper>
            </TreeActionItemWrapper>
          )}

          <TreeActionItemWrapper onMouseEnter={handleMouseEnter}>
            <ActionGroupWrapper className="space-between">
              <ActionGroupWrapper>
                <AiOutlineAppstoreAdd />
                <span>{t("columns.type")}</span>
              </ActionGroupWrapper>
              <MdKeyboardArrowRight />
            </ActionGroupWrapper>
          </TreeActionItemWrapper>
          {createActionsDropdown && (
            <CreateActionsDropdown
              handleClick={handleClickCreateActionsItem}
              displayState={createActionsDropdown}
              ref={createActionsRef}
            />
          )}
        </TreeActionsWrapper>
      </Fragment>
    )
  }
)

export default React.memo(TreeActionsDropdown)
