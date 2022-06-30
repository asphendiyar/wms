import { EmptyString, fetchHelper } from "../../helpers"
import { BASE_URL, pathnames } from "../../pathnames"
import {
  BaseUserFields,
  OneUsersGroup,
  PrivilegesGroupTypes,
  PutUserFormValues,
  UserFormValues,
  UsersGroupFormValues,
  UsersGroupsResponse,
  UserTypesInContent,
} from "../../reducers/users/types"
import {
  GetOneUsersGroupParams,
  GetUsersGroupsParams,
  GetUsersParams,
} from "./types"

export const getPrivileges = async () =>
  fetchHelper<PrivilegesGroupTypes[]>(
    BASE_URL + pathnames.privilegeGroups,
    "GET"
  )

// Users requests
export const getAllUsers = async ({
  page,
  warehouse_id,
  profile,
}: GetUsersParams) =>
  fetchHelper<UsersGroupsResponse>(
    `${BASE_URL + pathnames.profiles}page/filter?page=${page}&warehouse_id=${
      warehouse_id ?? EmptyString
    }&profile=${profile ?? EmptyString}`,
    "GET"
  )
export const getUser = async (login: string) =>
  fetchHelper<UserTypesInContent>(BASE_URL + pathnames.profiles + login, "GET")
export const postUser = async (data: UserFormValues) => {
  return fetchHelper<UserFormValues>(
    BASE_URL + pathnames.profiles,
    "POST",
    data
  )
}
export const putUser = async ({ oldUsername, ...data }: PutUserFormValues) => {
  return fetchHelper<UserFormValues>(
    BASE_URL + pathnames.profiles + oldUsername,
    "PUT",
    data
  )
}

// Users group requests
export const getUsersGroups = async ({ page, name }: GetUsersGroupsParams) =>
  fetchHelper<UsersGroupsResponse>(
    `${BASE_URL + pathnames.groups}page/filter?page=${
      page + (name ? `&name=${name}` : EmptyString)
    }`,
    "GET"
  )
export const getOneUsersGroup = async (id: string) =>
  fetchHelper<OneUsersGroup>(BASE_URL + pathnames.groups + id, "GET")
export const getOneUsersGroupPrivileges = async ({
  groupId,
  page,
}: GetOneUsersGroupParams) =>
  fetchHelper<OneUsersGroup[]>(
    `${BASE_URL + pathnames.groups + groupId}/privilege-group/`,
    "GET"
  )
export const getOneUsersGroupProfiles = async ({
  groupId,
  page,
}: GetOneUsersGroupParams) =>
  fetchHelper<OneUsersGroup[]>(
    `${BASE_URL + pathnames.groups + groupId}/profiles/page?page=${page}`,
    "GET"
  )
export const getOneUsersProfile = async (login: string) =>
  fetchHelper<BaseUserFields>(BASE_URL + pathnames.profiles + login, "GET")

export const postUsersGroup = async (data: UsersGroupFormValues) => {
  return fetchHelper<UsersGroupFormValues>(
    BASE_URL + pathnames.groups,
    "POST",
    data
  )
}
export const putUsersGroup = async (data: UsersGroupFormValues) => {
  return fetchHelper<UsersGroupFormValues>(
    BASE_URL + pathnames.groups + data.id,
    "PUT",
    data
  )
}
