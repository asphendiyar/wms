import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { ReactSelectValues, RouteEnums } from "../../app/commonTypes";
import { customStyles, customTheme } from "../../app/helpers";

const PageSelector: React.FC<{ defaultValue: number }> = ({ defaultValue }) => {
  const history = useHistory();
  const handleChange = (option: ReactSelectValues) => {
    typeof option.value === "string" && history.push(option.value);
  };

  const { t } = useTranslation();

  return (
    <Select<ReactSelectValues>
      options={[
        { value: RouteEnums.usersGroups, label: `${t("tabs.groups")}` },
        { value: RouteEnums.usersList, label: `${t("tabs.users")}` },
        {
          value: RouteEnums.usersPrivileges,
          label: `${t("tabs.groupsPrivileges")}`,
        },
      ]}
      theme={customTheme}
      defaultValue={
        [
          { value: RouteEnums.usersGroups, label: `${t("tabs.groups")}` },
          { value: RouteEnums.usersList, label: `${t("tabs.users")}` },
          {
            value: RouteEnums.usersPrivileges,
            label: `${t("tabs.groupsPrivileges")}`,
          },
        ][defaultValue]
      }
      styles={customStyles({ width: 200 })}
      isSearchable={false}
      menuPortalTarget={document.body}
      onChange={(option) => option && handleChange(option)}
    />
  );
};

export default PageSelector;
