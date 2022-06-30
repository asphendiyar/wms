import { useFormik } from "formik"
import React, { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactSwitch from "react-switch"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import * as Yup from "yup"
import { appColors, EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getDictionaryContentAction } from "../../../app/reducers/dictionary/actions"
import { dictionaryCodes } from "../../../app/reducers/dictionary/initials"
import { namedRequestsInProgress } from "../../../app/reducers/requests"
import {
  postUserAction,
  putUserAction,
} from "../../../app/reducers/users/actions"
import {
  SelectedWarehouses,
  UserEnums,
} from "../../../app/reducers/users/types"
import { Button } from "../../Common/Button"
import DynamicSelect from "../../Common/DynamicSelect"
import { InputWithLabel } from "../../Common/Input"
import { FormGroup, StyledErrorMessage, Title } from "../../Common/styled"
import FormUsersGroups from "./FormUsersGroups"
import UserWarehouses from "./UserWarehouses"

const generateYupFields = () => ({
  login: Yup.string().required("Обязательное поле"),
  state: Yup.string().required("Обязательное поле"),
  first_name: Yup.string().required("Обязательное поле"),
  last_name: Yup.string().required("Обязательное поле"),
  middle_name: Yup.string().required("Обязательное поле"),
  has_single_rf_session: Yup.boolean().required("Обязательное поле"),
  position: Yup.string().required("Обязательное поле"),
  department: Yup.string().required("Обязательное поле"),
  language: Yup.string().required("Обязательное поле"),
  gender: Yup.string().required("Обязательное поле"),
  phone_number: Yup.string().required("Обязательное поле"),
  email: Yup.string().required("Обязательное поле"),
})

const postValidationSchema = Yup.object().shape({
  ...generateYupFields(),
  password: Yup.string().required("Обязательное поле"),
})
const putValidationSchema = Yup.object().shape({
  ...generateYupFields(),
})

const UserForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const putIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.putUser)
  )
  const postIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.postUser)
  )
  const formValues = useAppSelector((state) => state.users.oneUserFormValues)
  const userGroups = useAppSelector((state) => state.users.userGroups)

  const userWarehouses = useAppSelector(
    (state) => state.users.oneUserWarehouses
  )

  const dictionaryList = useAppSelector((state) => state.dictionary.lists.sso)

  const editMode = formValues !== null

  const [warehousesList, setWarehousesList] = useState<SelectedWarehouses[]>([])

  const formik = useFormik({
    initialValues: editMode
      ? formValues
      : {
          login: EmptyString,
          state: EmptyString,
          password: EmptyString,
          first_name: EmptyString,
          last_name: EmptyString,
          middle_name: EmptyString,
          warehouses: [],
          has_single_rf_session: true,
          position: EmptyString,
          department: EmptyString,
          language: EmptyString,
          gender: EmptyString,
          phone_number: EmptyString,
          email: EmptyString,
          access_groups: [],
        },
    validationSchema: editMode ? putValidationSchema : postValidationSchema,
    onSubmit: (values) => {
      dispatch(
        editMode
          ? putUserAction({
              ...values,
              oldUsername: formValues.login,
              warehouses: warehousesList.map((item) => ({
                warehouse_id: item.warehouseId,
                functional_zones: item.fZones.map((fZone) => fZone.fZoneId),
              })),
              access_groups: userGroups
                .filter((item) => item.checked)
                .map((item) => item.id),
            })
          : postUserAction({
              ...values,
              warehouses: warehousesList.map((item) => ({
                warehouse_id: item.warehouseId,
                functional_zones: item.fZones.map((fZone) => fZone.fZoneId),
              })),
              access_groups: userGroups
                .filter((item) => item.checked)
                .map((item) => item.id),
            })
      )
    },
  })

  useEffect(() => {
    editMode && setWarehousesList(userWarehouses)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode])

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="tabs">
          <Tabs>
            <TabList>
              <Tab>Личная информация</Tab>
              <Tab>Пароль</Tab>
              <Tab>Адрес</Tab>
              <Tab>Группы пользователя</Tab>
              <Tab>Склады/Ф.зоны</Tab>
            </TabList>

            <TabPanel>
              <FormGroup>
                <InputWithLabel
                  id="login"
                  name="login"
                  type="text"
                  label={t("columns.login")}
                  value={formik.values.login}
                  onChange={(e) =>
                    formik.setFieldValue("login", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.login && formik.errors.login && (
                  <StyledErrorMessage>{formik.errors.login}</StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="first_name"
                  name="first_name"
                  type="text"
                  label={t("columns.first_name")}
                  value={formik.values.first_name}
                  onChange={(e) =>
                    formik.setFieldValue("first_name", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <StyledErrorMessage>
                    {formik.errors.first_name}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="last_name"
                  name="last_name"
                  type="text"
                  label={t("columns.last_name")}
                  value={formik.values.last_name}
                  onChange={(e) =>
                    formik.setFieldValue("last_name", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <StyledErrorMessage>
                    {formik.errors.last_name}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="middle_name"
                  name="middle_name"
                  type="text"
                  label={t("columns.middle_name")}
                  value={formik.values.middle_name}
                  onChange={(e) =>
                    formik.setFieldValue("middle_name", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.middle_name && formik.errors.middle_name && (
                  <StyledErrorMessage>
                    {formik.errors.middle_name}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="department"
                  name="department"
                  type="text"
                  label={t("columns.department")}
                  value={formik.values.department}
                  onChange={(e) =>
                    formik.setFieldValue("department", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.department && formik.errors.department && (
                  <StyledErrorMessage>
                    {formik.errors.department}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="position"
                  name="position"
                  type="text"
                  label={t("columns.position")}
                  value={formik.values.position}
                  onChange={(e) =>
                    formik.setFieldValue("position", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.position && formik.errors.position && (
                  <StyledErrorMessage>
                    {formik.errors.position}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.sso.self}.${dictionaryCodes.sso.locale}`}
                  options={dictionaryList.locale}
                  action={getDictionaryContentAction}
                  placeholder={t("columns.language")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("language", value?.value)
                  }}
                  value={dictionaryList.locale.find(
                    (item) => item.value === formik.values.language
                  )}
                />
                {formik.touched.language && formik.errors.language && (
                  <StyledErrorMessage>
                    {formik.errors.language}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.sso.self}.${dictionaryCodes.sso.gender}`}
                  options={dictionaryList.gender}
                  action={getDictionaryContentAction}
                  placeholder={t("columns.gender")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("gender", value?.value)
                  }}
                  value={dictionaryList.gender.find(
                    (item) => item.value === formik.values.gender
                  )}
                />
                {formik.touched.gender && formik.errors.gender && (
                  <StyledErrorMessage>
                    {formik.errors.gender}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.sso.self}.${dictionaryCodes.sso.state}`}
                  options={dictionaryList.state}
                  action={getDictionaryContentAction}
                  placeholder={t("columns.state")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("state", value?.value)
                  }}
                  value={dictionaryList.state.find(
                    (item) => item.value === formik.values.state
                  )}
                />
                {formik.touched.state && formik.errors.state && (
                  <StyledErrorMessage>{formik.errors.state}</StyledErrorMessage>
                )}
              </FormGroup>

              <FormGroup className="d-flex">
                <ReactSwitch
                  checked={formik.values.has_single_rf_session === true}
                  onChange={() =>
                    formik.setFieldValue(
                      "has_single_rf_session",
                      formik.values.has_single_rf_session !== true
                    )
                  }
                  checkedIcon={false}
                  uncheckedIcon={false}
                  disabled={false}
                  offColor={appColors.lightGray}
                  onColor={appColors.primary}
                  handleDiameter={10}
                  height={20}
                  width={40}
                />
                <Title className="ml-15">Одна RF сессия</Title>
              </FormGroup>
            </TabPanel>

            <TabPanel>
              <FormGroup>
                <InputWithLabel
                  id="password"
                  name="password"
                  type="password"
                  label={t("columns.password")}
                  value={formik.values.password}
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.password && formik.errors.password && (
                  <StyledErrorMessage>
                    {formik.errors.password}
                  </StyledErrorMessage>
                )}
              </FormGroup>
            </TabPanel>
            <TabPanel>
              <FormGroup>
                <InputWithLabel
                  id="email"
                  name="email"
                  type="email"
                  label={t("columns.email")}
                  value={formik.values.email}
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.email && formik.errors.email && (
                  <StyledErrorMessage>{formik.errors.email}</StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  label={t("columns.phone_number")}
                  value={formik.values.phone_number}
                  onChange={(e) =>
                    formik.setFieldValue("phone_number", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <StyledErrorMessage>
                    {formik.errors.phone_number}
                  </StyledErrorMessage>
                )}
              </FormGroup>
            </TabPanel>
            <TabPanel>
              <FormUsersGroups />
            </TabPanel>
            <TabPanel>
              <UserWarehouses
                warehousesList={warehousesList}
                setWarehousesList={setWarehousesList}
                editMode={editMode}
              />
            </TabPanel>
          </Tabs>
        </div>

        <FormGroup className="form-btns d-flex">
          <Button
            colors={{
              bgColor: appColors.silver,
              textColor: appColors.black,
            }}
            onClick={onClose}
            type="button"
          >
            <span className="btn-text">{t("buttons.cancel")}</span>
          </Button>
          <Button
            colors={{ bgColor: appColors.primary, textColor: appColors.white }}
            type="submit"
          >
            <span>
              {putIsFetching === "pending" || postIsFetching === "pending"
                ? t("buttons.wait")
                : editMode
                ? t("buttons.save")
                : t("buttons.add")}
            </span>
          </Button>
        </FormGroup>
      </form>
    </Fragment>
  )
}
export default UserForm
