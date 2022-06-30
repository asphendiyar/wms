import {
  ChangeEvent,
  KeyboardEvent as KeyboardEventReact,
  useEffect,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineFileExcel,
  AiOutlinePlus,
  AiOutlinePrinter,
  AiOutlineReload,
  AiOutlineWarning,
} from "react-icons/ai"
import { Column } from "react-table"
import {
  appColors,
  checkPrivilege,
  EmptyString,
  normalizeDate,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { BASE_URL, pathnames } from "../../app/pathnames"
import {
  filterRequests,
  namedRequestsInProgress,
} from "../../app/reducers/requests"
import {
  clearOneUserFormValues,
  setOneUserFormValues,
} from "../../app/reducers/users"
import {
  getAllUsersAction,
  getOneUserAction,
  getUsersByNameAction,
  getUsersGroupsAction,
} from "../../app/reducers/users/actions"
import { selectTableUsersData } from "../../app/reducers/users/selectors"
import { BaseUserFields, UserEnums } from "../../app/reducers/users/types"
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
import UserForm from "./Forms/UserForm"
import PageSelector from "./PageSelector"
import UserGroups from "./UserGroups"

export interface UsersTableData extends BaseUserFields {
  id: number
  stateJsx: JSX.Element
  sessionJsx: JSX.Element
  created_date: string
  updated_date: string
}

const columns: Column<UsersTableData>[] = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
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
  {
    Header: () => i18n.t("columns.login"),
    accessor: "login",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "stateJsx",
  },
  {
    Header: () => i18n.t("columns.position"),
    accessor: "position",
  },
  {
    Header: () => i18n.t("columns.department"),
    accessor: "department",
  },
  {
    Header: () => i18n.t("columns.gender"),
    accessor: "gender",
  },
  {
    Header: () => i18n.t("columns.phone_number"),
    accessor: "phone_number",
  },
  {
    Header: () => i18n.t("columns.email"),
    accessor: "email",
  },
  {
    Header: () => i18n.t("columns.language"),
    accessor: "language",
  },
  {
    Header: () => i18n.t("columns.session"),
    accessor: "sessionJsx",
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

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const data = useAppSelector(selectTableUsersData)
  const { total_elements, number, number_of_elements } = useAppSelector(
    (state) => state.users.users
  )
  const putIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.putUser)
  )
  const postIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.postUser)
  )
  const usersGroups = useAppSelector((state) => state.users.usersGroups)
  const [rightState, setRightState] = useState<boolean>(false)
  const [selectedUserID, setSelectedUserID] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [formModalState, setFormModalState] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>(EmptyString)

  const [alertList, setAlertList] = useState<AlertListItem[]>([])

  const editMode =
    useAppSelector((state) => state.users.oneUserFormValues) !== null

  const handleClickMoreBtn = () => {
    dispatch(getAllUsersAction({ page: number + 1 }))
  }
  const handleClickRow = (args: UsersTableData) => {
    setRightState(true)
    setSelectedUserID(args.id)
    dispatch(getOneUserAction(args.login))
    setSelectedUser(args.login)
  }
  const handleClickAdd = () => {
    setFormModalState(true)
    dispatch(clearOneUserFormValues())
    // This request returns all users groups to user form
    usersGroups.number === 0 && dispatch(getUsersGroupsAction({ page: 1 }))
  }
  const handleClickEdit = () => {
    setFormModalState(true)
    dispatch(setOneUserFormValues(selectedUserID))
    // This request returns all users groups to user form
  }

  const handleCloseFormModal = () => setFormModalState(false)
  const handlePrintUserBadge = () => {
    selectedUser
      ? window.open(
          `${BASE_URL + pathnames.printing}profile/badge/${selectedUser}`
        )
      : setAlertList([
          ...alertList,
          {
            id: randomNumberIdGenerator(),
            title: t("alerts.warning"),
            message: t("alerts.warningMessage"),
            icon: AiOutlineWarning,
            bgColor: appColors.warning,
          },
        ])
  }
  const handleClickResetFilter = () => {
    dispatch(getAllUsersAction({ page: 1, setFirst: true }))
    setSearchQuery(EmptyString)
  }
  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const handleKeyPressSearchInput = (
    e: KeyboardEventReact<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      dispatch(getUsersByNameAction({ page: 1, profile: searchQuery }))
    }
  }

  useEffect(() => {
    number === 0 && dispatch(getAllUsersAction({ page: 1 }))
  }, [dispatch, number])

  useEffect(() => {
    dispatch(getUsersGroupsAction({ page: 1, setFirst: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              filterRequests(editMode ? UserEnums.putUser : UserEnums.postUser)
            )
          },
        },
      ])
      handleCloseFormModal()
      dispatch(getAllUsersAction({ page: 1, setFirst: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [putIsFetching, postIsFetching, dispatch])

  return (
    <UsersPageWrapper>
      <div className="left">
        <PageActions>
          <PageSelector defaultValue={1} />
          <ActionGroupWrapper>
            <StyledInput
              placeholder={t("placeholders.typeHere")}
              className="search"
              width="300px"
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
            {checkPrivilege("UserManagerbrw", "Print") && (
              <IconButton
                onClick={handlePrintUserBadge}
                popupText={t("buttons.print")}
              >
                <AiOutlinePrinter />
              </IconButton>
            )}

            <IconButton onClick={() => {}} popupText={t("buttons.export")}>
              <AiOutlineFileExcel />
            </IconButton>
          </ActionGroupWrapper>
        </PageActions>
        <TableWrapper height="calc(100vh - 215px)">
          <CustomTable<UsersTableData>
            columns={columns}
            data={data}
            handleClickRow={handleClickRow}
            selectedRowChecker="id"
            selectedRow={selectedUserID}
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
          <UserGroups setBlockState={setRightState} />
        </div>
      )}
      <Modal
        open={formModalState}
        title={editMode ? t("buttons.edit") : t("buttons.new")}
        onClose={handleCloseFormModal}
        className="side users-form"
      >
        <UserForm onClose={handleCloseFormModal} />
      </Modal>

      <Alert alertList={alertList} autoDelete timeout={4000} />
    </UsersPageWrapper>
  )
}

export default UsersList
