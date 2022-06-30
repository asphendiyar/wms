import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectActiveRootCategoryName = createSelector(
  [
    (state: RootState) => state.categories.selectedRootCategoriesId,
    (state: RootState) => state.categories.tree,
  ],
  (id, tree) => tree[`root${id}`]
);
