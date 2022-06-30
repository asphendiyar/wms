import { TreeNode } from "../../commonTypes";
import { CategoryListType } from "../product-catalog/types";

// types for warehouse map tree, start

export type CategoriesTree = { [key: string]: TreeNode };
// types for warehouse map tree, end

export enum CategoriesEnums {
  getCategoriesList = "categories/root/get",
  getCategoriesAfterRootChildren = "categories/afterRoot/children/get",
}

export type CategoriesInitials = {
  tree: CategoriesTree;
  categoriesRoot: CategoryListType[];
  categoriesAfterRoot: CategoryListType[];
  selectedNode: TreeNode | undefined;
  selectedRootCategoriesId: string;
  pagePath: string;
};
