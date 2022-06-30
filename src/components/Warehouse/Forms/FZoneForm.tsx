import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import { FormPropTypes } from "../../../app/commonTypes";
import { appColors, EmptyString } from "../../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getDictionaryContentAction } from "../../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../../app/reducers/dictionary/initials";
import { namedRequestsInProgress } from "../../../app/reducers/requests";
import {
  postFZoneWarehouseAction,
  putFZoneWarehouseAction,
} from "../../../app/reducers/warehouse/actions";
import {
  FunctionalZones,
  WarehouseContentType,
  WarehouseEnums,
} from "../../../app/reducers/warehouse/types";
import { RootState } from "../../../app/store";
import { Button } from "../../Common/Button";
import Checkbox from "../../Common/Checkbox";
import DynamicSelect from "../../Common/DynamicSelect";
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
  code: Yup.string().required("Обязательное поле"),
  name_kk: Yup.string().required("Обязательное поле"),
  name_ru: Yup.string().required("Обязательное поле"),
  name_en: Yup.string().required("Обязательное поле"),
  function: Yup.string().required("Обязательное поле"),
  picking_method: Yup.string().required("Обязательное поле"),
  replenishment_method: Yup.string().required("Обязательное поле"),
  commodity_unit_disassembly_rule: Yup.string().required("Обязательное поле"),
  package_disassembly_rule: Yup.string().required("Обязательное поле"),
  packing_station_type: Yup.string().required("Обязательное поле"),
  max_picking_orders: Yup.number().required("Обязательное поле"),
});

export const CreateFZoneForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  );
  const selectedFZone: FunctionalZones | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedFZone
  );

  const isFetchingPostFZone = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postFZoneWarehouse)
  );

  const isFetchingPutFZone = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putFZoneWarehouse)
  );
  const dictionaryListWarehouse = useAppSelector(
    (state) => state.dictionary.lists.warehouse
  );
  const dictionaryListGeneral = useAppSelector(
    (state) => state.dictionary.lists.general
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && selectedFZone
        ? {
            ...selectedFZone,
            max_picking_orders: selectedFZone.max_picking_orders.toString(),
            name_en: selectedFZone.name_en,
            name_kk: selectedFZone.name_kk,
            name_ru: selectedFZone.name_ru,
            state: selectedFZone.state,
          }
        : {
            code: EmptyString,
            name_kk: EmptyString,
            name_ru: EmptyString,
            name_en: EmptyString,
            function: EmptyString,
            picking_method: EmptyString,
            replenishment_method: EmptyString,
            max_picking_orders: EmptyString,
            commodity_unit_disassembly_rule: EmptyString,
            package_disassembly_rule: EmptyString,
            is_save_without_commodity_unit: false,
            is_save_comm_unit_same_level: false,
            is_used_for_picking: false,
            is_mezzanine: false,
            packing_station_type: EmptyString,
            state: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode && selectedFZone
        ? dispatch(
            putFZoneWarehouseAction({
              data: {
                ...data,
                max_picking_orders: parseInt(
                  data.max_picking_orders.toString()
                ),
              },
              id: selectedFZone.id,
              w_id: detailedWarehouse?.id,
            })
          )
        : dispatch(
            postFZoneWarehouseAction({
              data: {
                ...data,
                max_picking_orders: parseInt(
                  data.max_picking_orders.toString()
                ),
              },
              w_id: detailedWarehouse?.id,
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
              id="code"
              name="code"
              type="text"
              label={t("columns.code")}
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
              id="name_ru"
              name="name_ru"
              type="text"
              label={t("columns.name")}
              value={formik.values.name_ru}
              onChange={(e) => formik.setFieldValue("name_ru", e.target.value)}
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
              onChange={(e) => formik.setFieldValue("name_kk", e.target.value)}
              disabled={false}
            />
            {formik.touched.name_kk && formik.errors.name_kk && (
              <StyledErrorMessage>{formik.errors.name_kk}</StyledErrorMessage>
            )}
          </FormGroup>
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
          {editMode && (
            <FormGroup>
              <DynamicSelect<string>
                payload={`${dictionaryCodes.general.self}.${dictionaryCodes.general.state}`}
                action={getDictionaryContentAction}
                placeholder={t("columns.state")}
                options={dictionaryListGeneral.state}
                editMode={editMode}
                onChange={(value) => {
                  formik.setFieldValue("general.state", value?.value);
                }}
                value={dictionaryListGeneral.state.find(
                  (item) => item.value === formik.values.state
                )}
              />
              {formik.touched.state && formik.errors.state && (
                <StyledErrorMessage>{formik.errors.state}</StyledErrorMessage>
              )}
            </FormGroup>
          )}
          <FormGroup>
            <InputWithLabel
              id="function"
              name="function"
              type="text"
              label={t("columns.function")}
              value={formik.values.function}
              onChange={(e) => formik.setFieldValue("function", e.target.value)}
              disabled={false}
            />
            {formik.touched.function && formik.errors.function && (
              <StyledErrorMessage>{formik.errors.function}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.replenishmentMethod}`}
              options={dictionaryListWarehouse.replenishmentMethod}
              action={getDictionaryContentAction}
              placeholder={t("columns.replenishment_method")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("replenishment_method", value?.value);
              }}
              value={dictionaryListWarehouse.replenishmentMethod.find(
                (item) => item.value === formik.values.replenishment_method
              )}
            />
            {formik.touched.replenishment_method &&
              formik.errors.replenishment_method && (
                <StyledErrorMessage>
                  {formik.errors.replenishment_method}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.pickingMethod}`}
              options={dictionaryListWarehouse.pickingMethod}
              action={getDictionaryContentAction}
              placeholder={t("columns.picking_method")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("picking_method", value?.value);
              }}
              value={dictionaryListWarehouse.pickingMethod.find(
                (item) => item.value === formik.values.picking_method
              )}
            />
            {formik.touched.picking_method && formik.errors.picking_method && (
              <StyledErrorMessage>
                {formik.errors.picking_method}
              </StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id="max_picking_orders"
              name="max_picking_orders"
              type="number"
              label={t("columns.max_picking_orders")}
              value={formik.values.max_picking_orders}
              onChange={(e) =>
                formik.setFieldValue("max_picking_orders", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.max_picking_orders &&
              formik.errors.max_picking_orders && (
                <StyledErrorMessage>
                  {formik.errors.max_picking_orders}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.packing_station_type}`}
              options={dictionaryListWarehouse.packing_station_type}
              action={getDictionaryContentAction}
              editMode={editMode}
              placeholder={t("columns.packing_station_type")}
              onChange={(value) => {
                formik.setFieldValue("packing_station_type", value?.value);
              }}
              value={dictionaryListWarehouse.packing_station_type.find(
                (item) => item.value === formik.values.packing_station_type
              )}
            />
            {formik.touched.packing_station_type &&
              formik.errors.packing_station_type && (
                <StyledErrorMessage>
                  {formik.errors.packing_station_type}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.commodityUnitDisassemblyRules}`}
              options={dictionaryListWarehouse.commodityUnitDisassemblyRules}
              action={getDictionaryContentAction}
              placeholder={t("columns.commodity_unit_disassembly_rule")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue(
                  "commodity_unit_disassembly_rule",
                  value?.value
                );
              }}
              value={dictionaryListWarehouse.commodityUnitDisassemblyRules.find(
                (item) =>
                  item.value === formik.values.commodity_unit_disassembly_rule
              )}
            />
            {formik.touched.commodity_unit_disassembly_rule &&
              formik.errors.commodity_unit_disassembly_rule && (
                <StyledErrorMessage>
                  {formik.errors.commodity_unit_disassembly_rule}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.packageDisassemblyRules}`}
              options={dictionaryListWarehouse.packageDisassemblyRules}
              action={getDictionaryContentAction}
              placeholder={t("columns.package_disassembly_rule")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("package_disassembly_rule", value?.value);
              }}
              value={dictionaryListWarehouse.packageDisassemblyRules.find(
                (item) => item.value === formik.values.package_disassembly_rule
              )}
            />
            {formik.touched.package_disassembly_rule &&
              formik.errors.package_disassembly_rule && (
                <StyledErrorMessage>
                  {formik.errors.package_disassembly_rule}
                </StyledErrorMessage>
              )}
          </FormGroup>
          <FormGroup>
            <Checkbox
              label={t("columns.is_save_without_commodity_unit")}
              value={formik.values.is_save_without_commodity_unit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(
                  "is_save_without_commodity_unit",
                  e.currentTarget.checked
                );
              }}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              label={t("columns.is_save_comm_unit_same_level")}
              value={formik.values.is_save_comm_unit_same_level}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(
                  "is_save_comm_unit_same_level",
                  e.currentTarget.checked
                );
              }}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              label={t("columns.is_used_for_picking")}
              value={formik.values.is_used_for_picking}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(
                  "is_used_for_picking",
                  e.currentTarget.checked
                );
              }}
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              label={t("columns.is_mezzanine")}
              value={formik.values.is_mezzanine}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue("is_mezzanine", e.currentTarget.checked);
              }}
            />
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
              {isFetchingPostFZone === "pending" ||
              isFetchingPutFZone === "pending"
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
