import { createAction } from "@reduxjs/toolkit";
import {
  GetOneUsersGroupParams,
  GetUsersGroupsParams,
  GetUsersParams,
} from "../../sagas/users/types";
import {
  PutUserFormValues,
  UserEnums,
  UserFormValues,
  UsersGroupFormValues,
} from "./types";

// Users groups actions
export const getUsersGroupsAction = createAction<GetUsersGroupsParams>(
  UserEnums.getUsersGroups
);
export const getOneUsersGroupAction = createAction<string>(
  UserEnums.getOneUsersGroup
);
export const getUsersGroupsByNameAction = createAction<GetUsersGroupsParams>(
  UserEnums.getUsersGroupsByName
);
export const getOneUsersGroupProfilesAction =
  createAction<GetOneUsersGroupParams>(UserEnums.getOneUsersGroupProfiles);
export const getOneUsersGroupPrivilegesAction =
  createAction<GetOneUsersGroupParams>(UserEnums.getOneUsersGroupPrivileges);
export const postUsersGroupAction = createAction<UsersGroupFormValues>(
  UserEnums.postUsersGroup
);
export const putUsersGroupAction = createAction<UsersGroupFormValues>(
  UserEnums.putUsersGroup
);

// Users actions
export const getAllUsersAction = createAction<GetUsersParams>(
  UserEnums.getAllUsers
);
export const getUsersByNameAction = createAction<GetUsersParams>(
  UserEnums.getUsersByName
);
export const getOneUserAction = createAction<string>(UserEnums.getOneUser);
export const postUserAction = createAction<UserFormValues>(UserEnums.postUser);
export const putUserAction = createAction<PutUserFormValues>(UserEnums.putUser);

// Privileges actions
export const getPrivilegesAction = createAction(UserEnums.getPrivileges);
