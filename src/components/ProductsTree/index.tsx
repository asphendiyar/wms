import { Fragment, useEffect } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { TreeNode as TreeNodeTypes } from "../../app/commonTypes"
import { appColors, EmptyString } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  clearWarehouseMapNodeChildren,
  setRootCategoryId,
  setSelectedNode,
} from "../../app/reducers/products-tree"
import {
  getCategoriesAfterRootChildrenAction,
  getCategoriesListAction,
} from "../../app/reducers/products-tree/actions"
import { CategoriesEnums } from "../../app/reducers/products-tree/types"
import { namedRequestsInProgress } from "../../app/reducers/requests"
import { ChooseData } from "../Common/ChooseData"
import { TreeViewWrapper, TreeWrapper } from "../Common/styled"
import TreeNode from "../Common/Tree"
import Products from "../ProductCatalog/Products/Products"

const ProductsTreeContent: React.FC = () => {
  const dispatch = useAppDispatch()

  const isFetchingCategories = useAppSelector((state) =>
    namedRequestsInProgress(state, CategoriesEnums.getCategoriesList)
  )
  const isFetchingCategoriesChildren = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      CategoriesEnums.getCategoriesAfterRootChildren
    )
  )

  const treeData = useAppSelector((state) => state.categories.tree)
  const selectedNode = useAppSelector((state) => state.categories.selectedNode)

  const handleClickTreeTitle = (node: TreeNodeTypes) => {
    dispatch(setSelectedNode(node))
    node.isRoot && dispatch(setRootCategoryId(node.id))
    node.hasChild && dispatch(getCategoriesAfterRootChildrenAction(node.id))
  }

  useEffect(() => {
    dispatch(getCategoriesListAction(EmptyString))
  }, [dispatch])

  return (
    <Fragment>
      <TreeViewWrapper>
        <div className="tree-view__tree">
          <TreeWrapper>
            {isFetchingCategories === "pending" ? (
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
                    isFetchingCategoriesChildren === "pending"
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
            <Products category_id={selectedNode?.id} />
          )}
        </div>
      </TreeViewWrapper>
    </Fragment>
  )
}

export default ProductsTreeContent
