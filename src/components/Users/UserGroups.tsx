import { Dispatch, Fragment, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineHome } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { useAppSelector } from "../../app/hooks"
import { ReactComponent as UsersGroupIcon } from "../../assets/icons/users-group.svg"
import {
  EmptyMessage,
  RightColumnTitle,
  UserGroupsItem,
  UserGroupsWrapper,
} from "../../pages/Users/style"
import { CloseBtn, FlexJustifyBetween } from "../Common/styled"

type UserGroupsProps = {
  setBlockState: Dispatch<SetStateAction<boolean>>
}

const UserGroups: React.FC<UserGroupsProps> = ({ setBlockState }) => {
  const userGroups = useAppSelector((state) => state.users.userGroups)

  const userWarehouses = useAppSelector(
    (state) => state.users.oneUserWarehouses
  )

  const handleClose = () => setBlockState(false)
  const { t } = useTranslation()

  return (
    <>
      <FlexJustifyBetween>
        <RightColumnTitle>{t("tabs.groups")}</RightColumnTitle>
        <CloseBtn onClick={handleClose}>
          <IoMdClose />
        </CloseBtn>
      </FlexJustifyBetween>
      <Tabs>
        <TabList>
          <Tab>Группы</Tab>
          <Tab>Склады/Ф.зоны</Tab>
        </TabList>
        <TabPanel>
          <UserGroupsWrapper>
            {userGroups.length !== 0 ? (
              userGroups.map((item) => (
                <UserGroupsItem key={item.id}>
                  <UsersGroupIcon /> <span>{item.name}</span>
                </UserGroupsItem>
              ))
            ) : (
              <EmptyMessage> {t("alerts.noData")}</EmptyMessage>
            )}
          </UserGroupsWrapper>
        </TabPanel>
        <TabPanel>
          <UserGroupsWrapper>
            {userWarehouses.length !== 0 ? (
              userWarehouses.map((item) => (
                <Fragment key={item.warehouseId}>
                  <UserGroupsItem>
                    <AiOutlineHome /> <span>{item.warehouseName}</span>
                  </UserGroupsItem>
                  {item.fZones.map((fZone) => (
                    <UserGroupsItem className={"ml-30"} key={fZone.fZoneId}>
                      <AiOutlineHome /> <span>{fZone.fZoneName}</span>
                    </UserGroupsItem>
                  ))}
                </Fragment>
              ))
            ) : (
              <EmptyMessage> {t("alerts.noData")}</EmptyMessage>
            )}
          </UserGroupsWrapper>
        </TabPanel>
      </Tabs>
    </>
  )
}

export default UserGroups
