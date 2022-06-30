import {
  ChangeEvent,
  KeyboardEvent as KeyboardEventReact,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineFileExcel,
  AiOutlinePlus,
  AiOutlineReload,
} from "react-icons/ai"
import { useHistory } from "react-router-dom"
import { Column } from "react-table"
import { RouteEnums } from "../../app/commonTypes"
import {
  appColors,
  checkPrivilege,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  clearOneUsersGroupPrivileges,
  setOneUsersGroupFormValues,
} from "../../app/reducers/users"
import {
  getOneUsersGroupAction,
  getOneUsersGroupPrivilegesAction,
  getUsersGroupsAction,
  getUsersGroupsByNameAction,
} from "../../app/reducers/users/actions"
import {
  selectUsersGroups,
  selectUsersGroupsList,
} from "../../app/reducers/users/selectors"
import { UserEnums } from "../../app/reducers/users/types"
import { PageActions, UsersPageWrapper } from "../../pages/Users/style"
import Alert, { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import Modal from "../Common/Modal"
import {
  ActionGroupWrapper,
  MoreButton,
  StyledInput,
  TableWrapper,
} from "../Common/styled"
import CustomTable from "../Common/Table"
import UserGroupForm from "./Forms/UsersGroupsForm"
import PageSelector from "./PageSelector"
import UsersGroupPrivileges from "./UsersGroupPrivileges"

export interface UsersGroupsTableData {
  id: number
  name: string
  created_date: string
  updated_date: string
}

const columns: Column<UsersGroupsTableData>[] = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.created_date"),
    accessor: "created_date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.updated_date"),
    accessor: "updated_date",
    Cell: (row) => normalizeDate(row.value),
  },
]

function UsersGroups(): JSX.Element {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { total_elements, number, number_of_elements } =
    useAppSelector(selectUsersGroups)
  const data = useAppSelector(selectUsersGroupsList)

  const isFetchingGetOneUsersGroup = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.getOneUsersGroup)
  )
  const putIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.putUsersGroup)
  )
  const postIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.postUsersGroup)
  )
  const putRequestError = useAppSelector((state) =>
    namedRequestError(state, UserEnums.putUsersGroup)
  )
  const postRequestError = useAppSelector((state) =>
    namedRequestError(state, UserEnums.postUsersGroup)
  )
  const oneUsersGroupFormValues = useAppSelector(
    (state) => state.users.oneUsersGroupFormValues
  )
  const editMode: boolean =
    useAppSelector((state) => state.users.oneUsersGroupFormValues) !== null

  const [rightState, setRightState] = useState<boolean>(false)
  const [selectedUsersGroup, setSelectedUsersGroup] = useState<number | string>(
    EmptyString
  )
  const [formModalState, setFormModalState] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>(EmptyString)

  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const history = useHistory()

  const handleClickMoreBtn = () => {
    dispatch(getUsersGroupsAction({ page: number + 1 }))
  }

  const handleClickRow = (args: UsersGroupsTableData) => {
    setRightState(true)
    setSelectedUsersGroup(Number(args.id))
    dispatch(setOneUsersGroupFormValues(Number(args.id)))
    dispatch(getOneUsersGroupPrivilegesAction({ groupId: args.id.toString() }))
  }

  const handleDoubleClickRow = (args: UsersGroupsTableData) => {
    history.push(`${RouteEnums.usersGroups}/${args.id}/profiles`)
  }

  const handleClickAdd = () => {
    dispatch(setOneUsersGroupFormValues())
    setFormModalState(true)
  }

  const handleClickEdit = () => {
    setFormModalState(true)
    oneUsersGroupFormValues?.id &&
      dispatch(getOneUsersGroupAction(oneUsersGroupFormValues?.id))
  }

  const handleCloseFormModal = () => setFormModalState(false)

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value)

  const handleKeyPressSearchInput = (
    e: KeyboardEventReact<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      dispatch(getUsersGroupsByNameAction({ page: 1, name: searchQuery }))
    }
  }

  const handleClickResetFilter = () => {
    dispatch(getUsersGroupsAction({ page: 1, setFirst: true }))
    dispatch(clearOneUsersGroupPrivileges())
    setSearchQuery(EmptyString)
  }

  useEffect(() => {
    if (putIsFetching === "success" || postIsFetching === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(
              filterRequests(
                editMode ? UserEnums.putUsersGroup : UserEnums.postUsersGroup
              )
            )
          },
        },
      ])
      handleCloseFormModal()
      selectedUsersGroup &&
        dispatch(
          getOneUsersGroupPrivilegesAction({
            groupId: selectedUsersGroup.toString(),
          })
        )
    } else if (putIsFetching === "failed") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: putRequestError?.message ?? EmptyString,
          icon: AiOutlineClose,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(UserEnums.putUsersGroup))
          },
        },
      ])
    } else if (postIsFetching === "failed") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: postRequestError?.message ?? EmptyString,
          icon: AiOutlineClose,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(UserEnums.postUsersGroup))
          },
        },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, postIsFetching, putIsFetching])

  useEffect(() => {
    number === 0 && dispatch(getUsersGroupsAction({ page: 1 }))
  }, [dispatch, number])

  return (
    <UsersPageWrapper>
      <div className="left">
        <PageActions>
          <PageSelector defaultValue={0} />
          <ActionGroupWrapper>
            <StyledInput
              placeholder={t("placeholders.searchByName")}
              className="search"
              value={searchQuery}
              onChange={handleChangeSearchQuery}
              onKeyPress={handleKeyPressSearchInput}
            />
            <IconButton
              onClick={handleClickResetFilter}
              popupText={t("buttons.resetFilter")}
            >
              <AiOutlineReload />
            </IconButton>
            {checkPrivilege("UserManagerbrw", "Create") && (
              <IconButton onClick={handleClickAdd} popupText={t("buttons.new")}>
                <AiOutlinePlus />
              </IconButton>
            )}
            {checkPrivilege("UserManagerbrw", "Modify") && (
              <IconButton
                onClick={handleClickEdit}
                popupText={t("buttons.edit")}
              >
                <AiOutlineEdit />
              </IconButton>
            )}

            <IconButton onClick={() => {}} popupText={t("buttons.export")}>
              <AiOutlineFileExcel />
            </IconButton>
          </ActionGroupWrapper>
        </PageActions>
        <TableWrapper height="calc(100vh - 215px)">
          <CustomTable<UsersGroupsTableData>
            columns={columns}
            data={data}
            handleClickRow={handleClickRow}
            handleDoubleClickRow={handleDoubleClickRow}
            selectedRowChecker="id"
            selectedRow={selectedUsersGroup}
          />
        </TableWrapper>
        {data.length !== 0 &&
          Math.ceil(total_elements / number_of_elements) !== number && (
            <MoreButton onClick={handleClickMoreBtn}>
              {t("buttons.showMore")}
            </MoreButton>
          )}
      </div>
      {rightState && (
        <div className="right">
          <UsersGroupPrivileges setBlockState={setRightState} />
        </div>
      )}
      <Modal
        open={formModalState}
        title={editMode ? t("buttons.edit") : t("buttons.new")}
        onClose={handleCloseFormModal}
        className="side users-group"
      >
        {isFetchingGetOneUsersGroup === "pending" ? (
          <div>Loading</div>
        ) : (
          <UserGroupForm onClose={handleCloseFormModal} />
        )}
      </Modal>

      <Alert alertList={alertList} autoDelete timeout={4000} />
    </UsersPageWrapper>
  )
}

export default UsersGroups
