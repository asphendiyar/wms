import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth"
import backgroundTasks from "./reducers/background-tasks"
import cellTypes from "./reducers/cell-types"
import commodities from "./reducers/commodities"
import couriers from "./reducers/couriers"
import dictionary from "./reducers/dictionary"
import emailNotification from "./reducers/email-notification"
import equipments from "./reducers/equipments"
import erpWarehouses from "./reducers/erp-warehouses"
import inbound from "./reducers/inbound"
import inventories from "./reducers/inventories"
import measureUnits from "./reducers/measure-units"
import outbound from "./reducers/outbound"
import partners from "./reducers/partner"
import periodicReservations from "./reducers/periodic-reservations"
import pickingOrders from "./reducers/picking-orders"
import pickingPriorities from "./reducers/picking-priority"
import popularities from "./reducers/popularities"
import printers from "./reducers/printers"
import productCatalog from "./reducers/product-catalog"
import products from "./reducers/products"
import categories from "./reducers/products-tree"
import requests from "./reducers/requests"
import shipments from "./reducers/shipments"
import tradeItemDocuments from "./reducers/trade-item-documents"
import tradeItems from "./reducers/trade-items"
import users from "./reducers/users"
import warehouse from "./reducers/warehouse"
import warehouseMap from "./reducers/warehouse-map"
import { rootWatcher } from "./sagas"

const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    requests,
    auth,
    users,
    productCatalog,
    warehouse,
    inbound,
    outbound,
    shipments,
    erpWarehouses,
    tradeItems,
    partners,
    products,
    pickingOrders,
    warehouseMap,
    cellTypes,
    measureUnits,
    equipments,
    popularities,
    commodities,
    tradeItemDocuments,
    backgroundTasks,
    periodicReservations,
    dictionary,
    couriers,
    pickingPriorities,
    categories,
    emailNotification,
    printers,
    inventories,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootWatcher)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const dispatch = store.dispatch
