import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineReload } from "react-icons/ai"
import { EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  clearFormUsersGroups,
  setFormUsersGroups,
} from "../../../app/reducers/users"
import {
  getUsersGroupsAction,
  getUsersGroupsByNameAction,
} from "../../../app/reducers/users/actions"
import { UserAccessGroup } from "../../../app/reducers/users/types"
import {
  FormUsersGroupsContainer,
  FormUsersGroupsWrapper,
  StyledFormUsersGroups,
} from "../../../pages/Users/style"
import IconButton from "../../Common/Button/icon"
import Checkbox from "../../Common/Checkbox"
import { MoreButton, StyledInput, Title } from "../../Common/styled"

interface CheckboxWrapperProps extends UserAccessGroup {
  handleChange: (id: number, checked: boolean) => void
}

const CheckboxWrapper: React.FC<CheckboxWrapperProps> = ({
  id,
  checked,
  name,
  handleChange,
}) => {
  const [localChecked, setLocalChecked] = useState<boolean>(checked)
  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalChecked(!localChecked)
    handleChange(id, e.target.checked)
  }
  useEffect(() => {
    setLocalChecked(checked)
  }, [checked])
  return (
    <div className="form-users-groups__item">
      <Checkbox
        label={name}
        value={localChecked}
        onChange={handleChangeCheckbox}
      />
    </div>
  )
}

const FormUsersGroups: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { number, total_elements, number_of_elements } = useAppSelector(
    (state) => state.users.usersGroups
  )
  const formUsersGroups = useAppSelector((state) => state.users.formUsersGroups)
  const userGroups = useAppSelector((state) => state.users.userGroups)

  const [searchQuery, setSearchQuery] = useState<string>(EmptyString)

  const handleClickMoreBtn = () => {
    dispatch(getUsersGroupsAction({ page: number + 1 }))
  }

  const handleChangeCheckbox = (id: number, checked: boolean) => {
    dispatch(setFormUsersGroups({ id, checked }))
  }

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value)

  const handleKeyPressSearchInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(getUsersGroupsByNameAction({ page: 1, name: searchQuery }))
    }
  }

  const handleClickReload = () => {
    dispatch(clearFormUsersGroups())
    dispatch(getUsersGroupsAction({ page: 1 }))
  }

  return (
    <FormUsersGroupsWrapper className="d-flex">
      <FormUsersGroupsContainer>
        <Title className="mb-10">Все группы</Title>
        <StyledFormUsersGroups>
          <div className="form-users-groups__actions">
            <IconButton onClick={handleClickReload}>
              <AiOutlineReload />
            </IconButton>
            <StyledInput
              placeholder={t("placeholders.searchByName")}
              className="form-users-groups__search-group"
              onChange={handleChangeSearchInput}
              onKeyPress={handleKeyPressSearchInput}
              value={searchQuery}
            />
          </div>
          <div className="form-users-groups__list">
            {formUsersGroups.map((item) => (
              <CheckboxWrapper
                key={item.id}
                handleChange={handleChangeCheckbox}
                {...item}
              />
            ))}
          </div>
        </StyledFormUsersGroups>
        {Math.ceil(total_elements / number_of_elements) !== number && (
          <MoreButton onClick={handleClickMoreBtn}>
            {t("buttons.showMore")}
          </MoreButton>
        )}
      </FormUsersGroupsContainer>
      <FormUsersGroupsContainer>
        <Title className="mb-10">Группы пользователя</Title>
        <StyledFormUsersGroups className="pt-10">
          {userGroups.length > 0
            ? userGroups.map((item) => (
                <div className="form-users-groups__item" key={item.id}>
                  <CheckboxWrapper
                    handleChange={handleChangeCheckbox}
                    {...item}
                  />
                </div>
              ))
            : "Нет данных"}
        </StyledFormUsersGroups>
      </FormUsersGroupsContainer>
    </FormUsersGroupsWrapper>
  )
}

export default React.memo(FormUsersGroups)
