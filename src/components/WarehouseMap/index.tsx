import { Fragment, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineBars,
  AiOutlineCheckCircle,
  AiOutlinePrinter,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useLocation } from "react-router-dom"
import { RouteEnums, TreeNode as TreeNodeTypes } from "../../app/commonTypes"
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import {
  useAppDispatch,
  useAppSelector,
  useOnClickOutside,
} from "../../app/hooks"
import i18n from "../../app/i18n"
import { BASE_URL, pathnames } from "../../app/pathnames"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  clearWarehouseMapNodeChildren,
  setRootWarehouseId,
  setSelectedNode,
} from "../../app/reducers/warehouse-map"
import {
  getFiniteCellsAction,
  getWarehouseMapAddressChildrenAction,
  getWarehouseMapAddressesAction,
  getWarehousesListAction,
} from "../../app/reducers/warehouse-map/actions"
import {
  PostPutECPInCellsType,
  WarehouseMapEnums,
} from "../../app/reducers/warehouse-map/types"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import { ChooseData } from "../Common/ChooseData"
import { LoadingIcon } from "../Common/LoadingIcon"
import Modal from "../Common/Modal"
import {
  ActionGroupWrapper,
  FlexJustifyBetween,
  Title,
  TreeViewWrapper,
  TreeWrapper,
} from "../Common/styled"
import TreeNode from "../Common/Tree"
import ContentTabs from "./ContentTabs"
import ECPTableInModal from "./ECPTableInModal"
import CellsGeneratorForm from "./Forms/CellsGeneratorForm"
import TreeItemEditorForm from "./Forms/TreeItemEditorForm"
import TreeActionsDropdown from "./TreeActionsDropdown"

type ModalsStates = {
  cellsGenerator: boolean
  treeNodeEditor: boolean
  ecpTabelInModal: {
    state: boolean
    type?: PostPutECPInCellsType
  }
}

type ModalHandlerArgs = keyof ModalsStates

export const generateTextByType = (type: PostPutECPInCellsType) => {
  switch (type) {
    case "commodities":
      return i18n.t("pageTitle.commodities")
    case "equipments":
      return i18n.t("pageTitle.equipments")
    case "popularities":
      return i18n.t("pageTitle.popularities")
    default:
      return EmptyString
  }
}

const WarehouseMapContent: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isFetchingECPInCells = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.postPutECPInCells)
  )
  const ecpInCellsFetchError = useAppSelector((state) =>
    namedRequestError(state, WarehouseMapEnums.postPutECPInCells)
  )
  const generateCellError = useAppSelector((state) =>
    namedRequestError(state, WarehouseMapEnums.generateCell)
  )
  const isFetchingGenerateCell = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.generateCell)
  )
  const isFetchingWarehousesList = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.getWarehousesList)
  )
  const isFetchingAddressChildren = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      WarehouseMapEnums.getWarehouseMapAddressChildren
    )
  )
  const isFetchingCellById = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.getCellById)
  )
  const isFetchingCorrectCell = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.correctCell)
  )
  const treeData = useAppSelector((state) => state.warehouseMap.tree)
  const selectedNode = useAppSelector(
    (state) => state.warehouseMap.selectedNode
  )
  const selectedRootWarehouseId = useAppSelector(
    (state) => state.warehouseMap.selectedRootWarehouseId
  )
  const warehousesList = useAppSelector(
    (state) => state.warehouseMap.warehouses
  )

  const [treeActionsDropdown, setTreeActionsDropdown] = useState<boolean>(false)

  const [modalsStates, setModalsStates] = useState<ModalsStates>({
    cellsGenerator: false,
    treeNodeEditor: false,
    ecpTabelInModal: { state: false },
  })

  const [alertList, setAlertList] = useState<AlertListItem[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setTreeActionsDropdown(false))

  const handleClickTreeTitle = (node: TreeNodeTypes) => {
    dispatch(setSelectedNode(node))
    if (node.isRoot) {
      dispatch(setRootWarehouseId(node.id))
      dispatch(
        getWarehouseMapAddressesAction({
          reqPayload: node.id,
        })
      )
    } else {
      if (node.hasChild) {
        dispatch(
          getFiniteCellsAction({
            warehouse_id: selectedRootWarehouseId,
            page: 1,
            address: node.id,
          })
        )
        dispatch(
          getWarehouseMapAddressChildrenAction({
            reqPayload: {
              warehouse_id: selectedRootWarehouseId,
              address: node.id,
            },
          })
        )
      }
    }
  }

  const handleClickOpenDropdown = () => {
    if (selectedNode && !selectedNode.isRoot) setTreeActionsDropdown(true)
    else
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.warning"),
          message: t("alerts.chooseCell"),
          icon: AiOutlineWarning,
          bgColor: appColors.warning,
        },
      ])
  }

  const handleOpenModal = (modal: ModalHandlerArgs) => {
    setModalsStates({ ...modalsStates, [modal]: true })
  }

  const handleCloseModal = (modal: ModalHandlerArgs) => {
    setModalsStates({ ...modalsStates, [modal]: false })
  }

  const handleCloseECPTabelModal = () => {
    setModalsStates({ ...modalsStates, ecpTabelInModal: { state: false } })
  }

  const handleClickCreateActionsItem = (type: PostPutECPInCellsType) => {
    setModalsStates({
      ...modalsStates,
      ecpTabelInModal: { state: true, type },
    })
  }

  const handleClickTreeItemEditor = () => {
    handleOpenModal("treeNodeEditor")
  }
  const handleClickCellsGenerator = () => {
    handleOpenModal("cellsGenerator")
  }
  const handleClickPrint = () => {
    if (selectedNode && !selectedNode.isRoot)
      window.open(
        `${
          BASE_URL + pathnames.cellPrinting
        }warehouse/${selectedRootWarehouseId}/cell/${selectedNode.id}`
      )
    else {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.warning"),
          message: t("alerts.chooseCell"),
          icon: AiOutlineWarning,
          bgColor: appColors.warning,
        },
      ])
    }
  }

  const location = useLocation()

  useEffect(() => {
    if (!warehousesList || warehousesList?.number === 0)
      dispatch(getWarehousesListAction({ reqPayload: { page: 1 } }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.pathname])

  useEffect(() => {
    if (isFetchingECPInCells === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseMapEnums.postPutECPInCells))
          },
        },
      ])
    }
    if (isFetchingCorrectCell === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseMapEnums.postPutECPInCells))
          },
        },
      ])
      handleCloseModal("treeNodeEditor")
    }
    if (isFetchingECPInCells === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: ecpInCellsFetchError?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseMapEnums.postPutECPInCells))
          },
        },
      ])

    if (isFetchingGenerateCell === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: generateCellError?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseMapEnums.generateCell))
          },
        },
      ])
    else if (isFetchingGenerateCell === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseMapEnums.generateCell))
          },
        },
      ])
      handleCloseModal("cellsGenerator")
      dispatch(getWarehousesListAction({ reqPayload: { page: 1 } }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingECPInCells, isFetchingCorrectCell, isFetchingGenerateCell])

  return (
    <Fragment>
      <Alert alertList={alertList} autoDelete timeout={4000} />
      <Modal
        open={modalsStates.cellsGenerator}
        title={"Генератор ячеек"}
        onClose={() => handleCloseModal("cellsGenerator")}
        className="side cells-generator"
      >
        {isFetchingCellById === "pending" ? (
          "Loading..."
        ) : (
          <CellsGeneratorForm
            handleClose={() => handleCloseModal("cellsGenerator")}
          />
        )}
      </Modal>
      <Modal
        open={modalsStates.treeNodeEditor}
        title={t("buttons.edit")}
        onClose={() => handleCloseModal("treeNodeEditor")}
        className="side"
      >
        {isFetchingCellById === "pending" ? (
          <LoadingIcon />
        ) : (
          <TreeItemEditorForm
            onClose={() => handleCloseModal("treeNodeEditor")}
          />
        )}
      </Modal>
      <Modal
        open={modalsStates.ecpTabelInModal.state}
        title={
          modalsStates.ecpTabelInModal.type
            ? generateTextByType(modalsStates.ecpTabelInModal.type)
            : EmptyString
        }
        onClose={handleCloseECPTabelModal}
        className="side"
      >
        <ECPTableInModal
          ecpType={modalsStates.ecpTabelInModal.type || EmptyString}
          handleClose={handleCloseECPTabelModal}
        />
      </Modal>
      <TreeViewWrapper>
        <div className="tree-view__tree">
          {location.pathname === RouteEnums.warehouseMap && (
            <FlexJustifyBetween className="mb-15">
              <Title>{t("pageTitle.action")}</Title>
              <ActionGroupWrapper>
                <IconButton
                  onClick={handleClickPrint}
                  popupText={t("buttons.print")}
                >
                  <AiOutlinePrinter />
                </IconButton>
                <IconButton
                  onClick={handleClickOpenDropdown}
                  className={treeActionsDropdown ? "active" : EmptyString}
                >
                  <AiOutlineBars />
                </IconButton>
              </ActionGroupWrapper>
              {treeActionsDropdown && (
                <TreeActionsDropdown
                  ref={ref}
                  alertList={alertList}
                  setAlertList={setAlertList}
                  handleClickCellsGenerator={handleClickCellsGenerator}
                  handleClickTreeItemEditor={handleClickTreeItemEditor}
                  handleClickCreateActionsItem={handleClickCreateActionsItem}
                />
              )}
            </FlexJustifyBetween>
          )}
          <TreeWrapper>
            {isFetchingWarehousesList === "pending" ? (
              <SkeletonTheme
                baseColor={appColors.ligherGray}
                highlightColor={appColors.lightGray}
              >
                <Skeleton
                  count={5}
                  height={20}
                  width={"85%"}
                  style={{ marginBottom: 10 }}
                />
              </SkeletonTheme>
            ) : (
              treeData &&
              Object.keys(treeData).map((root) => (
                <TreeNode
                  key={root}
                  node={treeData[root]}
                  handleClick={handleClickTreeTitle}
                  selected={selectedNode?.id}
                  fetchingNodeId={
                    isFetchingAddressChildren === "pending"
                      ? selectedNode?.id
                      : undefined
                  }
                  childrenCleaner={clearWarehouseMapNodeChildren}
                />
              ))
            )}
          </TreeWrapper>
        </div>
        <div className="tree-view__content">
          {!selectedNode ? (
            <ChooseData />
          ) : (
            <ContentTabs setAlertList={setAlertList} />
          )}
        </div>
      </TreeViewWrapper>
    </Fragment>
  )
}

export default WarehouseMapContent
