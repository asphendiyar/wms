export type UserFormValuesWarehouses = {
  warehouse_id: number
  functional_zones: number[]
}
export type OneUserFZones = {
  id: number
  state: string
  state_title: string
  code: string
  name: string
  function: string
  function_title: string
}
export type OneUserWarehouses = {
  id: number
  state: string
  state_title: string
  code: string
  name: string
  functional_zones: OneUserFZones[]
}
export type SelectedWarehouses = {
  warehouseId: number
  warehouseName: string
  fZones: {
    fZoneId: number
    fZoneName: string
  }[]
}
export interface BaseUserFields {
  login: string
  state: string
  first_name: string
  last_name: string
  middle_name: string
  has_single_rf_session: boolean
  position: string
  department: string
  language: string
  gender: string
  phone_number: string
  email: string
}
export interface UserAccessGroup {
  id: number
  name: string
  checked: boolean
}
export interface UserFormValues extends BaseUserFields {
  password: string
  id?: number
  warehouses: UserFormValuesWarehouses[]
  access_groups: number[]
}
export interface PutUserFormValues extends UserFormValues {
  oldUsername: string // This field used for determine api path
}
export interface OneUserTypes extends BaseUserFields {
  id: number
  name: string
  created_date: string
  updated_date: string
  created_by: string
  updated_by: string
  warehouses: OneUserWarehouses[]
  access_groups: UserAccessGroup[]
}
export interface UserTypesInContent extends BaseUserFields {
  id: number
  created_date: string
  updated_date: string
}
export interface BaseUsersResponse {
  number: number
  number_of_elements: number
  total_elements: number
  total_pages: number
}
export interface UsersResponse extends BaseUsersResponse {
  content: UserTypesInContent[]
}
export interface UsersGroupsResponse extends BaseUsersResponse {
  content: UsersGroupsResponseContent[]
}
export interface OneUsersGroupProfilesResponse extends BaseUsersResponse {
  content: OneUsersGroupProfilesResponseContent[]
}
export type UsersGroupFormValues = {
  id?: string
  name_en: string
  name_ru: string
  name_kk: string
  privileges: number[]
}
export type OneUsersGroup = {
  id: number
  name_kk: string
  name_ru: string
  name_en: string
  created_date?: string
  updated_date?: string
}
export type OneUsersGroupProfilesResponseContent = {
  id: number
  login: string
  first_name: string
  last_name: string
  middle_name: string
  name?: string
}
export type UsersGroupsResponseContent = {
  id: number
  name: string
  created_date: string
  updated_date: string
}
export interface PrivilegeTypes {
  name: string
  id: number
  code: string
}
export interface PrivilegesGroupTypes {
  id: number
  code: string
  name: string
  created_date: string
  updated_date: string
  privileges: PrivilegeTypes[]
}
export interface FormPrivilege {
  name: string
  id: string
  code: string
  checked: boolean
}
export interface FormPrivilegesGroup {
  id: string
  code: string
  name: string
  checked: boolean
  privileges?: FormPrivilege[]
}
export type FormCheckboxActionPayload = {
  id: string | number
  checked: boolean
}
export type UsersInitials = {
  // Users group
  usersGroups: UsersGroupsResponse
  oneUsersGroup: OneUsersGroup | undefined
  oneUsersGroupPrivileges: PrivilegesGroupTypes[]
  oneUsersGroupPrivilegeIds: number[]
  oneUsersGroupFormValues: UsersGroupFormValues | null
  oneUsersGroupProfiles: OneUsersGroupProfilesResponse
  formUsersGroups: UserAccessGroup[]
  // Users
  users: UsersResponse
  userGroups: UserAccessGroup[]
  oneUserFormValues: UserFormValues | null
  oneUserData: OneUserTypes
  oneUserWarehouses: SelectedWarehouses[]
  // Privileges
  privileges: PrivilegesGroupTypes[]
  formPrivileges: FormPrivilegesGroup[]
  privilegeGroupItems: PrivilegeTypes[]
}

export enum UserEnums {
  getAllUsers = "users/get/all",
  getUsersByName = "users/get/all/byName",
  getOneUser = "users/get/one",
  postUser = "users/all/create",
  putUser = "users/all/update",
  getUsersGroups = "users/groups/get/all",
  getUsersGroupsByName = "users/groups/get/byName",
  getOneUsersGroup = "users/groups/get/one",
  getOneUsersGroupProfiles = "users/groups/get/one/profiles",
  getOneUsersGroupPrivileges = "users/groups/get/one/privileges",
  postUsersGroup = "users/groups/create",
  putUsersGroup = "users/groups/update",
  getPrivileges = "users/privileges/get/all",
  getOnePrivilege = "users/privileges/get/one",
}
