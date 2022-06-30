import { TreeNode } from "./commonTypes"

// Tree children setter
export const insertNodeIntoTree = <NewData>(
  id: string,
  data: TreeNode,
  key: string,
  titleKey: string,
  newData: NewData[],
  routePath: string
): void => {
  if (data.id === id) {
    data.childNodes = newData.map((item) => ({
      //@ts-ignore
      id: item[key],
      //@ts-ignore
      originalId: item.id,
      //@ts-ignore
      title: item[titleKey],
      //@ts-ignore
      floor: item.floor,
      //@ts-ignore
      hasChild: item.has_child,
      //@ts-ignore
      routePath: routePath + item[key],
      isRoot: false,
      childNodes: [],
    }))
  } else {
    let i
    for (i = 0; i < data.childNodes.length; i++) {
      insertNodeIntoTree(
        id,
        data.childNodes[i],
        key,
        titleKey,
        newData,
        routePath
      )
    }
  }
}

// Delete a node from the tree
export const deleteNodeChildren = (data: TreeNode, id: string): void => {
  if (data.id === id) {
    data.childNodes = []
  } else {
    for (let i = 0; i < data.childNodes.length; i++) {
      deleteNodeChildren(data.childNodes[i], id)
    }
  }
}
