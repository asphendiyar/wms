import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { useAppSelector } from "../../app/hooks";
import { selectOneUsersGroupPrivileges } from "../../app/reducers/users/selectors";
import { RightColumnTitle, EmptyMessage } from "../../pages/Users/style";
import { FlexJustifyBetween, CloseBtn } from "../Common/styled";
import CollapseView from "./CollapseView";

type UsersGroupPrivilegesProps = {
  setBlockState: Dispatch<SetStateAction<boolean>>;
};

const UsersGroupPrivileges: React.FC<UsersGroupPrivilegesProps> = ({
  setBlockState,
}) => {
  const usersGroupPrivileges = useAppSelector(selectOneUsersGroupPrivileges);

  const handleClose = () => setBlockState(false);

  const { t } = useTranslation();

  return (
    <>
      <FlexJustifyBetween className="mb-30">
        <RightColumnTitle>{t("tabs.groupsPrivileges")}</RightColumnTitle>
        <CloseBtn onClick={handleClose}>
          <IoMdClose />
        </CloseBtn>
      </FlexJustifyBetween>
      {usersGroupPrivileges.length === 0 ? (
        <EmptyMessage> {t("alerts.noData")}</EmptyMessage>
      ) : (
        <CollapseView items={usersGroupPrivileges} />
      )}
    </>
  );
};

export default UsersGroupPrivileges;
