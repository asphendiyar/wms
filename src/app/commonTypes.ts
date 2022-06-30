export interface ResponseError {
  status: string
  code: string
  message: string
  validation?: Array<Object>
}
export interface WorkerParams<T> {
  payload: T
  type: string
}
// Types for React Select Options
export interface ReactSelectValues {
  value: string | number
  label: string
  optValue?: string
}

export type PostResponse = {
  id: number
  code: string
  status: string
  message: string
}
export type PutResponse = {
  code: string
  status: string
  message: string
}

export type FilterPayloadTypes = {
  page?: number
  size?: number
  code?: string
  name?: string
  barcodes?: string
  description?: string
  warehouse_id?: string
  number?: string
  state?: string
  category_id?: string
  outbound_id?: string
  inventory_id?: string
  interval_id?: string
}

export enum RouteEnums {
  main = "/",
  auth = "/auth",
  users = "/users",
  usersList = "/users/list",
  usersGroups = "/users/groups",
  oneUsersGroupProfiles = "/users/groups/:id/profiles",
  oneUser = "/users/all/:id",
  usersPrivileges = "/users/privileges",
  oneUsersPrivileges = "/users/privileges/:id/:privilegeId",
  oneUsersPrivilegesGroup = "/users/privileges/:id",
  productCatalog = "/product-catalog",
  productsTree = "/products-tree",
  warehouses = "/warehouses",
  warehouseMap = "/warehouses/map",
  warehouseProducts = "/warehouses/products",
  inbound = "/inbound",
  outbound = "/outbound",
  shipments = "/shipments",
  erpWarehouses = "/erp-warehouses",
  tradeItems = "/trade-items",
  partners = "/partners",
  pickingOrders = "/picking-orders",
  cellTypes = "/cell-types",
  measureUnits = "/measure-units",
  equipments = "/equipments",
  popularities = "/popularities",
  commodities = "/commodities",
  tradeItemDocuments = "/trade-item-documents",
  backgroundTasks = "/background-tasks",
  periodicReservations = "/periodic-reservations",
  couriers = "/couriers",
  pickingPriorities = "/picking-priorities",
  emailNotification = "/email-notification",
  printers = "/printers",
  inventories = "/inventories",
}
export type FetchMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
export type DetailPropTypes = {
  code?: string
  id?: number
}
export type FormPropTypes = {
  onClose: () => void
  editMode: boolean
}

export type TreeNode = {
  id: string
  originalId?: string
  title: string
  hasChild: boolean
  floor?: string
  isRoot: boolean
  routePath: string // Used as NavLink path in tree component
  childNodes: TreeNode[]
}

export type TreeNodeCategories = {
  id: string
  originalId?: string
  title: string
  hasChild: boolean
  isRoot: boolean
  routePath: string // Used as NavLink path in tree component
  childNodes: TreeNode[]
}

export type DoublePayload<Payload, LocalPayload> = {
  payload: Payload
  localPayload: LocalPayload
}
