import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import { FormPropTypes } from "../../../app/commonTypes";
import { appColors, EmptyString } from "../../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { namedRequestsInProgress } from "../../../app/reducers/requests";
import {
  postAdressesWarehouseAction,
  putAdressesWarehouseAction,
} from "../../../app/reducers/warehouse/actions";
import {
  AddressesTypes,
  WarehouseContentType,
  WarehouseEnums,
} from "../../../app/reducers/warehouse/types";
import { RootState } from "../../../app/store";
import { Button } from "../../Common/Button";
import Checkbox from "../../Common/Checkbox";
import { InputWithLabel } from "../../Common/Input";
import { FormGroup, StyledErrorMessage } from "../../Common/styled";
export const FormWrapper = styled.div`
  width: 100%;
  form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
`;
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  postal_code: Yup.string().required("Обязательное поле"),
  city: Yup.string().required("Обязательное поле"),
  address: Yup.string().required("Обязательное поле"),
  address_additional: Yup.string().required("Обязательное поле"),
  contact_person: Yup.string().required("Обязательное поле"),
  phone_number: Yup.string().required("Обязательное поле"),
  email: Yup.string().required("Обязательное поле"),
});

export const CreateAdressesForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  );
  const selectedAdress: AddressesTypes | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedAdress
  );
  const isFetchingPostAddress = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postAdressesWarehouse)
  );

  const isFetchingPutAddress = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putAdressesWarehouse)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && selectedAdress
        ? {
            ...selectedAdress,
          }
        : {
            name: EmptyString,
            postal_code: EmptyString,
            city: EmptyString,
            address: EmptyString,
            address_additional: EmptyString,
            contact_person: EmptyString,
            phone_number: EmptyString,
            email: EmptyString,
            is_primary: false,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode && selectedAdress
        ? dispatch(
            putAdressesWarehouseAction({
              data,
              id: selectedAdress.id.toString(),
              w_id: detailedWarehouse?.id.toString(),
            })
          )
        : dispatch(
            postAdressesWarehouseAction({
              data,
              w_id: detailedWarehouse?.id.toString(),
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
          <FormGroup>
            <InputWithLabel
              id="postal_code"
              name="postal_code"
              type="text"
              label={t("columns.postal_code")}
              value={formik.values.postal_code}
              onChange={(e) =>
                formik.setFieldValue("postal_code", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.postal_code && formik.errors.postal_code && (
              <StyledErrorMessage>
                {formik.errors.postal_code}
              </StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id="city"
              name="city"
              type="text"
              label={t("columns.city")}
              value={formik.values.city}
              onChange={(e) => formik.setFieldValue("city", e.target.value)}
              disabled={false}
            />
            {formik.touched.city && formik.errors.city && (
              <StyledErrorMessage>{formik.errors.city}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id="address"
              name="address"
              type="text"
              label={t("columns.address")}
              value={formik.values.address}
              onChange={(e) => formik.setFieldValue("address", e.target.value)}
              disabled={false}
            />
            {formik.touched.address && formik.errors.address && (
              <StyledErrorMessage>{formik.errors.address}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id="address_additional"
              name="address_additional"
              type="text"
              label={t("columns.address_additional")}
              value={formik.values.address_additional}
              onChange={(e) =>
                formik.setFieldValue("address_additional", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.address_additional &&
              formik.errors.address_additional && (
                <StyledErrorMessage>
                  {formik.errors.address_additional}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id="contact_person"
              name="contact_person"
              type="text"
              label={t("columns.contact_person")}
              value={formik.values.contact_person}
              onChange={(e) =>
                formik.setFieldValue("contact_person", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.contact_person && formik.errors.contact_person && (
              <StyledErrorMessage>
                {formik.errors.contact_person}
              </StyledErrorMessage>
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
          <FormGroup>
            <InputWithLabel
              id="email"
              name="email"
              type="text"
              label={t("columns.email")}
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              disabled={false}
            />
            {formik.touched.email && formik.errors.email && (
              <StyledErrorMessage>{formik.errors.email}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Checkbox
              label={t("columns.is_primary")}
              value={formik.values.is_primary}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue("is_primary", e.currentTarget.checked);
              }}
            />
            {formik.touched.is_primary && formik.errors.is_primary && (
              <StyledErrorMessage>
                {formik.errors.is_primary}
              </StyledErrorMessage>
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
              {isFetchingPostAddress === "pending" ||
              isFetchingPutAddress === "pending"
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
