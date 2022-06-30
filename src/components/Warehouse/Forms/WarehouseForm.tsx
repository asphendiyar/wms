import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FormPropTypes } from "../../../app/commonTypes";
import { appColors, EmptyString } from "../../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { namedRequestsInProgress } from "../../../app/reducers/requests";
import {
  postWarehouseAction,
  putWarehouseAction,
} from "../../../app/reducers/warehouse/actions";
import {
  WarehouseContentType,
  WarehouseEnums,
} from "../../../app/reducers/warehouse/types";
import { RootState } from "../../../app/store";
import { Button } from "../../Common/Button";
import { InputWithLabel } from "../../Common/Input";
import { FormGroup, StyledErrorMessage } from "../../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
});

export const WarehouseForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  );

  const isAddingWarehouseFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postWarehouse)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedWarehouse
        ? {
            code: detailedWarehouse.code,
            name: detailedWarehouse.name,
          }
        : {
            code: EmptyString,
            name: EmptyString,
          },
    validationSchema,
    onSubmit: (values) => {
      editMode
        ? dispatch(
            putWarehouseAction({
              data: values,
              id: detailedWarehouse?.id.toString() || EmptyString,
            })
          )
        : dispatch(postWarehouseAction(values));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <FormGroup>
            <InputWithLabel
              id="code"
              name="code"
              type="text"
              label={t("columns.warehouses")}
              value={formik.values.code}
              onChange={(e) => formik.setFieldValue("code", e.target.value)}
              disabled={false}
            />
            {formik.touched.code && formik.errors.code && (
              <StyledErrorMessage>{formik.errors.code}</StyledErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <InputWithLabel
              id="name"
              name="name"
              type="text"
              label={t("columns.name")}
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              disabled={false}
            />
            {formik.touched.name && formik.errors.name && (
              <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
            )}
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
          >
            <span className="btn-text">
              {isAddingWarehouseFetching === "pending"
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
