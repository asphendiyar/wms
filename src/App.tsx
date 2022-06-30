import React, { Fragment, Suspense, useEffect } from "react"
import { Redirect, Route, Switch } from "react-router"
import { RouteEnums } from "./app/commonTypes"
import { useAppSelector } from "./app/hooks"
import "./app/i18n"
import { RootState } from "./app/store"
import { LoadingIcon } from "./components/Common/LoadingIcon"
import { Header } from "./components/Header"
import { Navbar } from "./components/Navbar"

// Lazy loads
const UsersPage = React.lazy(() => import("./pages/Users"))
const ProductCatalog = React.lazy(() => import("./pages/ProductCatalog"))
const ProductsTree = React.lazy(() => import("./pages/ProductsTree"))
const Warehouse = React.lazy(() => import("./pages/Warehouse"))
const WarehouseMap = React.lazy(() => import("./pages/WarehouseMap"))
const Products = React.lazy(() => import("./pages/Products"))
const Inbound = React.lazy(() => import("./pages/Inboud"))
const Outbounds = React.lazy(() => import("./pages/Outbound"))
const Shipment = React.lazy(() => import("./pages/Shipments"))
const SignIn = React.lazy(() => import("./pages/Auth"))
const Welcome = React.lazy(() => import("./pages/Main"))
const ErpWarehouses = React.lazy(() => import("./pages/ErpWarehouses"))
const TradeItems = React.lazy(() => import("./pages/TradeItems"))
const Partners = React.lazy(() => import("./pages/Partners"))
const PickingOrders = React.lazy(() => import("./pages/PickingOrders"))
const PickingPriorities = React.lazy(() => import("./pages/PickingPriorities"))
const CellTypes = React.lazy(() => import("./pages/CellTypes"))
const MeasureUnits = React.lazy(() => import("./pages/MeasureUnits"))
const Equipments = React.lazy(() => import("./pages/Equipments"))
const Popularities = React.lazy(() => import("./pages/Popularities"))
const Commodities = React.lazy(() => import("./pages/Commodities"))
const TradeItemDocuments = React.lazy(
  () => import("./pages/TradeItemDocuments")
)

const BackgroundTasks = React.lazy(() => import("./pages/BackgroundTasks"))
const Periodiceservations = React.lazy(
  () => import("./pages/PeriodicReservations")
)
const Couriers = React.lazy(() => import("./pages/Couriers"))
const EmailNotification = React.lazy(() => import("./pages/EmailNotification"))
const Printers = React.lazy(() => import("./pages/Printers"))
const Inventories = React.lazy(() => import("./pages/Inventories"))

function App() {
  const isAuth: boolean = useAppSelector(
    (state: RootState) => state.auth.isAuth
  )

  useEffect(() => {
    const rootElement = document.getElementById("wms-root")
    if (rootElement && isAuth) rootElement.className = "wms-app"
    if (rootElement && !isAuth) rootElement.className = "wms-auth"
  }, [isAuth])

  if (!isAuth)
    return (
      <Fragment>
        <Suspense fallback={<LoadingIcon />}>
          <Redirect to={RouteEnums.auth} />
          <Route exact path={RouteEnums.auth} component={SignIn} />
        </Suspense>
      </Fragment>
    )

  return (
    <Fragment>
      <Suspense fallback={<LoadingIcon />}>
        <Header />
        <Navbar />
      </Suspense>

      <div className="wms-app__content">
        <Suspense fallback={<LoadingIcon />}>
          <Switch>
            <Route exact path={RouteEnums.main} component={Welcome} />
            <Route path={RouteEnums.users} component={UsersPage} />
            <Route
              exact
              path={RouteEnums.productCatalog}
              component={ProductCatalog}
            />
            <Route
              exact
              path={RouteEnums.productsTree}
              component={ProductsTree}
            />
            <Route exact path={RouteEnums.warehouses} component={Warehouse} />
            <Route
              exact
              path={RouteEnums.warehouseMap}
              component={WarehouseMap}
            />
            <Route
              exact
              path={RouteEnums.warehouseProducts}
              component={Products}
            />
            <Route exact path={RouteEnums.inbound} component={Inbound} />
            <Route exact path={RouteEnums.outbound} component={Outbounds} />
            <Route exact path={RouteEnums.shipments} component={Shipment} />
            <Route
              exact
              path={RouteEnums.erpWarehouses}
              component={ErpWarehouses}
            />
            <Route exact path={RouteEnums.tradeItems} component={TradeItems} />
            <Route exact path={RouteEnums.partners} component={Partners} />
            <Route
              exact
              path={RouteEnums.pickingOrders}
              component={PickingOrders}
            />
            <Route
              exact
              path={RouteEnums.pickingPriorities}
              component={PickingPriorities}
            />
            <Route exact path={RouteEnums.cellTypes} component={CellTypes} />
            <Route
              exact
              path={RouteEnums.measureUnits}
              component={MeasureUnits}
            />
            <Route exact path={RouteEnums.equipments} component={Equipments} />
            <Route
              exact
              path={RouteEnums.popularities}
              component={Popularities}
            />
            <Route
              exact
              path={RouteEnums.commodities}
              component={Commodities}
            />
            <Route
              exact
              path={RouteEnums.tradeItemDocuments}
              component={TradeItemDocuments}
            />
            <Route
              exact
              path={RouteEnums.backgroundTasks}
              component={BackgroundTasks}
            />
            <Route
              exact
              path={RouteEnums.periodicReservations}
              component={Periodiceservations}
            />
            <Route exact path={RouteEnums.couriers} component={Couriers} />
            <Route
              exact
              path={RouteEnums.emailNotification}
              component={EmailNotification}
            />
            <Route exact path={RouteEnums.printers} component={Printers} />
            <Route
              exact
              path={RouteEnums.inventories}
              component={Inventories}
            />
            <Redirect to={RouteEnums.main} />
          </Switch>
        </Suspense>
      </div>
    </Fragment>
  )
}

export default App
