import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  postCellTypesAction,
  putCellTypesAction,
} from "../../app/reducers/cell-types/actions";
import {
  CellTypeEnums,
  CellTypesContentType,
} from "../../app/reducers/cell-types/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  name_kk: Yup.string().required("Обязательное поле"),
  name_ru: Yup.string().required("Обязательное поле"),
  name_en: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  length: Yup.number().required("Обязательное поле"),
  width: Yup.number().required("Обязательное поле"),
  height: Yup.number().required("Обязательное поле"),
  weight: Yup.number().required("Обязательное поле"),
  tolerance: Yup.number().required("Обязательное поле"),
  storage_type: Yup.string().required("Обязательное поле"),
  rotation: Yup.string().required("Обязательное поле"),
});

export const CellTypeForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedCellTypes: CellTypesContentType | null = useAppSelector(
    (state: RootState) => state.cellTypes.detailedCellType
  );

  const isFetchingPostCellType = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.postCellTypes)
  );
  const isFetchingPutCellType = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.putCellTypes)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedCellTypes
        ? {
            code: detailedCellTypes.name_kk,
            name_kk: detailedCellTypes.name_kk,
            name_ru: detailedCellTypes.name_ru,
            name_en: detailedCellTypes.name_en,
            type: detailedCellTypes.type,
            length: detailedCellTypes.length,
            width: detailedCellTypes.width,
            height: detailedCellTypes.height,
            volume: detailedCellTypes.volume,
            weight: detailedCellTypes.weight,
            tolerance: detailedCellTypes.tolerance,
            storage_type: detailedCellTypes.storage_type,
            rotation: detailedCellTypes.rotation,
            is_follow_the_sequence: detailedCellTypes.is_follow_the_sequence,
          }
        : {
            code: EmptyString,
            name_kk: EmptyString,
            name_ru: EmptyString,
            name_en: EmptyString,
            type: EmptyString,
            length: EmptyString,
            width: EmptyString,
            height: EmptyString,
            volume: EmptyString,
            weight: EmptyString,
            tolerance: EmptyString,
            storage_type: EmptyString,
            rotation: EmptyString,
            is_follow_the_sequence: false,
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putCellTypesAction({
              data: {
                ...data,
                length: parseFloat(data.length.toString()),
                width: parseFloat(data.width.toString()),
                weight: parseFloat(data.weight.toString()),
                volume:
                  parseInt(data.height.toString()) *
                  parseInt(data.length.toString()) *
                  parseInt(data.width.toString()),
                height: parseFloat(data.height.toString()),
                tolerance: parseFloat(data.tolerance.toString()),
              },
              code: detailedCellTypes?.code.toString() || EmptyString,
            })
          )
        : dispatch(
            postCellTypesAction({
              ...data,
              length: parseFloat(data.length.toString()),
              width: parseFloat(data.width.toString()),
              weight: parseFloat(data.weight.toString()),
              volume:
                parseInt(data.height.toString()) *
                parseInt(data.length.toString()) *
                parseInt(data.width.toString()),
              height: parseFloat(data.height.toString()),
              tolerance: parseFloat(data.tolerance.toString()),
            })
          );
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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

        <FormGroup>
          <InputWithLabel
            id="type"
            name="type"
            type="text"
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
            id="weight"
            name="weight"
            type="number"
            label={t("columns.weight")}
            value={formik.values.weight.toString()}
            onChange={(e) =>
              formik.setFieldValue("weight", parseFloat(e.target.value))
            }
            disabled={false}
          />
          {formik.touched.weight && formik.errors.weight && (
            <StyledErrorMessage>{formik.errors.weight}</StyledErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <InputWithLabel
            id="length"
            name="length"
            type="number"
            label={t("columns.length")}
            value={formik.values.length.toString()}
            onChange={(e) =>
              formik.setFieldValue("length", parseFloat(e.target.value))
            }
            disabled={false}
          />
          {formik.touched.length && formik.errors.length && (
            <StyledErrorMessage>{formik.errors.length}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="width"
            name="width"
            type="number"
            label={t("columns.width")}
            value={formik.values.width.toString()}
            onChange={(e) =>
              formik.setFieldValue("width", parseFloat(e.target.value))
            }
            disabled={false}
          />
          {formik.touched.width && formik.errors.width && (
            <StyledErrorMessage>{formik.errors.width}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="height"
            name="height"
            type="number"
            label={t("columns.height")}
            value={formik.values.height.toString()}
            onChange={(e) =>
              formik.setFieldValue("height", parseFloat(e.target.value))
            }
            disabled={false}
          />
          {formik.touched.height && formik.errors.height && (
            <StyledErrorMessage>{formik.errors.height}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="volume"
            name="volume"
            type="number"
            label={t("columns.volume")}
            value={(
              parseInt(formik.values.length.toString()) *
              parseInt(formik.values.height.toString()) *
              parseInt(formik.values.width.toString())
            ).toString()}
            onChange={(e) =>
              formik.setFieldValue("volume", parseFloat(e.target.value))
            }
          />
          {formik.touched.volume && formik.errors.volume && (
            <StyledErrorMessage>{formik.errors.volume}</StyledErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <InputWithLabel
            id="tolerance"
            name="tolerance"
            type="number"
            label={t("columns.tolerance")}
            value={formik.values.tolerance.toString()}
            onChange={(e) =>
              formik.setFieldValue("tolerance", parseFloat(e.target.value))
            }
            disabled={false}
          />
          {formik.touched.tolerance && formik.errors.tolerance && (
            <StyledErrorMessage>{formik.errors.tolerance}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="storage_type"
            name="storage_type"
            type="text"
            label={t("columns.storage_type")}
            value={formik.values.storage_type.toString()}
            onChange={(e) =>
              formik.setFieldValue("storage_type", e.target.value)
            }
            disabled={false}
          />
          {formik.touched.storage_type && formik.errors.storage_type && (
            <StyledErrorMessage>
              {formik.errors.storage_type}
            </StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="rotation"
            name="rotation"
            type="text"
            label={t("columns.rotation")}
            value={formik.values.rotation.toString()}
            onChange={(e) => formik.setFieldValue("rotation", e.target.value)}
            disabled={false}
          />
          {formik.touched.rotation && formik.errors.rotation && (
            <StyledErrorMessage>{formik.errors.rotation}</StyledErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Checkbox
            label={t("columns.is_follow_the_sequence")}
            value={formik.values.is_follow_the_sequence}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue(
                "is_follow_the_sequence",
                e.currentTarget.checked
              );
            }}
          />
          {formik.touched.is_follow_the_sequence &&
            formik.errors.is_follow_the_sequence && (
              <StyledErrorMessage>
                {formik.errors.is_follow_the_sequence}
              </StyledErrorMessage>
            )}
        </FormGroup>

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
              {isFetchingPostCellType === "pending" ||
              isFetchingPutCellType === "pending"
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
