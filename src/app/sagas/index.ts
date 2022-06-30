import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit"
import { all, call, put, spawn } from "redux-saga/effects"
import { DoublePayload, ResponseError } from "../commonTypes"
import { usersWatcher } from "./users"
import { authWatcher } from "./auth"
import { productCatalogWatcher } from "./product-catalog"
import { productsWatcher } from "./products"
import { failed, finished, started } from "../reducers/requests"
import { warehouseWatcher } from "./warehouse"
import { inboundsWatcher } from "./inbound"
import { outboundsWatcher } from "./outbound"
import { shipmentsWatcher } from "./shipments"
import { erpWarehousesWatcher } from "./erp-warehouses"
import { tradeItemsWatcher } from "./trade-items"
import { partnersWatcher } from "./partners"
import { pickingOrdersWatcher } from "./picking-orders"
import { pickingPriorityWatcher } from "./picking-priority"
import { cellTypesWatcher } from "./cell-types"
import { measureUnitsWatcher } from "./measure-units"
import { equipmentsWatcher } from "./equipments"
import { warehouseMapWatcher } from "./warehouse-map"
import { popularitiesWatcher } from "./popularities"
import { commoditiesWatcher } from "./commodities"
import { tradeItemDocumentsWatcher } from "./trade-item-documents"
import { backgroundTasksWatcher } from "./background-tasks"
import { periodicReservationsWatcher } from "./periodic-reservations"
import { dictionaryWatcher } from "./dictionary"
import { couriersWatcher } from "./couriers"
import { categoriesWatcher } from "./products-tree"
import { emailNotificationWatcher } from "./email-notification"
import { printersWatcher } from "./printers"
import { inventoriesWatcher } from "./inventories"

export function* fetchGenerator<
  Payload,
  ResponseDataType,
  LocalPayload = undefined
>(
  fetcher: (p: Payload) => Promise<Response>,
  payload: Payload,
  action:
    | ActionCreatorWithPayload<ResponseDataType>
    | ActionCreatorWithoutPayload
    | null,
  reqName: string,
  localPayload?: LocalPayload,
  localPayloadAction?: ActionCreatorWithPayload<
    DoublePayload<ResponseDataType, LocalPayload>
  >
) {
  yield put(started({ name: reqName, inProgress: "pending" }))
  try {
    const response: Response = yield call(fetcher, payload)
    const data: ResponseDataType = yield response.json()
    if (!response.ok) throw data
    else
      yield all([
        action && put(action(data)),
        localPayloadAction &&
          localPayload &&
          put(localPayloadAction({ payload: data, localPayload })),
        put(finished({ name: reqName, inProgress: "success", error: null })),
      ])
  } catch (error) {
    yield put(
      failed({
        name: reqName,
        inProgress: "failed",
        error: error as ResponseError,
      })
    )
  }
}

export function* rootWatcher() {
  yield all([
    spawn(usersWatcher),
    spawn(productCatalogWatcher),
    spawn(authWatcher),
    spawn(warehouseWatcher),
    spawn(inboundsWatcher),
    spawn(outboundsWatcher),
    spawn(shipmentsWatcher),
    spawn(erpWarehousesWatcher),
    spawn(tradeItemsWatcher),
    spawn(partnersWatcher),
    spawn(pickingOrdersWatcher),
    spawn(pickingPriorityWatcher),
    spawn(cellTypesWatcher),
    spawn(measureUnitsWatcher),
    spawn(warehouseMapWatcher),
    spawn(productsWatcher),
    spawn(equipmentsWatcher),
    spawn(popularitiesWatcher),
    spawn(commoditiesWatcher),
    spawn(tradeItemDocumentsWatcher),
    spawn(backgroundTasksWatcher),
    spawn(periodicReservationsWatcher),
    spawn(dictionaryWatcher),
    spawn(couriersWatcher),
    spawn(categoriesWatcher),
    spawn(emailNotificationWatcher),
    spawn(printersWatcher),
    spawn(inventoriesWatcher),
  ])
}
