import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import {
  postTradeItemsAction,
  putTradeItemsAction,
} from "../../app/reducers/trade-items/actions";
import {
  TradeItemEnums,
  TradeItemsContentType,
} from "../../app/reducers/trade-items/types";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  value: Yup.string().required("Обязательное поле"),
  state: Yup.string().required("Обязательное поле"),
  description: Yup.string().required("Обязательное поле"),
  length: Yup.number().required("Обязательное поле"),
  width: Yup.number().required("Обязательное поле"),
  height: Yup.number().required("Обязательное поле"),
  max_volume: Yup.number().required("Обязательное поле"),
  max_weight: Yup.number().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  content: Yup.string().required("Обязательное поле"),
});

export const TradeItemsForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedTradeItems: TradeItemsContentType | null = useAppSelector(
    (state: RootState) => state.tradeItems.detailedTradeItems
  );
  const isFetchingPostTradeItem = useAppSelector((state) =>
    namedRequestsInProgress(state, TradeItemEnums.postTradeItems)
  );

  const isFetchingPutTradeItem = useAppSelector((state) =>
    namedRequestsInProgress(state, TradeItemEnums.putTradeItems)
  );
  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.general.state
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedTradeItems
        ? {
            code: detailedTradeItems.code,
            value: detailedTradeItems.value,
            state: detailedTradeItems.state,
            description: detailedTradeItems.description,
            length: detailedTradeItems.length,
            width: detailedTradeItems.width,
            height: detailedTradeItems.height,
            max_volume: detailedTradeItems.max_volume,
            max_weight: detailedTradeItems.max_weight,
            type: detailedTradeItems.type,
            content: detailedTradeItems.content,
          }
        : {
            code: EmptyString,
            value: EmptyString,
            state: EmptyString,
            description: EmptyString,
            length: EmptyString,
            width: EmptyString,
            height: EmptyString,
            max_volume: EmptyString,
            max_weight: EmptyString,
            type: EmptyString,
            content: EmptyString,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putTradeItemsAction({
              data: {
                ...data,
                length: parseFloat(data.length.toString()),
                width: parseFloat(data.width.toString()),
                height: parseFloat(data.height.toString()),
                max_volume: parseFloat(data.max_volume.toString()),
                max_weight: parseFloat(data.max_weight.toString()),
              },
              code: detailedTradeItems?.code || EmptyString,
            })
          )
        : dispatch(
            postTradeItemsAction({
              ...data,
              length: parseFloat(data.length.toString()),
              width: parseFloat(data.width.toString()),
              height: parseFloat(data.height.toString()),
              max_volume: parseFloat(data.max_volume.toString()),
              max_weight: parseFloat(data.max_weight.toString()),
            })
          );
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
              name={"value"}
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
            <DynamicSelect<string>
              payload={`${dictionaryCodes.general.self}.${dictionaryCodes.general.state}`}
              options={dictionaryList}
              placeholder={t("columns.state")}
              action={getDictionaryContentAction}
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
            <InputWithLabel
              id={"length"}
              name={"length"}
              type={"number"}
              label={t("columns.length")}
              value={formik.values.length.toString()}
              onChange={(e) => formik.setFieldValue("length", e.target.value)}
              disabled={false}
            />
            {formik.touched.length && formik.errors.length && (
              <StyledErrorMessage>{formik.errors.length}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"width"}
              name={"width"}
              type={"number"}
              label={t("columns.width")}
              value={formik.values.width.toString()}
              onChange={(e) => formik.setFieldValue("width", e.target.value)}
              disabled={false}
            />
            {formik.touched.width && formik.errors.width && (
              <StyledErrorMessage>{formik.errors.width}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"height"}
              name={"height"}
              type={"number"}
              label={t("columns.height")}
              value={formik.values.height.toString()}
              onChange={(e) => formik.setFieldValue("height", e.target.value)}
              disabled={false}
            />
            {formik.touched.height && formik.errors.height && (
              <StyledErrorMessage>{formik.errors.height}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"max_volume"}
              name={"max_volume"}
              type={"number"}
              label={t("columns.max_volume")}
              value={formik.values.max_volume.toString()}
              onChange={(e) =>
                formik.setFieldValue("max_volume", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.max_volume && formik.errors.max_volume && (
              <StyledErrorMessage>
                {formik.errors.max_volume}
              </StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id={"max_weight"}
              name={"max_weight"}
              type={"number"}
              label={t("columns.max_weight")}
              value={formik.values.max_weight.toString()}
              onChange={(e) =>
                formik.setFieldValue("max_weight", e.target.value)
              }
              disabled={false}
            />
            {formik.touched.max_weight && formik.errors.max_weight && (
              <StyledErrorMessage>
                {formik.errors.max_weight}
              </StyledErrorMessage>
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
            <InputWithLabel
              id={"content"}
              name={"content"}
              type={"text"}
              label={t("columns.content")}
              value={formik.values.content.toString()}
              onChange={(e) => formik.setFieldValue("content", e.target.value)}
              disabled={false}
            />
            {formik.touched.content && formik.errors.content && (
              <StyledErrorMessage>{formik.errors.content}</StyledErrorMessage>
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
              {isFetchingPostTradeItem === "pending" ||
              isFetchingPutTradeItem === "pending"
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
