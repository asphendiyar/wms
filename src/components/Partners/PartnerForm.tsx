import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import {
  postPartnersAction,
  putPartnersAction,
} from "../../app/reducers/partner/actions";
import {
  PartnerEnums,
  PartnersContentType,
} from "../../app/reducers/partner/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  company_code: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  unloading_point_code: Yup.string().required("Обязательное поле"),
  unloading_point: Yup.string().required("Обязательное поле"),
  address: Yup.string().required("Обязательное поле"),
  customer: Yup.string().required("Обязательное поле"),
  market_name: Yup.string().required("Обязательное поле"),
});

export const PartnerForm: React.FC<FormPropTypes> = ({ onClose, editMode }) => {
  const detailedPartners: PartnersContentType | null = useAppSelector(
    (state: RootState) => state.partners.detailedPartners
  );

  const isFetchingPostPartner = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.postPartners)
  );
  const isFetchingPutPartner = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.putPartners)
  );

  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.partner.type
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedPartners
        ? {
            code: detailedPartners.code,
            company_code: detailedPartners.company_code,
            name: detailedPartners.name,
            type: detailedPartners.type,
            unloading_point_code: detailedPartners.unloading_point_code,
            unloading_point: detailedPartners.unloading_point,
            address: detailedPartners.address,
            customer: detailedPartners.customer,
            is_b2b: detailedPartners.is_b2b,
            market_name: detailedPartners.market_name,
          }
        : {
            code: EmptyString,
            company_code: EmptyString,
            name: EmptyString,
            type: EmptyString,
            unloading_point_code: EmptyString,
            unloading_point: EmptyString,
            address: EmptyString,
            customer: EmptyString,
            is_b2b: false,
            market_name: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putPartnersAction({
              data: data,
              id: detailedPartners?.id.toString() || EmptyString,
            })
          )
        : dispatch(postPartnersAction(data));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
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
              id={"company_code"}
              name={"company_code"}
              type={"text"}
              label={t("columns.company_code")}
              value={formik.values.company_code.toString()}
              onChange={(e) =>
                formik.setFieldValue("company_code", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.company_code && formik.errors.company_code && (
              <StyledErrorMessage>
                {formik.errors.company_code}
              </StyledErrorMessage>
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
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.partner.self}.${dictionaryCodes.partner.type}`}
              options={dictionaryList}
              action={getDictionaryContentAction}
              placeholder={t("columns.type")}
              editMode={editMode}
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
            <InputWithLabel
              id={"unloading_point"}
              name={"unloading_point"}
              type={"text"}
              label={t("columns.unloading_point")}
              value={formik.values.unloading_point.toString()}
              onChange={(e) =>
                formik.setFieldValue("unloading_point", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.unloading_point &&
              formik.errors.unloading_point && (
                <StyledErrorMessage>
                  {formik.errors.unloading_point}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"unloading_point_code"}
              name={"unloading_point_code"}
              type={"text"}
              label={t("columns.unloading_point")}
              value={formik.values.unloading_point_code.toString()}
              onChange={(e) =>
                formik.setFieldValue("unloading_point_code", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.unloading_point_code &&
              formik.errors.unloading_point_code && (
                <StyledErrorMessage>
                  {formik.errors.unloading_point_code}
                </StyledErrorMessage>
              )}
          </FormGroup>

          <FormGroup>
            <InputWithLabel
              id={"address"}
              name={"address"}
              type={"text"}
              label={t("columns.address")}
              value={formik.values.address.toString()}
              onChange={(e) => formik.setFieldValue("address", e.target.value)}
              disabled={false}
            />
            {formik.touched.address && formik.errors.address && (
              <StyledErrorMessage>{formik.errors.address}</StyledErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <InputWithLabel
              id={"customer"}
              name={"customer"}
              type={"text"}
              label={t("columns.customer")}
              value={formik.values.customer.toString()}
              onChange={(e) => formik.setFieldValue("customer", e.target.value)}
              disabled={false}
            />
            {formik.touched.customer && formik.errors.customer && (
              <StyledErrorMessage>{formik.errors.customer}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Checkbox
              label="B2B"
              value={formik.values.is_b2b}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue("is_b2b", e.currentTarget.checked);
              }}
            />
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"market_name"}
              name={"market_name"}
              type={"text"}
              label={t("columns.market_name")}
              value={formik.values.market_name.toString()}
              onChange={(e) =>
                formik.setFieldValue("market_name", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.market_name && formik.errors.market_name && (
              <StyledErrorMessage>
                {formik.errors.market_name}
              </StyledErrorMessage>
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
              {isFetchingPutPartner === "pending" ||
              isFetchingPostPartner === "pending"
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
