import { all, takeEvery, takeLatest } from "@redux-saga/core/effects"
import { fetchGenerator } from ".."
import { WorkerParams } from "../../commonTypes"
import {
  setOneUserData,
  setOneUsersGroup,
  setOneUsersGroupPrivileges,
  setOneUsersGroupProfiles,
  setPrivileges,
  setUsers,
  setUsersByName,
  setUsersFirstPage,
  setUsersGroups,
  setUsersGroupsByName,
  setUsersGroupsFirstPage,
} from "../../reducers/users"
import {
  OneUsersGroup,
  OneUsersGroupProfilesResponse,
  OneUserTypes,
  PrivilegesGroupTypes,
  PutUserFormValues,
  UserEnums,
  UserFormValues,
  UsersGroupFormValues,
  UsersGroupsResponse,
  UsersResponse,
} from "../../reducers/users/types"
import {
  getAllUsers,
  getOneUsersGroup,
  getOneUsersGroupPrivileges,
  getOneUsersGroupProfiles,
  getOneUsersProfile,
  getPrivileges,
  getUsersGroups,
  postUser,
  postUsersGroup,
  putUser,
  putUsersGroup,
} from "./requests"
import {
  GetOneUsersGroupParams,
  GetUsersGroupsParams,
  GetUsersParams,
} from "./types"

// Users groups workers
function* getUsersGroupsWorker({
  payload,
  type,
}: WorkerParams<GetUsersGroupsParams>) {
  yield fetchGenerator<GetUsersGroupsParams, UsersGroupsResponse>(
    getUsersGroups,
    payload,
    payload.setFirst ? setUsersGroupsFirstPage : setUsersGroups,
    type
  )
}
function* getOneUsersGroupWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, OneUsersGroup>(
    getOneUsersGroup,
    payload,
    setOneUsersGroup,
    type
  )
}
function* getUsersGroupsByNameWorker({
  payload,
  type,
}: WorkerParams<GetUsersGroupsParams>) {
  yield fetchGenerator<GetUsersGroupsParams, UsersGroupsResponse>(
    getUsersGroups,
    payload,
    setUsersGroupsByName,
    type
  )
}
function* getOneUsersGroupProfilesWorker({
  payload,
  type,
}: WorkerParams<GetOneUsersGroupParams>) {
  yield fetchGenerator<GetOneUsersGroupParams, OneUsersGroupProfilesResponse>(
    getOneUsersGroupProfiles,
    payload,
    setOneUsersGroupProfiles,
    type
  )
}

function* getOneUsersProfilesWorker({ payload, type }: WorkerParams<string>) {
  yield fetchGenerator<string, OneUserTypes>(
    getOneUsersProfile,
    payload,
    setOneUserData,
    type
  )
}

function* getOneUsersGroupPrivilegesWorker({
  payload,
  type,
}: WorkerParams<GetOneUsersGroupParams>) {
  yield fetchGenerator<GetOneUsersGroupParams, PrivilegesGroupTypes[]>(
    getOneUsersGroupPrivileges,
    payload,
    setOneUsersGroupPrivileges,
    type
  )
}

function* putUsersGroupWorker({
  payload,
  type,
}: WorkerParams<UsersGroupFormValues>) {
  yield fetchGenerator<UsersGroupFormValues, {}>(
    putUsersGroup,
    payload,
    null,
    type
  )
}
function* postUsersGroupWorker({
  payload,
  type,
}: WorkerParams<UsersGroupFormValues>) {
  yield fetchGenerator<UsersGroupFormValues, {}>(
    postUsersGroup,
    payload,
    null,
    type
  )
}

// Users workers
function* getUsersWorker({ payload, type }: WorkerParams<GetUsersParams>) {
  yield fetchGenerator<GetUsersParams, UsersResponse>(
    getAllUsers,
    payload,
    payload.setFirst ? setUsersFirstPage : setUsers,
    type
  )
}
function* getUsersByNameWorker({
  payload,
  type,
}: WorkerParams<GetUsersParams>) {
  yield fetchGenerator<GetUsersParams, UsersResponse>(
    getAllUsers,
    payload,
    setUsersByName,
    type
  )
}
function* postUserWorker({ payload, type }: WorkerParams<UserFormValues>) {
  yield fetchGenerator<UserFormValues, {}>(postUser, payload, null, type)
}
function* putUserWorker({ payload, type }: WorkerParams<PutUserFormValues>) {
  yield fetchGenerator<PutUserFormValues, {}>(putUser, payload, null, type)
}

// Privileges workers
function* getPrivilegesWorker({ payload, type }: WorkerParams<{}>) {
  yield fetchGenerator<{}, PrivilegesGroupTypes[]>(
    getPrivileges,
    payload,
    setPrivileges,
    type
  )
}
export function* usersWatcher() {
  yield all([
    // Users groups workers
    takeLatest(UserEnums.getUsersGroups, getUsersGroupsWorker),
    takeEvery(
      UserEnums.getOneUsersGroupPrivileges,
      getOneUsersGroupPrivilegesWorker
    ),
    takeEvery(UserEnums.getOneUsersGroup, getOneUsersGroupWorker),
    takeLatest(
      UserEnums.getOneUsersGroupProfiles,
      getOneUsersGroupProfilesWorker
    ),
    takeLatest(UserEnums.getUsersGroupsByName, getUsersGroupsByNameWorker),
    takeLatest(UserEnums.putUsersGroup, putUsersGroupWorker),
    takeLatest(UserEnums.postUsersGroup, postUsersGroupWorker),
    // Users workers
    takeEvery(UserEnums.getAllUsers, getUsersWorker),
    takeEvery(UserEnums.getUsersByName, getUsersByNameWorker),
    takeEvery(UserEnums.postUser, postUserWorker),
    takeEvery(UserEnums.putUser, putUserWorker),
    takeEvery(UserEnums.getOneUser, getOneUsersProfilesWorker),
    // Privileges worker
    takeEvery(UserEnums.getPrivileges, getPrivilegesWorker),
  ])
}
