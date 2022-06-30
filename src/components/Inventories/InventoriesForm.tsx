import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FilterPayloadTypes, FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  putInventoriesAction,
  postInventoriesAction,
} from "../../app/reducers/inventories/action";

import {
  InventoriesEnums,
  InventoriesContentType,
} from "../../app/reducers/inventories/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { getSearchAllWarehouseAction } from "../../app/reducers/warehouse/actions";
import { selectWarehouseList } from "../../app/reducers/warehouse/selectors";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  warehouse_id: Yup.number().required("Обязательное поле"),
  region: Yup.string().required("Обязательное поле"),
  row: Yup.string().required("Обязательное поле"),
  interval: Yup.number().required("Обязательное поле"),
});

export const InventoriesForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedInventories: InventoriesContentType | null = useAppSelector(
    (state: RootState) => state.inventories.detailedInventories
  );

  const isFetchingPostInventories = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.postInventories)
  );
  const isFetchingPutInventories = useAppSelector((state) =>
    namedRequestsInProgress(state, InventoriesEnums.putInventories)
  );
  const warehousesList = useAppSelector(selectWarehouseList);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedInventories
        ? {
            name: detailedInventories.name,
            warehouse_id: EmptyString,
            region: EmptyString,
            row: EmptyString,
            interval: EmptyString,
          }
        : {
            name: EmptyString,
            warehouse_id: EmptyString,
            region: EmptyString,
            row: EmptyString,
            interval: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putInventoriesAction({
              data: {
                name: formik.values.name,
              },
              id: detailedInventories?.id.toString() || EmptyString,
            })
          )
        : dispatch(
            postInventoriesAction({
              ...data,
              warehouse_id: parseInt(data.warehouse_id.toString()),
              interval: parseInt(data.interval.toString()),
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
              id={"name"}
              name={"name"}
              type={"text"}
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
            <DynamicSelect<FilterPayloadTypes>
              payload={{ page: 1 }}
              action={getSearchAllWarehouseAction}
              options={warehousesList}
              placeholder={t("placeholders.selectWarehouse")}
              editMode={editMode}
              onChange={(value) => {
                formik.setFieldValue("warehouse_id", value?.value);
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
            <InputWithLabel
              id={"region"}
              name={"region"}
              type={"text"}
              label={t("columns.region")}
              value={formik.values.region}
              onChange={(e) => formik.setFieldValue("region", e.target.value)}
              disabled={false}
            />
            {formik.touched.region && formik.errors.region && (
              <StyledErrorMessage>{formik.errors.region}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"row"}
              name={"row"}
              type={"text"}
              label={t("columns.row")}
              value={formik.values.row}
              onChange={(e) => formik.setFieldValue("row", e.target.value)}
              disabled={false}
            />
            {formik.touched.row && formik.errors.row && (
              <StyledErrorMessage>{formik.errors.row}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"interval"}
              name={"interval"}
              type={"number"}
              label={t("columns.interval")}
              value={formik.values.interval}
              onChange={(e) => formik.setFieldValue("interval", e.target.value)}
              disabled={false}
            />
            {formik.touched.interval && formik.errors.interval && (
              <StyledErrorMessage>{formik.errors.interval}</StyledErrorMessage>
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
              {isFetchingPutInventories === "pending" ||
              isFetchingPostInventories === "pending"
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
