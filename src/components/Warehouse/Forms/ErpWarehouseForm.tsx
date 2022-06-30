import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import * as Yup from "yup";
import { FormPropTypes, ReactSelectValues } from "../../../app/commonTypes";
import {
  appColors,
  customStyles,
  customTheme,
  EmptyString,
} from "../../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getDictionaryContentAction } from "../../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../../app/reducers/dictionary/initials";
import {
  postErpWarehousesAction,
  putErpWarehousesAction,
} from "../../../app/reducers/erp-warehouses/actions";
import {
  ErpWarehouseEnums,
  ErpWarehousesContentType,
} from "../../../app/reducers/erp-warehouses/types";
import { namedRequestsInProgress } from "../../../app/reducers/requests";
import {
  getAllWarehouseAction,
  getSearchAllWarehouseAction,
} from "../../../app/reducers/warehouse/actions";
import {
  selectWarehouse,
  selectWarehouseList,
} from "../../../app/reducers/warehouse/selectors";
import { WarehouseContentType } from "../../../app/reducers/warehouse/types";
import { RootState } from "../../../app/store";
import { Button } from "../../Common/Button";
import DynamicSelect from "../../Common/DynamicSelect";
import { InputWithLabel } from "../../Common/Input";
import SelectMenuButton from "../../Common/rscc";
import { FormGroup, StyledErrorMessage } from "../../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  warehouse_id: Yup.number().required("Обязательное поле"),
});

export const ErpWarehouseForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  );
  const selectedErpWarehouse: ErpWarehousesContentType | null = useAppSelector(
    (state: RootState) => state.erpWarehouses.selectedWarehouse
  );
  const isFetchingPutEquipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.putErpWarehouses)
  );
  const isFetchingPostEquipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.postErpWarehouses)
  );
  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.general.state
  );
  const warehousesList = useAppSelector(selectWarehouseList);
  const { total_pages, number } = useAppSelector(selectWarehouse);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && selectedErpWarehouse
        ? {
            warehouse_id: detailedWarehouse?.id,
            code: selectedErpWarehouse.code,
            name: selectedErpWarehouse.name,
            type: selectedErpWarehouse.type,
            state: selectedErpWarehouse.state,
          }
        : {
            warehouse_id: detailedWarehouse?.id,
            code: EmptyString,
            type: EmptyString,
            name: EmptyString,
            state: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putErpWarehousesAction({
              data: {
                ...data,
                warehouse_id: parseInt(data.warehouse_id?.toString() || "1"),
              },
              id: detailedWarehouse?.id.toString() || EmptyString,
            })
          )
        : dispatch(
            postErpWarehousesAction({
              ...data,
              warehouse_id: parseInt(data.warehouse_id?.toString() || "1"),
            })
          );
    },
  });

  const handleClickMoreBtn = () => {
    dispatch(getAllWarehouseAction({ page: number + 1 }));
  };

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
            <InputWithLabel
              id={"type"}
              name={"type"}
              type={"text"}
              label={t("columns.type")}
              value={formik.values.type.toString()}
              onChange={(e) => formik.setFieldValue("type", e.target.value)}
              disabled={false}
            />
            {formik.touched.type && formik.errors.type && (
              <StyledErrorMessage>{formik.errors.type}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <DynamicSelect<string>
              payload={`${dictionaryCodes.general.self}.${dictionaryCodes.general.state}`}
              options={dictionaryList}
              action={getDictionaryContentAction}
              placeholder={t("columns.state")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("state", value?.value);
              }}
              value={dictionaryList.find(
                (item) => item.value === formik.values.state
              )}
            />
            {formik.touched.state && formik.errors.state && (
              <StyledErrorMessage>{formik.errors.state}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Select<ReactSelectValues>
              className="selectWrapper"
              options={warehousesList}
              placeholder={t("placeholders.selectState")}
              theme={customTheme}
              components={{
                MenuList: (props) => (
                  <SelectMenuButton
                    total_pages={total_pages}
                    number={number}
                    onClick={handleClickMoreBtn}
                    {...props}
                  />
                ),
              }}
              styles={customStyles()}
              menuPosition="fixed"
              onChange={(i) => {
                formik.setFieldValue("warehouse_id", i?.value);
              }}
              value={warehousesList.find(
                (item) => item.value === formik.values.warehouse_id
              )}
              onMenuOpen={() => {
                dispatch(getSearchAllWarehouseAction({ page: 1 }));
              }}
              isSearchable={true}
              isDisabled={true}
            />
            {formik.touched.warehouse_id && formik.errors.warehouse_id && (
              <StyledErrorMessage>
                {formik.errors.warehouse_id}
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
