import { createSelector } from "@reduxjs/toolkit"
import { t } from "i18next"
import { CollapseItemProps } from "../../../components/Users/CollapseView"
import { UsersTableData } from "../../../components/Users/UsersList"
import { EmptyString, normalizeDate } from "../../helpers"
import { RootState } from "../../store"
import { FormPrivilegesGroup, UsersGroupsResponse } from "./types"

// Users groups selectors
export const selectUsersGroups = (state: RootState): UsersGroupsResponse =>
  state.users.usersGroups

export const selectUsersGroupsList = createSelector(
  selectUsersGroups,
  (usersGroups: UsersGroupsResponse) =>
    usersGroups.content.map((item) => ({
      ...item,
      created_date: normalizeDate(item.created_date),
      updated_date: normalizeDate(item.updated_date),
    }))
)

export const selectFormPrivileges = createSelector(
  (state: RootState): FormPrivilegesGroup[] => state.users.formPrivileges,
  (privileges): number[] =>
    privileges
      .filter((privilege) => privilege.checked === true)
      .flatMap((privilege) =>
        privilege.privileges
          ? privilege.privileges.map((item) => Number(item.id.split("-")[1]))
          : []
      )
)

export const selectOneUsersGroupPrivileges = createSelector(
  (state: RootState) => state.users.oneUsersGroupPrivileges,
  (privilegesGroups): CollapseItemProps[] =>
    privilegesGroups.map((item) => ({
      id: item.id,
      code: item.code,
      title: item.name,
      children: item.privileges.map((privilege) => ({
        id: privilege.id,
        code: privilege.code,
        title: privilege.name,
      })),
    }))
)

// Users selectors
const normalizeLanguage = (langCode: string): string => {
  switch (langCode) {
    case "ru":
      return "Русский"
    case "en":
      return "English"
    case "kk":
      return "Қазақша"
    default:
      return EmptyString
  }
}
const normalizeState = (state: string): string => {
  switch (state) {
    case "active":
      return "Активный"
    case "disabled":
      return "Не доступен"
    case "inactive":
      return "Не активный"
    default:
      return EmptyString
  }
}

export const selectTableUsersData = createSelector(
  (state: RootState) => state.users.users,
  (users): UsersTableData[] =>
    users.content.map((props) => ({
      ...props,
      gender: props.gender === "male" ? "Мужской" : "Женский",
      sessionJsx: props.has_single_rf_session ? (
        <span className="user-session true">{t("buttons.yes")}</span>
      ) : (
        <span className="user-session false">{t("buttons.no")}</span>
      ),
      language: normalizeLanguage(props.language),
      stateJsx: (
        <span className={`user-state ${props.state}`}>
          {normalizeState(props.state)}
        </span>
      ),
      created_date: normalizeDate(props.created_date),
      updated_date: normalizeDate(props.updated_date),
    }))
)

// Users privileges selectors
export const selectPrivileges = createSelector(
  (state: RootState) => state.users.privileges,
  (privilegesGroups): CollapseItemProps[] =>
    privilegesGroups.map((item) => ({
      id: item.id,
      code: item.code,
      title: item.name,
      children: item.privileges.map((privilege) => ({
        id: privilege.id,
        code: privilege.code,
        title: privilege.name,
      })),
    }))
)
