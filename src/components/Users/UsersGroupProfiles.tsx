import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineEdit,
  AiOutlineFileExcel,
  AiOutlinePlus,
} from "react-icons/ai"
import { MdKeyboardArrowRight } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import { Column } from "react-table"
import { RouteEnums } from "../../app/commonTypes"
import { EmptyString } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { clearOneUsersGroupProfiles } from "../../app/reducers/users"
import { getOneUsersGroupProfilesAction } from "../../app/reducers/users/actions"
import { OneUsersGroupProfilesResponseContent } from "../../app/reducers/users/types"
import {
  BreadcrumbWrapper,
  PageActions,
  UsersPageWrapper,
} from "../../pages/Users/style"
import IconButton from "../Common/Button/icon"
import { ActionGroupWrapper, StyledInput, TableWrapper } from "../Common/styled"
import CustomTable from "../Common/Table"

function useUsersGroupName(id: number): string {
  const [currentUsersGroupName, setCurrentUsersGroupName] =
    useState<string>(EmptyString)
  const usersGroups = useAppSelector((state) => state.users.usersGroups)

  useEffect(() => {
    setCurrentUsersGroupName(
      usersGroups.content.find((item) => item.id === id)?.name || EmptyString
    )
  }, [id, usersGroups.content])

  return currentUsersGroupName
}

const columns: Column<OneUsersGroupProfilesResponseContent>[] = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.login"),
    accessor: "login",
  },
  {
    Header: () => i18n.t("columns.last_name"),
    accessor: "last_name",
  },
  {
    Header: () => i18n.t("columns.first_name"),
    accessor: "first_name",
  },
  {
    Header: () => i18n.t("columns.middle_name"),
    accessor: "middle_name",
  },
]

const UsersGroupProfiles: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  const usersGroupProfiles = useAppSelector(
    (state) => state.users.oneUsersGroupProfiles.content
  )

  const currentUsersGroupName = useUsersGroupName(Number(id))

  useEffect(() => {
    dispatch(getOneUsersGroupProfilesAction({ groupId: id, page: 1 }))
    return () => {
      dispatch(clearOneUsersGroupProfiles())
    }
  }, [dispatch, id])

  return (
    <UsersPageWrapper>
      <div className="left">
        <PageActions>
          <BreadcrumbWrapper>
            <Link to={RouteEnums.usersGroups}>{t("tabs.groups")}</Link>
            <MdKeyboardArrowRight />
            <span className="users-groups__group-name">
              {currentUsersGroupName}
            </span>
          </BreadcrumbWrapper>
          <ActionGroupWrapper>
            <StyledInput
              placeholder={t("placeholders.searchByName")}
              className="search"
            />
            <IconButton onClick={() => {}} popupText={t("buttons.new")}>
              <AiOutlinePlus />
            </IconButton>
            <IconButton onClick={() => {}} popupText={t("buttons.edit")}>
              <AiOutlineEdit />
            </IconButton>
            <IconButton onClick={() => {}} popupText={t("buttons.export")}>
              <AiOutlineFileExcel />
            </IconButton>
          </ActionGroupWrapper>
        </PageActions>
        <TableWrapper height="calc(100vh - 215px)">
          <CustomTable<OneUsersGroupProfilesResponseContent>
            columns={columns}
            data={usersGroupProfiles}
            selectedRowChecker="id"
            selectedRow={EmptyString}
          />
        </TableWrapper>
      </div>
    </UsersPageWrapper>
  )
}

export default UsersGroupProfiles
