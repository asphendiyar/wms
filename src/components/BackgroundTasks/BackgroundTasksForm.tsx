import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as Yup from "yup";
import { FormPropTypes, ReactSelectValues } from "../../app/commonTypes";
import {
  appColors,
  customStyles,
  customTheme,
  EmptyString,
} from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  postBackgroundTasksAction,
  putBackgroundTasksAction,
} from "../../app/reducers/background-tasks/actions";
import {
  BackgroundTaskEnums,
  BackgroundTasksContentType,
} from "../../app/reducers/background-tasks/types";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { CustomValueContainer } from "../Common/rscc";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  period: Yup.string().required("Обязательное поле"),
  notification: Yup.object().shape({
    error_email: Yup.string().required("Обязательное поле"),
  }),
});

const optionsForState: ReactSelectValues[] = [
  { value: "active", label: "Активный" },
  { value: "disabled", label: "Не действующий" },
  { value: "deleted", label: "Удален" },
];

export const BackgroundTasksForm: React.FC<FormPropTypes> = ({ onClose }) => {
  const detailedBackgroundTasks: BackgroundTasksContentType | null =
    useAppSelector(
      (state: RootState) => state.backgroundTasks.detailedBackgroundTasks
    );
  const isFetchingPostBT = useAppSelector((state) =>
    namedRequestsInProgress(state, BackgroundTaskEnums.postBackgroundTasks)
  );
  const isFetchingPutBT = useAppSelector((state) =>
    namedRequestsInProgress(state, BackgroundTaskEnums.putBackgroundTasks)
  );

  const editMode = detailedBackgroundTasks !== null;

  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.background.type
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: editMode
      ? {
          ...detailedBackgroundTasks,
          notification: {
            ...detailedBackgroundTasks.notification,
            information_email:
              detailedBackgroundTasks.notification.information_email,
            error_email: detailedBackgroundTasks.notification.error_email,
            warning_email: detailedBackgroundTasks.notification.warning_email,
          },
        }
      : {
          state: EmptyString,
          last_run_at: EmptyString,
          name: EmptyString,
          type: EmptyString,
          manual_start: false,
          period: EmptyString,
          notification: {
            information_email: EmptyString,
            error_email: EmptyString,
            warning_email: EmptyString,
          },
        },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putBackgroundTasksAction({
              data: {
                ...data,
              },
              id: detailedBackgroundTasks?.id.toString() || EmptyString,
            })
          )
        : dispatch(
            postBackgroundTasksAction({
              ...data,
            })
          );
    },
  });
  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Tabs>
          <TabList>
            <Tab>{t("tabs.general")}</Tab>
            <Tab>Почта</Tab>
          </TabList>
          <TabPanel>
            <FormGroup>
              <InputWithLabel
                id={"name"}
                name={"name"}
                type={"text"}
                label={t("columns.value")}
                value={formik.values.name.toString()}
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
                disabled={false}
              />
              {formik.touched.name && formik.errors.name && (
                <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
              )}
            </FormGroup>

            {editMode && (
              <FormGroup>
                <Select<ReactSelectValues>
                  options={optionsForState}
                  placeholder={t("columns.state")}
                  theme={customTheme}
                  components={{
                    ValueContainer: CustomValueContainer,
                  }}
                  styles={customStyles()}
                  value={
                    optionsForState.filter(
                      (item) => item.value === formik.values.state
                    )[0]
                  }
                  onChange={(value) => {
                    formik.setFieldValue("state", value?.value);
                  }}
                />
                {formik.touched.state && formik.errors.state && (
                  <StyledErrorMessage>{formik.errors.state}</StyledErrorMessage>
                )}
              </FormGroup>
            )}

            <FormGroup>
              <DynamicSelect<string>
                payload={`${dictionaryCodes.background.self}.${dictionaryCodes.background.type}`}
                options={dictionaryList}
                action={getDictionaryContentAction}
                editMode={editMode}
                placeholder={t("columns.type")}
                onChange={(value) => {
                  formik.setFieldValue("type", value?.value);
                }}
                value={dictionaryList.find(
                  (item) => item.value === formik.values.type
                )}
              />
              {formik.touched.type && formik.errors.type && (
                <StyledErrorMessage>{formik.errors.type}</StyledErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Checkbox
                label={t("columns.manual_start")}
                value={formik.values.manual_start}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("manual_start", e.currentTarget.checked);
                }}
              />
              {formik.touched.manual_start && formik.errors.manual_start && (
                <StyledErrorMessage>
                  {formik.errors.manual_start}
                </StyledErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <InputWithLabel
                id={"period"}
                name={"period"}
                type={"text"}
                label={t("columns.period")}
                value={formik.values.period}
                onChange={(e) => formik.setFieldValue("period", e.target.value)}
                disabled={false}
              />
              {formik.touched.period && formik.errors.period && (
                <StyledErrorMessage>{formik.errors.period}</StyledErrorMessage>
              )}
            </FormGroup>
          </TabPanel>
          <TabPanel>
            <FormGroup>
              <InputWithLabel
                id={"notification.information_email"}
                name={"notification.information_email"}
                type={"text"}
                label={t("columns.information_email")}
                value={formik.values.notification.information_email}
                onChange={(e) =>
                  formik.setFieldValue(
                    "notification.information_email",
                    e.target.value
                  )
                }
                disabled={false}
              />
              {formik.touched.notification?.information_email &&
                formik.errors.notification?.information_email && (
                  <StyledErrorMessage>
                    {formik.errors.notification?.information_email}
                  </StyledErrorMessage>
                )}
            </FormGroup>

            <FormGroup>
              <InputWithLabel
                id={"notification.error_email"}
                name={"notification.error_email"}
                type={"text"}
                label={t("columns.error_email")}
                value={formik.values.notification.error_email}
                onChange={(e) =>
                  formik.setFieldValue(
                    "notification.error_email",
                    e.target.value
                  )
                }
                disabled={false}
              />
              {formik.touched.notification?.error_email &&
                formik.errors.notification?.error_email && (
                  <StyledErrorMessage>
                    {formik.errors.notification?.error_email}
                  </StyledErrorMessage>
                )}
            </FormGroup>

            <FormGroup>
              <InputWithLabel
                id={"notification.warning_email"}
                name={"notification.warning_email"}
                type={"text"}
                label={t("columns.warning_email")}
                value={formik.values.notification.warning_email}
                onChange={(e) =>
                  formik.setFieldValue(
                    "notification.warning_email",
                    e.target.value
                  )
                }
                disabled={false}
              />
              {formik.touched.notification?.warning_email &&
                formik.errors.notification?.warning_email && (
                  <StyledErrorMessage>
                    {formik.errors.notification?.warning_email}
                  </StyledErrorMessage>
                )}
            </FormGroup>
          </TabPanel>
        </Tabs>
        <div></div>
        <FormGroup className={"form-btns d-flex"}>
          <Button
            colors={{
              bgColor: appColors.silver,
              textColor: appColors.black,
            }}
            onClick={onClose}
            type={"button"}
          >
            <span className={"btn-text"}>{t("buttons.cancel")}</span>
          </Button>
          <Button
            colors={{ bgColor: appColors.primary, textColor: appColors.white }}
            type={"submit"}
          >
            <span className={"btn-text"}>
              {isFetchingPostBT === "pending" || isFetchingPutBT === "pending"
                ? t("buttons.wait")
                : editMode
                ? t("buttons.save")
                : t("buttons.add")}
            </span>
          </Button>
        </FormGroup>
      </form>
    </Fragment>
  );
};
