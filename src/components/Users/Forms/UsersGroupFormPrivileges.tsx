import React, { useEffect, useState } from "react";
import { FormPrivilegesWrapper } from "../../../pages/Users/style";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/icons/arrow-up.svg";
import { EmptyString } from "../../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import FormPrivilegesListItem from "./FormPrivilegesListItem";
import { FormPrivilegesGroup } from "../../../app/reducers/users/types";
import { setFormPrivileges } from "../../../app/reducers/users";
import { useTranslation } from "react-i18next";

type SelectedPrivilegesGroup = {
  id: string;
  label: string;
};

// This custom hooks generates selected privileges to display
function useSelectedPrivilegesGroup(
  privileges: FormPrivilegesGroup[]
): SelectedPrivilegesGroup[] {
  const [selectedPrivilegesGroups, setSelectedPrivilegesGroups] = useState<
    SelectedPrivilegesGroup[]
  >([]);

  useEffect(() => {
    setSelectedPrivilegesGroups(
      privileges
        .filter((item) => item.checked === true)
        .map((item) => ({ id: item.id, label: item.name }))
    );
  }, [privileges]);

  return selectedPrivilegesGroups;
}

const UsersGroupFormPrivileges: React.FC = () => {
  const dispatch = useAppDispatch();
  const formPrivileges = useAppSelector((state) => state.users.formPrivileges);
  const selectedFormPrivilegesGroups =
    useSelectedPrivilegesGroup(formPrivileges);

  const [listState, setListState] = useState<boolean>(false);

  const hasSelectedPrivilegesGroups: boolean =
    selectedFormPrivilegesGroups.length !== 0;

  const togglePrivilegesList = () => {
    setListState(!listState);
  };

  const handleClickSelectedPrivilegesGroup = (id: string) => {
    dispatch(setFormPrivileges({ id, checked: false }));
  };
  const { t } = useTranslation();
  return (
    <FormPrivilegesWrapper>
      <div
        className={`form-privileges__selected${
          listState ? " expanded" : EmptyString
        }`}
        onClick={togglePrivilegesList}
      >
        <div className="form-privileges__selected-items">
          <span
            className={`form-privileges__selected-label${
              hasSelectedPrivilegesGroups ? " absolute" : EmptyString
            }`}
          >
            {t("tabs.choosen")}
          </span>
          {selectedFormPrivilegesGroups.map((item) => (
            <span
              key={`privilege-group-${item.id}`}
              className="form-privileges__selected-item"
              onClick={(e) => {
                e.stopPropagation();
                handleClickSelectedPrivilegesGroup(item.id);
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
        {!listState ? <ArrowDown /> : <ArrowUp />}
      </div>
      <div
        className={`form-privileges__list${listState ? " show" : EmptyString}`}
      >
        {formPrivileges.map((item) => (
          <FormPrivilegesListItem key={item.code} {...item} />
        ))}
      </div>
    </FormPrivilegesWrapper>
  );
};

export default React.memo(UsersGroupFormPrivileges);
