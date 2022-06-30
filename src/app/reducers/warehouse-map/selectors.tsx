import { createSelector } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import ReactSwitch from "react-switch"
import { appColors, EmptyString } from "../../helpers"
import { dispatch, RootState } from "../../store"
import { WarehouseECPType } from "../warehouse/types"
import { postPutECPInCellsAction } from "./actions"
import {
  CellsTableColumns,
  ECPSelectorReturns,
  PostPutECPInCellsType,
} from "./types"

export const selectActiveRootWarehouseName = createSelector(
  [
    (state: RootState) => state.warehouseMap.selectedRootWarehouseId,
    (state: RootState) => state.warehouseMap.tree,
  ],
  (id, tree) => tree[`root${id}`]
)
export const selectECPData = createSelector(
  [
    (state: RootState) => state.warehouseMap.comoditites,
    (state: RootState) => state.warehouseMap.popularities,
    (state: RootState) => state.warehouseMap.equipments,
  ],
  (commodities, popularities, equipments): ECPSelectorReturns => ({
    equipments,
    commodities,
    popularities,
  })
)

// This HOC used no the types modal from WarehouseMap->DropdownMenu->Types
function Switcher({
  item,
  type,
  cellId,
}: {
  cellId: string
  item: WarehouseECPType
  type: PostPutECPInCellsType
}): JSX.Element {
  const [checked, setChecked] = useState<boolean>(false)
  const handleChange = (value: boolean) => {
    setChecked(value)
    dispatch(
      postPutECPInCellsAction({
        id: cellId,
        type,
        payload: {
          code: item.code,
          state: item.state === "active" ? "disabled" : "active",
        },
      })
    )
  }

  useEffect(() => {
    item.state === "active" && setChecked(true)
  }, [item.state])

  return (
    <ReactSwitch
      checked={checked}
      onChange={handleChange}
      offColor={appColors.lightGray}
      onColor={appColors.primary}
      checkedIcon={false}
      uncheckedIcon={false}
      handleDiameter={10}
      height={20}
      width={40}
    />
  )
}
export const selectPopularitiesFromCellData = createSelector(
  [
    (state: RootState) => state.warehouseMap.cellData,
    (state: RootState) => state.warehouseMap.selectedNode,
  ],
  (data, selectedNode) =>
    data?.popularities.map((item) => ({
      ...item,
      action: (
        <Switcher
          cellId={selectedNode?.originalId ?? EmptyString}
          item={item}
          type="popularities"
        />
      ),
    }))
)
export const selectCommoditiesFromCellData = createSelector(
  [
    (state: RootState) => state.warehouseMap.cellData,
    (state: RootState) => state.warehouseMap.selectedNode,
  ],
  (data, selectedNode) =>
    data?.commodities.map((item) => ({
      ...item,
      action: (
        <Switcher
          cellId={selectedNode?.originalId ?? EmptyString}
          item={item}
          type="commodities"
        />
      ),
    }))
)
export const selectEquipmentsFromCellData = createSelector(
  [
    (state: RootState) => state.warehouseMap.cellData,
    (state: RootState) => state.warehouseMap.selectedNode,
  ],
  (data, selectedNode) =>
    data?.equipments.map((item: WarehouseECPType) => ({
      ...item,
      action: (
        <Switcher
          cellId={selectedNode?.originalId ?? EmptyString}
          item={item}
          type="equipments"
        />
      ),
    }))
)
export const selectTableDataFromFiniteCells = createSelector(
  (state: RootState) => state.warehouseMap.finiteCellsResponse.content ?? [],
  (finiteCells): CellsTableColumns[] =>
    finiteCells.map((item) => ({
      id: item.id,
      address: item.address,
      state: item.state,
      functional_zone: item.general.functional_zone.code,
      cell_type: item.general.cell_type.code ?? EmptyString,
    }))
)
