import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";

import { FormGroup, StyledErrorMessage } from "../Common/styled";
import { InputWithLabel } from "../Common/Input";
import { Button } from "../Common/Button";
import {
  postPickingPrioritiesAction,
  putPickingPrioritiesAction,
} from "../../app/reducers/picking-priority/actions";
import {
  PickingPrioritiesContentType,
  PickingPriorityEnums,
} from "../../app/reducers/picking-priority/types";
import { useTranslation } from "react-i18next";
import DynamicSelect from "../Common/DynamicSelect";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";

const validationSchema = Yup.object().shape({
  priority: Yup.string().required("Обязательное поле"),
  route: Yup.string().required("Обязательное поле"),
});

export const PickingPrioritiesForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedPickingPriorities: PickingPrioritiesContentType | null =
    useAppSelector(
      (state: RootState) => state.pickingPriorities.detailedPickingPriorities
    );
  const isFetchingPostPickingPriority = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingPriorityEnums.postPickingPriorities)
  );
  const isFetchingPutPickingPriority = useAppSelector((state) =>
    namedRequestsInProgress(state, PickingPriorityEnums.putPickingPriorities)
  );
  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.general.state
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedPickingPriorities
        ? {
            state: detailedPickingPriorities.state,
            route: detailedPickingPriorities.route,
            priority: detailedPickingPriorities.priority,
          }
        : {
            route: EmptyString,
            priority: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode && data
        ? dispatch(
            putPickingPrioritiesAction({
              data: {
                state: data.state || EmptyString,
                route: data.route,
                priority: parseInt(data.priority.toString()),
              },
              id: detailedPickingPriorities?.id || 0,
            })
          )
        : dispatch(
            postPickingPrioritiesAction({
              ...data,
              priority: parseInt(data.priority.toString()),
            })
          );
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <FormGroup>
            <InputWithLabel
              id={"priority"}
              name={"priority"}
              type={"text"}
              label={t("columns.priority")}
              value={formik.values.priority.toString()}
              onChange={(e) => formik.setFieldValue("priority", e.target.value)}
              disabled={false}
            />
            {formik.touched.priority && formik.errors.priority && (
              <StyledErrorMessage>{formik.errors.priority}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"route"}
              name={"route"}
              type={"text"}
              label={t("columns.route")}
              value={formik.values.route.toString()}
              onChange={(e) => formik.setFieldValue("route", e.target.value)}
              disabled={false}
            />
            {formik.touched.route && formik.errors.route && (
              <StyledErrorMessage>{formik.errors.route}</StyledErrorMessage>
            )}
          </FormGroup>
          {editMode && (
            <FormGroup>
              <DynamicSelect<string>
                payload={`${dictionaryCodes.general.self}.${dictionaryCodes.general.state}`}
                options={dictionaryList}
                action={getDictionaryContentAction}
                placeholder={t("columns.state")}
                editMode={editMode}
                value={dictionaryList.find(
                  (item) => item.value === formik.values.state
                )}
                onChange={(value) => {
                  formik.setFieldValue("state", value?.value);
                }}
              />
              {formik.touched.state && formik.errors.state && (
                <StyledErrorMessage>{formik.errors.state}</StyledErrorMessage>
              )}
            </FormGroup>
          )}
        </div>
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
              {isFetchingPostPickingPriority === "pending" ||
              isFetchingPutPickingPriority == "pending"
                ? t("buttons.wait")
                : editMode
                ? t("buttons.save")
                : t("buttons.add")}
            </span>
          </Button>
        </FormGroup>
      </form>
    </>
  );
};
