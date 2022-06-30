import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router-dom";
import { RouteEnums } from "../../app/commonTypes";
import { PageTitle } from "../../components/Common/styled";
import UsersGroupProfiles from "../../components/Users/UsersGroupProfiles";
import UsersGroups from "../../components/Users/UsersGroups";
import UsersList from "../../components/Users/UsersList";
import UsersPrivileges from "../../components/Users/UsersPrivileges";

const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.users");
  });
  return (
    <div className="users-page_wrapper">
      <PageTitle>{t("pageTitle.users")}</PageTitle>
      <Switch>
        <Route exact path={RouteEnums.usersGroups}>
          <UsersGroups />
        </Route>
        <Route exact path={RouteEnums.oneUsersGroupProfiles}>
          <UsersGroupProfiles />
        </Route>
        <Route exact path={RouteEnums.usersList}>
          <UsersList />
        </Route>
        <Route exact path={RouteEnums.usersPrivileges}>
          <UsersPrivileges />
        </Route>
        <Redirect to={RouteEnums.usersGroups} />
      </Switch>
    </div>
  );
};
export default UsersPage;
