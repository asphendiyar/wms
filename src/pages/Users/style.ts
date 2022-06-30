import styled from "styled-components"
import { appColors } from "../../app/helpers"

export const UsersPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .right {
    width: 25%;
  }
  .left {
    flex: 1;
    min-width: 500px;
  }
  .user-state {
    padding: 2px 3px;
    color: ${appColors.white};
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
    &.active {
      background-color: ${appColors.green};
    }
    &.disabled {
      background-color: ${appColors.gray};
    }
    &.inactive {
      background-color: ${appColors.error};
    }
  }
  .user-session {
    padding: 2px 3px;
    color: ${appColors.white};
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
    &.true {
      background-color: ${appColors.green};
    }
    &.false {
      background-color: ${appColors.error};
    }
  }
`
export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  &.users-privileges__page-actions {
    margin-bottom: 0;
  }
`
export const RightColumnTitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  margin-top: 7px;
`
export const CollapseViewWrapper = styled.div<{ maxHeight?: string }>`
  height: 100%;
  max-height: ${({ maxHeight }) => maxHeight || "auto"};
  overflow-y: auto;
`
export const CollapseItemTitle = styled.div`
  padding: 10px;
  background-color: ${appColors.white};
  box-shadow: -4px 0px 9px rgba(82, 89, 122, 0.08),
    4px 4px 11px rgba(82, 89, 122, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover,
  &.expanded {
    color: ${appColors.primary};
  }
  .collapse-item__title {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .collapse-item__title-text {
    font-size: 14px;
    margin: 0;
  }
  .collapse-item__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
export const CollapseItemChildrenWrapper = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: -4px 0px 9px rgba(82, 89, 122, 0.08),
    4px 4px 11px rgba(82, 89, 122, 0.08);
  background-color: ${appColors.white};
  &.expanded {
    display: block;
  }
  &.collapsed {
    display: none;
  }
`
export const PrivilegeListItemChildrenWrapper = styled(
  CollapseItemChildrenWrapper
)`
  box-shadow: none;
  border-radius: none;
  padding: 0;
  padding-left: 40px;
`
export const PrivilegeListItemTitle = styled(CollapseItemTitle)`
  box-shadow: none;
  border-radius: none;
  .collapse-item__title {
    gap: unset;
  }
`
export const FormPrivilegesWrapper = styled.div`
  .form-privileges__selected {
    position: relative;
    border-radius: 5px;
    padding: 5px 10px;
    border: 2px solid;
    border-color: ${appColors.silver};
    color: ${appColors.black};
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover,
    &.expanded {
      border-color: ${appColors.darkGray};
      transition: 0.05s;
    }
    margin-bottom: 15px;
  }
  .form-privileges__selected-label.absolute {
    position: absolute;
    top: -8px;
    left: 4px;
    background-color: #fff;
    color: ${appColors.primary};
    font-size: 11px;
    font-weight: bold;
    padding: 0 5px;
  }
  .form-privileges__selected-item {
    padding: 2px 3px;
    border-radius: 2px;
    background-color: ${appColors.lightGray};
    margin: 2px;
    display: inline-block;
    z-index: 1;
    &:hover {
      background-color: ${appColors.primaryTransparent};
    }
  }
  .form-privileges__list {
    height: calc(100vh - 425px);
    overflow-y: auto;
    opacity: 0;
    visibility: hidden;
    border: 2px solid;
    border-color: ${appColors.silver};
    border-radius: 5px;
  }
  .form-privileges__list.show {
    opacity: 1;
    visibility: visible;
  }
`
export const EmptyMessage = styled.div`
  text-align: center;
  margin-top: 50px;
`
export const BreadcrumbWrapper = styled.div`
  padding: 8px 10px;
  background-color: ${appColors.white};
  border-radius: 5px;
  border: 2px solid ${appColors.lightGray};
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  a {
    color: ${appColors.black};
    text-decoration: none;
    &:hover {
      color: ${appColors.primary};
    }
  }
  .users-groups__group-name {
    color: ${appColors.primary};
  }
`
export const UserGroupsWrapper = styled.div`
  margin-top: 30px;
`
export const UserGroupsItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: -4px 0px 9px rgba(82, 89, 122, 0.08),
    4px 4px 11px rgba(82, 89, 122, 0.08);
  background-color: ${appColors.white};
  color: ${appColors.black};
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 5px;
  &.ml-30 {
    margin-left: 30px;
  }
`
export const FormUsersGroupsWrapper = styled.div`
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`
export const FormUsersGroupsContainer = styled.div`
  flex: 1;
`
export const StyledFormUsersGroups = styled.div`
  border-radius: 5px;
  padding: 0 10px 5px;
  border: 2px solid;
  border-color: ${appColors.silver};
  height: calc(100vh - 278px);
  overflow-y: auto;
  &.pt-10 {
    padding-top: 10px;
  }
  .form-users-groups__actions {
    background-color: ${appColors.white};
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    padding-top: 10px;
    gap: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
    margin-bottom: 10px;
    border-bottom: 2px solid ${appColors.ligherGray};
  }
  .form-users-groups {
    display: flex;
    gap: 20px;
  }
  .form-users-groups__item {
    margin-bottom: 10px;
  }
`

// Users privileges
export const UsersPrivilegesWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  .users-privileges__list {
    width: 40%;
  }
  .users-privileges__details {
    flex: 1;
  }
`

// Warehouses list into user form
