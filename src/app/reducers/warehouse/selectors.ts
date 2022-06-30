import { createSelector } from "@reduxjs/toolkit"
import { ReactSelectValues } from "../../commonTypes"
import { RootState } from "../../store"
import { FunctionalZones, RampsType, WarehouseAllTypes } from "./types"

export const selectWarehouse = (state: RootState): WarehouseAllTypes =>
  state.warehouse.allWarehouse

export const selectFzone = (state: RootState): FunctionalZones[] | null =>
  state.warehouse.allFZonesByWarehouseID

export const selectRamps = (state: RootState): RampsType =>
  state.shipments.allRampsShipment

export const selectWarehouseList = createSelector(
  selectWarehouse,
  (list): ReactSelectValues[] =>
    list.content.map((item) => ({
      value: item.id,
      label: `${item.id.toString() + " - " + item.name}`,
    }))
)

export const selectFZonesList = createSelector(
  selectFzone,
  (list): ReactSelectValues[] =>
    list?.map((item) => ({ value: item.id, label: item.name_ru })) || []
)
export const selectFZonesListCode = createSelector(
  selectFzone,
  (list): ReactSelectValues[] =>
    list?.map((item) => ({ value: item.code, label: item.name_ru })) || []
)

export const selectRampsList = createSelector(
  selectRamps,
  (list): ReactSelectValues[] =>
    list.content.map((item) => ({
      value: item.code,
      label: `${item.code.toString() + " - " + item.value}`,
    }))
)
