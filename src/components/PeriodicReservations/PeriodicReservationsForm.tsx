import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FilterPayloadTypes, FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import { getSearchAllPartnersAction } from "../../app/reducers/partner/actions";
import { selectPartnerList } from "../../app/reducers/partner/selectors";
import {
  postPeriodicReservationsAction,
  putPeriodicReservationsAction,
} from "../../app/reducers/periodic-reservations/actions";
import {
  PeriodicReservationEnums,
  PeriodicReservationsContentType,
} from "../../app/reducers/periodic-reservations/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import {
  getAllFZonesWarehoseAction,
  getSearchAllWarehouseAction,
} from "../../app/reducers/warehouse/actions";
import {
  selectFZonesList,
  selectWarehouseList,
} from "../../app/reducers/warehouse/selectors";
import { FZoneParams } from "../../app/reducers/warehouse/types";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  warehouse_id: Yup.number().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  functional_zone_id: Yup.number().required("Обязательное поле"),
  partner_id: Yup.number().required("Обязательное поле"),
  route: Yup.string().required("Обязательное поле"),
});

export const PeriodicReservationsForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedPeriodicReservations: PeriodicReservationsContentType | null =
    useAppSelector(
      (state: RootState) =>
        state.periodicReservations.detailedPeriodicReservations
    );
  const isFetchingPutPeriodicReservation = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.putPeriodicReservations
    )
  );
  const isFetchingPostPeriodicReservation = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.postPeriodicReservations
    )
  );

  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.background.periodicReservationType
  );

  const warehousesList = useAppSelector(selectWarehouseList);
  const partnersList = useAppSelector(selectPartnerList);
  const fzoneList = useAppSelector(selectFZonesList);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedPeriodicReservations
        ? {
            ...detailedPeriodicReservations,
          }
        : {
            code: EmptyString,
            warehouse_id: EmptyString,
            type: EmptyString,
            functional_zone_id: EmptyString,
            partner_id: EmptyString,
            route: EmptyString,
            start_date: EmptyString,
            end_date: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode && detailedPeriodicReservations
        ? dispatch(
            putPeriodicReservationsAction({
              data: {
                ...data,
                warehouse_id: parseInt(data.warehouse_id.toString()),
                functional_zone_id: parseInt(
                  data.functional_zone_id.toString()
                ),
                partner_id: parseInt(data.partner_id.toString()),
              },
              id: detailedPeriodicReservations?.id.toString() || EmptyString,
            })
          )
        : dispatch(
            postPeriodicReservationsAction({
              ...data,
              warehouse_id: parseInt(data.warehouse_id.toString()),
              functional_zone_id: parseInt(data.functional_zone_id.toString()),
              partner_id: parseInt(data.partner_id.toString()),
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
            <DynamicSelect<FilterPayloadTypes>
              payload={{ page: 1 }}
              action={getSearchAllWarehouseAction}
              options={warehousesList}
              placeholder={t("placeholders.selectWarehouse")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("state", value?.value);
              }}
              value={warehousesList.find(
                (item) => item.value === formik.values.warehouse_id
              )}
            />
            {formik.touched.warehouse_id && formik.errors.warehouse_id && (
              <StyledErrorMessage>
                {formik.errors.warehouse_id}
              </StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.background.self}.${dictionaryCodes.background.periodicReservationType}`}
              options={dictionaryList}
              action={getDictionaryContentAction}
              placeholder={"Тип периодической резервации"}
              editMode={editMode}
              value={dictionaryList.find(
                (item) => item.value === formik.values.type
              )}
              onChange={(value) => {
                formik.setFieldValue("type", value?.value);
              }}
            />
            {formik.touched.type && formik.errors.type && (
              <StyledErrorMessage>{formik.errors.type}</StyledErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <DynamicSelect<FZoneParams>
              payload={{ id: formik.values.warehouse_id.toString() }}
              action={getAllFZonesWarehoseAction}
              options={fzoneList}
              placeholder={t("columns.functional_zone_id")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("functional_zone_id", value?.value);
              }}
              value={fzoneList.find(
                (item) => item.value === formik.values.functional_zone_id
              )}
            />
            {formik.touched.functional_zone_id &&
              formik.errors.functional_zone_id && (
                <StyledErrorMessage>
                  {formik.errors.functional_zone_id}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<FilterPayloadTypes>
              payload={{ page: 1 }}
              action={getSearchAllPartnersAction}
              options={partnersList}
              placeholder={t("placeholders.selectPartner")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("partner_id", value?.value);
              }}
              value={partnersList.find(
                (item) => item.value === formik.values.partner_id
              )}
            />
            {formik.touched.partner_id && formik.errors.partner_id && (
              <StyledErrorMessage>
                {formik.errors.partner_id}
              </StyledErrorMessage>
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
              {isFetchingPostPeriodicReservation === "pending" ||
              isFetchingPutPeriodicReservation === "pending"
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
