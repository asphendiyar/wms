// BASE URL
export const BASE_URL = "https://dragon-api-stage.technodom.kz/api/wms"

export enum pathnames {
  // SSO request paths
  signIn = "/sso/v1/auth/signin/",
  signOut = "/sso/v1/auth/signout/",
  groups = "/sso/v1/groups/",
  profiles = "/sso/v1/profiles/",
  privilegeGroups = "/sso/v1/privilege-groups/",
  // Catalog request paths
  productCatalogs = "/catalog/v1/product-catalogs/",
  productCategoriesTree = "/catalog/v1/product-categories/tree/",
  measureUnits = "/catalog/v1/measure-units/",
  // Warehouse request paths
  warehouses = "/warehouse/v1/warehouses/",
  ramps = "/warehouse/v1/ramps/",
  erpWarehouses = "/warehouse/v1/erp-warehouses/",
  cellTypes = "/warehouse/v1/cell-types/",
  equipments = "/warehouse/v1/equipments/",
  popularities = "/warehouse/v1/popularities/",
  commodities = "/warehouse/v1/commodities/",
  cells = "/warehouse/v1/cells/",
  cellPrinting = "/warehouse/v1/printing/cell-badge/",
  // Inbound request paths
  inbounds = "/inbound/v1/inbounds/",
  // Outbound request paths
  outbounds = "/outbound/v1/outbounds/",
  shipments = "/outbound/v1/shipments/",
  // Trade-Item request paths
  tradeItems = "/trade-item/v1/trade-items/",
  tradeItemDocuments = "/trade-item/v1/trade-item-documents/",
  // Partners request paths
  partners = "/partner/v1/partners/",
  // Picking request paths
  pickingOrders = "/picking/v1/picking-orders/",
  pickingPriorities = "/picking/v1/picking-priority/",
  pickingTasks = "/picking/v1/picking-task/",
  // Background tasks request paths
  backgroundTasks = "/background-task/v1/background-task/",
  periodicReservations = "/background-task/v1/periodic-reservations/",
  // Printing request paths
  printing = "/printing/v1/printing/",
  // Dictionary request paths
  dictionary = "/dictionary-options/v1/options",
  // Couriers request paths
  couriers = "/courier/v1/couriers/",
  // Emails request paths
  emailNotification = "/email/v1/emails/",
  // Printers request paths
  printers = "/printing/v1/printers/",
  // Item service paths
  items = "/item/v1/items/",
  // Printers request paths
  inventories = "/inventory/v1/inventories/",
  inventoryTasks = "/inventory/v1/tasks/",
}
