import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FilterPayloadTypes, FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import {
  putPrintersAction,
  postPrintersAction,
} from "../../app/reducers/printers/action";

import {
  PrintersEnums,
  PrintersContentType,
} from "../../app/reducers/printers/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { getSearchAllWarehouseAction } from "../../app/reducers/warehouse/actions";
import { selectWarehouseList } from "../../app/reducers/warehouse/selectors";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
  queue: Yup.string().required("Обязательное поле"),
  port: Yup.string().required("Обязательное поле"),
  warehouse_id: Yup.number().required("Обязательное поле"),
});

export const PrintersForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedPrinters: PrintersContentType | null = useAppSelector(
    (state: RootState) => state.printers.detailedPrinters
  );

  const isFetchingPostPrinter = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.postPrinters)
  );
  const isFetchingPutPrinter = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.putPrinters)
  );
  const warehousesList = useAppSelector(selectWarehouseList);
  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.general.state
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedPrinters
        ? {
            state: detailedPrinters.state,
            code: detailedPrinters.code,
            type: detailedPrinters.type,
            name: detailedPrinters.name,
            queue: detailedPrinters.queue,
            port: detailedPrinters.port,
            warehouse_id: detailedPrinters.warehouse_id,
          }
        : {
            code: EmptyString,
            state: EmptyString,
            type: EmptyString,
            name: EmptyString,
            queue: EmptyString,
            port: EmptyString,
            warehouse_id: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putPrintersAction({
              data: {
                ...data,
                warehouse_id: parseInt(data.warehouse_id.toString()),
              },
              id: detailedPrinters?.id.toString() || EmptyString,
            })
          )
        : dispatch(
            postPrintersAction({
              ...data,
              warehouse_id: parseInt(data.warehouse_id.toString()),
            })
          );
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
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
          <FormGroup>
            <InputWithLabel
              id={"code"}
              name={"code"}
              type={"text"}
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
              id={"type"}
              name={"type"}
              type={"text"}
              label={t("columns.type")}
              value={formik.values.type}
              onChange={(e) => formik.setFieldValue("type", e.target.value)}
              disabled={false}
            />
            {formik.touched.type && formik.errors.type && (
              <StyledErrorMessage>{formik.errors.type}</StyledErrorMessage>
            )}
          </FormGroup>
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
            <InputWithLabel
              id={"queue"}
              name={"queue"}
              type={"text"}
              label={t("columns.queue")}
              value={formik.values.queue}
              onChange={(e) => formik.setFieldValue("queue", e.target.value)}
              disabled={false}
            />
            {formik.touched.queue && formik.errors.queue && (
              <StyledErrorMessage>{formik.errors.queue}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"port"}
              name={"port"}
              type={"text"}
              label={t("columns.port")}
              value={formik.values.port}
              onChange={(e) => formik.setFieldValue("port", e.target.value)}
              disabled={false}
            />
            {formik.touched.port && formik.errors.port && (
              <StyledErrorMessage>{formik.errors.port}</StyledErrorMessage>
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
              {isFetchingPutPrinter === "pending" ||
              isFetchingPostPrinter === "pending"
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
