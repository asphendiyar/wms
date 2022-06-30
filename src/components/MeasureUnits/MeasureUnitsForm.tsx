import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
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
  postMeasureUnitsAction,
  putMeasureUnitsAction,
} from "../../app/reducers/measure-units/actions";
import {
  MeasureUnitEnums,
  MeasureUnitsContentType,
} from "../../app/reducers/measure-units/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import { InputWithLabel } from "../Common/Input";
import { CustomValueContainer } from "../Common/rscc";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
});

export const MeasureUnitsForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedMeasureUnits: MeasureUnitsContentType | null = useAppSelector(
    (state: RootState) => state.measureUnits.detailedMeasureUnits
  );
  const isFetchingPostMeasureUnit = useAppSelector((state) =>
    namedRequestsInProgress(state, MeasureUnitEnums.postMeasureUnits)
  );
  const isFetchingPutMeasureUnit = useAppSelector((state) =>
    namedRequestsInProgress(state, MeasureUnitEnums.putMeasureUnits)
  );

  const optionsForState: ReactSelectValues[] = [
    { value: "active", label: "Активный" },
    { value: "disabled", label: "Не действующий" },
    { value: "deleted", label: "Удален" },
  ];

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedMeasureUnits
        ? {
            name: detailedMeasureUnits.name,
            code: detailedMeasureUnits.code,
            state: detailedMeasureUnits.state,
          }
        : {
            code: EmptyString,
            name: EmptyString,
            state: "active",
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putMeasureUnitsAction({
              data: { name: data.name, state: data.state },
              code: detailedMeasureUnits?.code || EmptyString,
            })
          )
        : dispatch(postMeasureUnitsAction(data));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {editMode ? (
            <>
              <FormGroup>
                <InputWithLabel
                  id={"name"}
                  name={"name"}
                  type={"text"}
                  label={t("columns.name")}
                  value={formik.values.name.toString()}
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                  disabled={false}
                />
                {formik.touched.name && formik.errors.name && (
                  <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
                )}
              </FormGroup>
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
            </>
          ) : (
            <>
              <FormGroup>
                <InputWithLabel
                  id={"code"}
                  name={"code"}
                  type={"text"}
                  label={t("columns.code")}
                  value={formik.values.code.toString()}
                  onChange={(e) => formik.setFieldValue("code", e.target.value)}
                  disabled={false}
                />
                {formik.touched.code && formik.errors.code && (
                  <StyledErrorMessage>{formik.errors.code}</StyledErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <InputWithLabel
                  id={"name"}
                  name={"name"}
                  type={"text"}
                  label={t("columns.name")}
                  value={formik.values.name.toString()}
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                  disabled={false}
                />
                {formik.touched.name && formik.errors.name && (
                  <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
                )}
              </FormGroup>
            </>
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
              {isFetchingPostMeasureUnit === "pending" ||
              isFetchingPutMeasureUnit === "pending"
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
