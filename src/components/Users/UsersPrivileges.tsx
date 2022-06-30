import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineFileExcel } from "react-icons/ai";
import { Column } from "react-table";
import { EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import i18n from "../../app/i18n";
import { setPrivilegeGroupItems } from "../../app/reducers/users";
import { getPrivilegesAction } from "../../app/reducers/users/actions";
import { selectPrivileges } from "../../app/reducers/users/selectors";
import { PrivilegeTypes } from "../../app/reducers/users/types";
import { PageActions, UsersPrivilegesWrapper } from "../../pages/Users/style";
import IconButton from "../Common/Button/icon";
import {
  ActionGroupWrapper,
  StyledInput,
  TableWrapper,
} from "../Common/styled";
import CustomTable from "../Common/Table";
import CollapseView from "./CollapseView";
import PageSelector from "./PageSelector";

const columns: Column<PrivilegeTypes>[] = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
];

function UsersPrivileges(): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  let privileges = useAppSelector(selectPrivileges);
  const privilegeGroupItems = useAppSelector(
    (state) => state.users.privilegeGroupItems
  );

  const [searchQuery, setSearchQuery] = useState<string>(EmptyString);

  const handleClickParent = (id: number) => {
    dispatch(setPrivilegeGroupItems(id));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value.toLowerCase());

  if (searchQuery.length)
    privileges = privileges.filter((item) =>
      item.title.toLowerCase().includes(searchQuery)
    );

  useEffect(() => {
    dispatch(getPrivilegesAction());
  }, [dispatch]);

  return (
    <>
      <PageActions>
        <PageSelector defaultValue={2} />
        <ActionGroupWrapper>
          <StyledInput
            placeholder={t("placeholders.searchByName")}
            className="search"
            width="300px"
            value={searchQuery}
            onChange={handleChangeInput}
          />
          <IconButton onClick={() => {}} popupText={t("buttons.export")}>
            <AiOutlineFileExcel />
          </IconButton>
        </ActionGroupWrapper>
      </PageActions>
      <UsersPrivilegesWrapper>
        <div className="users-privileges__list">
          <CollapseView
            handleClickParent={handleClickParent}
            items={privileges}
          />
        </div>
        <div className="users-privileges__details">
          <TableWrapper height="calc(100vh - 215px)">
            <CustomTable<PrivilegeTypes>
              data={privilegeGroupItems}
              columns={columns}
              selectedRow={EmptyString}
            />
          </TableWrapper>
        </div>
      </UsersPrivilegesWrapper>
    </>
  );
}

export default UsersPrivileges;
