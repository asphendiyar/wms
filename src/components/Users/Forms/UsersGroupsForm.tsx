import { useFormik } from "formik"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import { appColors, EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { namedRequestsInProgress } from "../../../app/reducers/requests"
import {
  clearFormPrivileges,
  clearOneUsersGroupPrivilegesIds,
} from "../../../app/reducers/users"
import {
  getPrivilegesAction,
  postUsersGroupAction,
  putUsersGroupAction,
} from "../../../app/reducers/users/actions"
import { selectFormPrivileges } from "../../../app/reducers/users/selectors"
import { UserEnums } from "../../../app/reducers/users/types"
import { Button } from "../../Common/Button"
import { InputWithLabel } from "../../Common/Input"
import { FormGroup, StyledErrorMessage } from "../../Common/styled"
import UsersGroupFormPrivileges from "./UsersGroupFormPrivileges"
const validationSchema = Yup.object().shape({
  name_kk: Yup.string().required("Обязательное поле"),
  name_ru: Yup.string().required("Обязательное поле"),
  name_en: Yup.string().required("Обязательное поле"),
})

const UserGroupForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const oneUsersGroupFormValues = useAppSelector(
    (state) => state.users.oneUsersGroupFormValues
  )
  const selectedPrivileges = useAppSelector(selectFormPrivileges)
  const putIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.putUsersGroup)
  )
  const postIsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, UserEnums.postUsersGroup)
  )

  const editMode: boolean = oneUsersGroupFormValues !== null

  const formik = useFormik({
    initialValues: {
      name_en: oneUsersGroupFormValues?.name_en ?? EmptyString,
      name_ru: oneUsersGroupFormValues?.name_ru ?? EmptyString,
      name_kk: oneUsersGroupFormValues?.name_kk ?? EmptyString,
      privileges: [],
    },
    validationSchema,
    onSubmit: (data) => {
      dispatch(
        editMode
          ? putUsersGroupAction({
              ...data,
              id: oneUsersGroupFormValues?.id,
              privileges: selectedPrivileges,
            })
          : postUsersGroupAction({ ...data, privileges: selectedPrivileges })
      )
    },
  })

  useEffect(() => {
    dispatch(getPrivilegesAction())
    return () => {
      dispatch(clearFormPrivileges())
      dispatch(clearOneUsersGroupPrivilegesIds())
    }
  }, [dispatch])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <FormGroup>
          <InputWithLabel
            id="name_en"
            name="name_en"
            type="text"
            label={t("columns.name_en")}
            value={formik.values.name_en}
            onChange={(e) => formik.setFieldValue("name_en", e.target.value)}
            disabled={false}
          />
          {formik.touched.name_en && formik.errors.name_en && (
            <StyledErrorMessage>{formik.errors.name_en}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="name_ru"
            name="name_ru"
            type="text"
            label={t("columns.name")}
            value={formik.values.name_ru}
            onChange={formik.handleChange}
            disabled={false}
          />
          {formik.touched.name_ru && formik.errors.name_ru && (
            <StyledErrorMessage>{formik.errors.name_ru}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="name_kk"
            name="name_kk"
            type="text"
            label={t("columns.name_kk")}
            value={formik.values.name_kk}
            onChange={formik.handleChange}
            disabled={false}
          />
          {formik.touched.name_kk && formik.errors.name_kk && (
            <StyledErrorMessage>{formik.errors.name_kk}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <UsersGroupFormPrivileges />
        </FormGroup>
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
          disabled={putIsFetching === "pending" || postIsFetching === "pending"}
        >
          {putIsFetching === "pending" || postIsFetching === "pending"
            ? t("buttons.wait")
            : editMode
            ? t("buttons.save")
            : t("buttons.add")}
        </Button>
      </FormGroup>
    </form>
  )
}

export default UserGroupForm
