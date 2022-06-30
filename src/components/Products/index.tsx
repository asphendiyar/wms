import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineCheckCircle } from "react-icons/ai"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { TreeNode as TreeNodeTypes } from "../../app/commonTypes"
import { appColors, randomNumberIdGenerator } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  clearProductsTreeNodeChildren,
  setProductsTreeNode,
  setProductsWarehouseId,
} from "../../app/reducers/products"
import { getCellItemsAction } from "../../app/reducers/products/actions"
import { ProductsEnums } from "../../app/reducers/products/types"
import {
  filterRequests,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  getWarehouseMapAddressChildrenAction,
  getWarehouseMapAddressesAction,
  getWarehousesListAction,
} from "../../app/reducers/warehouse-map/actions"
import { WarehouseMapEnums } from "../../app/reducers/warehouse-map/types"
import Alert, { AlertListItem } from "../Common/Alert"
import { ChooseData } from "../Common/ChooseData"
import { TreeViewWrapper, TreeWrapper } from "../Common/styled"
import TreeNode from "../Common/Tree"
import CellItems from "./Tables/CellItems"

const ProductsContent: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const isFetchingWarehousesList = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.getWarehousesList)
  )
  const adjustingProductsStatus = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductsEnums.adjustProducts)
  )
  const fetchingCells = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      WarehouseMapEnums.getWarehouseMapAddressChildren
    )
  )
  const treeData = useAppSelector((state) => state.products.tree)
  const warehousesList = useAppSelector(
    (state) => state.products.productWarehouses
  )
  const selectedNode = useAppSelector((state) => state.products.selectedNode)
  const selectedRootWarehouseId = useAppSelector(
    (state) => state.products.selectedRootWarehouseId
  )

  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const handleClickTreeTitle = (node: TreeNodeTypes) => {
    dispatch(setProductsTreeNode(node))
    if (node.isRoot) {
      dispatch(setProductsWarehouseId(node.id))
      dispatch(
        getWarehouseMapAddressesAction({
          reqPayload: node.id,
          actionKind: "products",
        })
      )
    } else {
      dispatch(
        getCellItemsAction({
          warehouse_id: selectedRootWarehouseId,
          address: node.id,
        })
      )
      node.hasChild &&
        dispatch(
          getWarehouseMapAddressChildrenAction({
            reqPayload: {
              warehouse_id: selectedRootWarehouseId,
              address: node.id,
            },
            actionKind: "products",
          })
        )
    }
  }

  useEffect(() => {
    if (!warehousesList || warehousesList?.number === 0)
      dispatch(
        getWarehousesListAction({
          reqPayload: { page: 1 },
          actionKind: "products",
        })
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.pathname])

  useEffect(() => {
    if (adjustingProductsStatus === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ProductsEnums.adjustProducts))
          },
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustingProductsStatus])

  return (
    <Fragment>
      <Alert alertList={alertList} autoDelete timeout={4000} />
      <TreeViewWrapper>
        <div className="tree-view__tree">
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
                    fetchingCells === "pending" ? selectedNode?.id : undefined
                  }
                  childrenCleaner={clearProductsTreeNodeChildren}
                />
              ))
            )}
          </TreeWrapper>
        </div>
        <div className="tree-view__content">
          {!selectedNode ? (
            <ChooseData />
          ) : (
            <CellItems setAlertList={setAlertList} />
          )}
        </div>
      </TreeViewWrapper>
    </Fragment>
  )
}

export default ProductsContent
