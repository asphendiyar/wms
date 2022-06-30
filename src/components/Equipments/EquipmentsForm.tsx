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
  postEquipmentsAction,
  putEquipmentsAction,
} from "../../app/reducers/equipments/actions";
import {
  EquipmentEnums,
  EquipmentsContentType,
} from "../../app/reducers/equipments/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import { InputWithLabel } from "../Common/Input";
import { CustomValueContainer } from "../Common/rscc";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  value: Yup.string().required("Обязательное поле"),
  state: Yup.string().required("Обязательное поле"),
  description: Yup.string().required("Обязательное поле"),
});

export const EquipmentsForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedEquipments: EquipmentsContentType | null = useAppSelector(
    (state: RootState) => state.equipments.detailedEquipments
  );
  const isFetchingPostEquipment = useAppSelector((state) =>
    namedRequestsInProgress(state, EquipmentEnums.postEquipments)
  );
  const isFetchingPutEquipment = useAppSelector((state) =>
    namedRequestsInProgress(state, EquipmentEnums.putEquipments)
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
      editMode && detailedEquipments
        ? {
            code: detailedEquipments.code,
            state: detailedEquipments.state,
            description: detailedEquipments.description,
            value: detailedEquipments.value,
          }
        : {
            code: EmptyString,
            state: EmptyString,
            description: EmptyString,
            value: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putEquipmentsAction({
              data: {
                state: data.state,
                value: data.value,
                description: data.description,
              },
              code: detailedEquipments?.code || EmptyString,
            })
          )
        : dispatch(postEquipmentsAction(data));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {!editMode && (
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
          )}

          <FormGroup>
            <InputWithLabel
              id={"value"}
              name={"name"}
              type={"text"}
              label={t("columns.value")}
              value={formik.values.value.toString()}
              onChange={(e) => formik.setFieldValue("value", e.target.value)}
              disabled={false}
            />
            {formik.touched.value && formik.errors.value && (
              <StyledErrorMessage>{formik.errors.value}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"description"}
              name={"description"}
              type={"text"}
              label={t("columns.description")}
              value={formik.values.description.toString()}
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.description && formik.errors.description && (
              <StyledErrorMessage>
                {formik.errors.description}
              </StyledErrorMessage>
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
              {isFetchingPostEquipment === "pending" ||
              isFetchingPutEquipment === "pending"
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
