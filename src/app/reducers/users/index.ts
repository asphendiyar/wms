import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EmptyString } from "../../helpers"
import {
  BaseUsersResponse,
  FormCheckboxActionPayload,
  FormPrivilegesGroup,
  OneUsersGroup,
  OneUsersGroupProfilesResponse,
  OneUserTypes,
  PrivilegesGroupTypes,
  PrivilegeTypes,
  UsersGroupsResponse,
  UsersInitials,
  UsersResponse,
} from "./types"

const baseUsersInitials: BaseUsersResponse = {
  total_elements: 0,
  number: 0,
  number_of_elements: 0,
  total_pages: 0,
}
const usersInitials: UsersResponse = { ...baseUsersInitials, content: [] }
const usersGroupsInitials: UsersGroupsResponse = {
  ...usersInitials,
  content: [],
}
const oneUsersGroupProfilesInitials: OneUsersGroupProfilesResponse = {
  ...usersInitials,
  content: [],
}
const initialState: UsersInitials = {
  // Users groups initials
  usersGroups: usersGroupsInitials,
  oneUsersGroup: undefined,
  oneUsersGroupPrivileges: [],
  oneUsersGroupFormValues: null,
  oneUsersGroupProfiles: oneUsersGroupProfilesInitials,
  formUsersGroups: [],
  oneUsersGroupPrivilegeIds: [],
  // Users initials
  users: usersInitials,
  userGroups: [],
  oneUserFormValues: null,
  oneUserData: {} as OneUserTypes,
  oneUserWarehouses: [],
  // Privileges initials
  privileges: [],
  formPrivileges: [],
  privilegeGroupItems: [],
}

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersGroups: (state, action: PayloadAction<UsersGroupsResponse>) => {
      state.usersGroups = {
        ...action.payload,
        content: [...state.usersGroups.content, ...action.payload.content],
      }
      state.formUsersGroups = [
        ...state.formUsersGroups,
        ...action.payload.content.map((item) => ({
          id: item.id,
          name: item.name,
          checked:
            state.userGroups.find((ug) => ug.id === item.id)?.checked ?? false,
        })),
      ]
    },
    setUsersGroupsFirstPage: (
      state,
      action: PayloadAction<UsersGroupsResponse>
    ) => {
      state.usersGroups = action.payload
      state.formUsersGroups = action.payload.content.map((item) => ({
        id: item.id,
        name: item.name,
        checked: false,
      }))
    },
    setOneUsersGroup: (state, action: PayloadAction<OneUsersGroup>) => {
      state.oneUsersGroup = action.payload
      if (state.oneUsersGroupFormValues)
        state.oneUsersGroupFormValues = {
          ...state.oneUsersGroupFormValues,
          name_en: action.payload.name_en,
          name_kk: action.payload.name_kk,
          name_ru: action.payload.name_ru,
        }
    },
    setFormUsersGroups: (
      state,
      action: PayloadAction<FormCheckboxActionPayload>
    ) => {
      state.formUsersGroups = state.formUsersGroups.map((item) => {
        if (item.id === action.payload.id) {
          const currentUserGroup = state.userGroups.find(
            (ug) => ug.id === item.id
          )
          if (!currentUserGroup && action.payload.checked)
            state.userGroups.push({ ...item, checked: true })
          return { ...item, checked: action.payload.checked }
        } else return item
      })
      state.userGroups = state.userGroups.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, checked: action.payload.checked }
        } else return item
      })
    },
    clearFormUsersGroups: (
      state,
      action: PayloadAction<"setFalse" | undefined>
    ) => {
      if (action.payload === "setFalse") {
        state.formUsersGroups = state.formUsersGroups.map((item) => ({
          ...item,
          checked: false,
        }))
      } else state.formUsersGroups = []
    },
    setUsersGroupsByName: (
      state,
      action: PayloadAction<UsersGroupsResponse>
    ) => {
      state.usersGroups = action.payload.content
        ? action.payload
        : { ...action.payload, content: [] }

      state.formUsersGroups = action.payload.content
        ? action.payload.content.map((item) => ({
            id: item.id,
            name: item.name,
            checked: false,
          }))
        : []
    },
    setOneUsersGroupPrivileges: (
      state,
      action: PayloadAction<PrivilegesGroupTypes[]>
    ) => {
      state.oneUsersGroupPrivileges = action.payload
      state.oneUsersGroupPrivilegeIds = action.payload.flatMap((item) =>
        item.privileges.map((privilege) => privilege.id)
      )
    },
    clearOneUsersGroupPrivileges: (state) => {
      state.oneUsersGroupPrivileges = []
    },
    clearOneUsersGroupPrivilegesIds: (state) => {
      state.oneUsersGroupPrivilegeIds = []
    },
    setOneUsersGroupFormValues: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.oneUsersGroupFormValues = action.payload
        ? {
            id: action.payload.toString(),
            name_kk:
              state.usersGroups.content.find(
                (item) => item.id === action.payload
              )?.name || EmptyString,
            name_en: EmptyString,
            name_ru: EmptyString,
            privileges: state.oneUsersGroupPrivileges.flatMap((item) =>
              item.privileges.map((privilege) => privilege.id)
            ),
          }
        : null
    },
    setOneUsersGroupProfiles: (
      state,
      action: PayloadAction<OneUsersGroupProfilesResponse>
    ) => {
      state.oneUsersGroupProfiles = action.payload.content
        ? action.payload
        : { ...action.payload, content: [] }
    },
    clearOneUsersGroupProfiles: (state) => {
      state.oneUsersGroupProfiles = oneUsersGroupProfilesInitials
    },

    // Users actions
    setUsers: (state, action: PayloadAction<UsersResponse>) => {
      state.users = {
        ...action.payload,
        content: [...state.users.content, ...action.payload.content],
      }
    },
    setUsersFirstPage: (state, action: PayloadAction<UsersResponse>) => {
      state.users = action.payload
    },
    setUsersByName: (state, action: PayloadAction<UsersResponse>) => {
      state.users = action.payload.content
        ? action.payload
        : { ...action.payload, content: [] }
    },
    setOneUserData: (state, action: PayloadAction<OneUserTypes>) => {
      state.oneUserData = action.payload
      state.oneUserWarehouses = action.payload.warehouses.map((item) => ({
        warehouseId: item.id,
        warehouseName: item.name,
        fZones: item.functional_zones.map((fZone) => ({
          fZoneId: fZone.id,
          fZoneName: fZone.name,
        })),
      }))
      const accessGroups = action.payload.access_groups
      if (accessGroups) {
        state.userGroups = accessGroups.map((item) => ({
          ...item,
          checked: true,
        }))
        state.formUsersGroups = state.formUsersGroups.map((item) => ({
          id: item.id,
          name: item.name,
          checked: accessGroups.find((ag) => ag.id === item.id) ? true : false,
        }))
      } else {
        state.userGroups = []
        state.formUsersGroups = state.formUsersGroups.map((item) => ({
          ...item,
          checked: false,
        }))
      }
    },
    setOneUserFormValues: (state, action: PayloadAction<number>) => {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        created_date,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        created_by,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updated_date,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updated_by,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        name,
        ...props
      } = state.oneUserData
      state.oneUserFormValues = {
        ...props,
        password: EmptyString,
        access_groups: state.userGroups.map((item) => item.id),
        warehouses: props.warehouses.map((item) => ({
          warehouse_id: item.id,
          functional_zones: item.functional_zones.map((fZone) => fZone.id),
        })),
      }
    },
    clearOneUserFormValues: (state) => {
      state.oneUserFormValues = null
    },

    // Privileges actions
    setPrivileges: (state, action: PayloadAction<PrivilegesGroupTypes[]>) => {
      const checkPrivilegeGroup = (privileges: PrivilegeTypes[]): boolean => {
        let checked = false
        for (let i = 0; i < privileges.length; i++) {
          if (state.oneUsersGroupPrivilegeIds.includes(privileges[i].id)) {
            checked = true
            break
          }
        }
        return checked
      }

      state.privileges = action.payload
      state.formPrivileges = state.privileges.map((item) => {
        const newItem: FormPrivilegesGroup = {
          id: `privilegeGroup-${item.id}`,
          code: item.code,
          name: item.name,
          checked: checkPrivilegeGroup(item.privileges),
          privileges: item.privileges.map((privilege) => ({
            ...privilege,
            id: `privilege-${privilege.id}`,
            checked: state.oneUsersGroupPrivilegeIds.includes(privilege.id),
          })),
        }
        return newItem
      })
    },
    setFormPrivileges: (
      state,
      action: PayloadAction<FormCheckboxActionPayload>
    ) => {
      state.formPrivileges = state.formPrivileges.map((item) => {
        if (item.id === action.payload.id) {
          item = {
            ...item,
            checked: action.payload.checked,
            privileges: item.privileges?.map((privilege) => ({
              ...privilege,
              checked: action.payload.checked,
            })),
          }
        } else {
          item.privileges = item.privileges?.map(
            (privilege, index, currentArray) => {
              if (privilege.id === action.payload.id) {
                privilege.checked = action.payload.checked
                if (!action.payload.checked) {
                  let hasChecked = false
                  for (let i = 0; i < currentArray.length; i++) {
                    if (currentArray[i].checked) {
                      hasChecked = true
                      break
                    }
                  }
                  if (!hasChecked) item.checked = action.payload.checked
                } else item.checked = action.payload.checked
              }
              return privilege
            }
          )
        }
        return item
      })
    },
    clearFormPrivileges: (state) => {
      state.formPrivileges = []
    },
    setPrivilegeGroupItems: (state, action: PayloadAction<number>) => {
      state.privilegeGroupItems =
        state.privileges.find((item) => item.id === action.payload)
          ?.privileges || []
    },
  },
})

export const {
  // Users groups actions
  setUsersGroups,
  setOneUsersGroup,
  setUsersGroupsByName,
  setOneUsersGroupPrivileges,
  clearOneUsersGroupPrivilegesIds,
  setOneUsersGroupProfiles,
  clearOneUsersGroupProfiles,
  clearOneUsersGroupPrivileges,
  setOneUsersGroupFormValues,
  setFormUsersGroups,
  clearFormUsersGroups,
  setUsersGroupsFirstPage,
  // Users actions
  setUsers,
  setOneUserFormValues,
  clearOneUserFormValues,
  setUsersByName,
  setUsersFirstPage,
  setOneUserData,
  // Privileges actions
  setPrivileges,
  setFormPrivileges,
  clearFormPrivileges,
  setPrivilegeGroupItems,
} = usersReducer.actions

export default usersReducer.reducer
