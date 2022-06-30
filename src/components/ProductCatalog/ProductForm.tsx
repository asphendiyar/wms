/* eslint-disable max-len */
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Column } from "react-table";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as Yup from "yup";
import { ReactSelectValues } from "../../app/commonTypes";
import {
  appColors,
  customStyles,
  customTheme,
  EmptyString,
} from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllCommoditiesAction,
  getSearchAllCommoditiesAction,
} from "../../app/reducers/commodities/actions";
import {
  selectCommodities,
  selectCommodityList,
} from "../../app/reducers/commodities/selectors";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import { getAllMeasureUnitsAction } from "../../app/reducers/measure-units/actions";
import { selectMeasureUnitList } from "../../app/reducers/measure-units/selectors";
import {
  getAllPopularitiesAction,
  getSearchAllPopularitiesAction,
} from "../../app/reducers/popularities/actions";
import {
  selectPopularities,
  selectPopularityList,
} from "../../app/reducers/popularities/selectors";
import {
  addProductCatalogAction,
  getProductCategoryAction,
  getProductCategoryTreeListAction,
  putProductCatalogAction,
} from "../../app/reducers/product-catalog/actions";
import {
  BarcodeTypes,
  CategoryTreeListType,
  ProductCatalogEnums,
  ProductContentType,
  SelectedProductCategoryType,
} from "../../app/reducers/product-catalog/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import SelectMenuButton, { CustomValueContainer } from "../Common/rscc";
import { FormGroup, StyledErrorMessage, TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";
import i18n from "../../app/i18n";
import { Picker } from "../Common/Picker";
import ProductCategory from "./ProductCategory";
import Modal from "../Common/Modal";
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  barcodes: Yup.array().min(
    1,
    "В списке штрих-кодов должен быть минимум один элемент"
  ),
  description: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),
  state: Yup.string().required("Обязательное поле"),
  kit_type: Yup.string().required("Обязательное поле"),
  processing_type: Yup.string().required("Обязательное поле"),
  rotation: Yup.string().required("Обязательное поле"),
  measure_unit: Yup.string().required("Обязательное поле"),
  note: Yup.string().required("Обязательное поле"),
  measure_state: Yup.string().required("Обязательное поле"),
  commodity_code: Yup.string().required("Обязательное поле"),
  popularity_code: Yup.string().required("Обязательное поле"),
  control: Yup.object().shape({
    accuracy_of_production_date: Yup.string().required("Обязательное поле"),
    is_track_expiration_date: Yup.boolean().required("Обязательное поле"),
    is_print_expiration_date: Yup.boolean().required("Обязательное поле"),
    accuracy_of_expiration_date: Yup.string().required("Обязательное поле"),
    expiration_date: Yup.string().required("Обязательное поле"),
    min_expiration_date_for_inbound: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    min_expiration_date_for_outbound: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    min_count_in_picking: Yup.string().required("Обязательное поле"),
    max_count_in_picking: Yup.string().required("Обязательное поле"),
    type_of_trade_item: Yup.string().required("Обязательное поле"),
    equipment_type: Yup.string().required("Обязательное поле"),
    account_serial_number: Yup.string().required("Обязательное поле"),
  }),
  measurement: Yup.object().shape({
    net_weight: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    gross_weight: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    length: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    width: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    height: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    volume: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
    cell_height: Yup.number()
      .required("Обязательное поле")
      .typeError("Обязательное поле"),
  }),
});

const tableColumns: Array<Column<BarcodeTypes>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.is_primary"),
    accessor: "is_primary",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
];
export const ProductForm: React.FC<{
  onClose: () => void;
  editMode: boolean;
  code?: string;
}> = ({ onClose, editMode, code }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const detailedProduct: ProductContentType | null = useAppSelector(
    (state: RootState) => state.productCatalog.detailedProduct
  );

  const categoryTreeList: CategoryTreeListType[] = useAppSelector(
    (state: RootState) => state.productCatalog.categoryTreeList
  );

  const isFetchingPostProductCatalog = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductCatalogEnums.postProductCatalog)
  );

  const isFetchingPutProductCatalog = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductCatalogEnums.putProductCatalog)
  );

  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.productCard
  );
  const popularityList = useAppSelector(selectPopularityList);
  const commodityList = useAppSelector(selectCommodityList);
  const measureUnitList = useAppSelector(selectMeasureUnitList);

  const popularityData = useAppSelector(selectPopularities);
  const commodityData = useAppSelector(selectCommodities);
  const measureUnitData = useAppSelector(selectCommodities);

  const selectedProductCategory: SelectedProductCategoryType = useAppSelector(
    (state: RootState) => state.productCatalog.selectedProductCategory
  );

  const [levels, setLevels] = useState<{
    levelOne: boolean;
    levelTwo: boolean;
    levelThree: boolean;
    levelFour: boolean;
    levelFive: boolean;
  }>({
    levelOne: false,
    levelTwo: false,
    levelThree: false,
    levelFour: false,
    levelFive: false,
  });
  const [modalCategory, setModalCategory] = useState<boolean>(false);

  const [barcodes, setBarcodes] = useState<BarcodeTypes>({
    code: "",
    type: "",
    is_primary: false,
  });

  const formik = useFormik({
    initialValues:
      editMode && detailedProduct
        ? {
            ...detailedProduct,
            control: {
              ...detailedProduct.control,
              min_expiration_date_for_inbound:
                detailedProduct.control.min_expiration_date_for_inbound.toString(),
              min_expiration_date_for_outbound:
                detailedProduct.control.min_expiration_date_for_outbound.toString(),
              expiration_date:
                detailedProduct.control.expiration_date.toString(),
            },
            measurement: {
              ...detailedProduct.measurement,
              net_weight: detailedProduct.measurement.net_weight.toString(),
              gross_weight: detailedProduct.measurement.gross_weight.toString(),
              width: detailedProduct.measurement.width.toString(),
              height: detailedProduct.measurement.height.toString(),
              volume: detailedProduct.measurement.volume.toString(),
              cell_height: detailedProduct.measurement.cell_height.toString(),
              length: detailedProduct.measurement.length.toString(),
            },
            category: {
              category_id: EmptyString,
            },
          }
        : {
            barcodes: [],
            code: EmptyString,
            description: EmptyString,
            state: EmptyString,
            is_suitable: false,
            type: EmptyString,
            kit_type: EmptyString,
            processing_type: EmptyString,
            rotation: EmptyString,
            measure_unit: EmptyString,
            image_url: EmptyString,
            note: EmptyString,
            measure_state: EmptyString,
            commodity_code: EmptyString,
            popularity_code: EmptyString,
            control: {
              accuracy_of_production_date: EmptyString,
              is_track_expiration_date: false,
              is_print_expiration_date: false,
              accuracy_of_expiration_date: EmptyString,
              expiration_date: EmptyString,
              min_expiration_date_for_inbound: EmptyString,
              min_expiration_date_for_outbound: EmptyString,
              min_count_in_picking: EmptyString,
              max_count_in_picking: EmptyString,
              type_of_trade_item: EmptyString,
              equipment_type: EmptyString,
              account_serial_number: EmptyString,
            },
            measurement: {
              net_weight: EmptyString,
              gross_weight: EmptyString,
              length: EmptyString,
              width: EmptyString,
              height: EmptyString,
              volume: EmptyString,
              cell_height: EmptyString,
            },
            category: {
              category_id: EmptyString,
            },
          },
    validationSchema,
    onSubmit: (values) => {
      editMode
        ? dispatch(
            putProductCatalogAction({
              ...values,
              control: {
                ...values.control,
                min_expiration_date_for_inbound: parseInt(
                  values.control.min_expiration_date_for_inbound
                ),
                min_expiration_date_for_outbound: parseInt(
                  values.control.min_expiration_date_for_outbound
                ),
                expiration_date: parseInt(values.control.expiration_date),
              },
              measurement: {
                ...values.measurement,
                net_weight: parseFloat(values.measurement.net_weight),
                gross_weight: parseFloat(values.measurement.gross_weight),
                width: parseFloat(values.measurement.width),
                height: parseFloat(values.measurement.height),
                cell_height: parseFloat(values.measurement.cell_height),
                length: parseFloat(values.measurement.length),
                volume:
                  parseInt(values.measurement.height.toString()) *
                  parseInt(values.measurement.length.toString()) *
                  parseInt(values.measurement.width.toString()),
              },
              category: {
                category_id: parseFloat(values.category.category_id.toString()),
              },
            })
          )
        : dispatch(
            addProductCatalogAction({
              ...values,
              control: {
                ...values.control,
                min_expiration_date_for_inbound: parseInt(
                  values.control.min_expiration_date_for_inbound
                ),
                min_expiration_date_for_outbound: parseInt(
                  values.control.min_expiration_date_for_outbound
                ),
                expiration_date: parseInt(values.control.expiration_date),
              },
              measurement: {
                ...values.measurement,
                net_weight: parseFloat(values.measurement.net_weight),
                gross_weight: parseFloat(values.measurement.gross_weight),
                width: parseFloat(values.measurement.width),
                height: parseFloat(values.measurement.height),
                cell_height: parseFloat(values.measurement.cell_height),
                length: parseFloat(values.measurement.length),
                volume:
                  parseInt(values.measurement.height.toString()) *
                  parseInt(values.measurement.length.toString()) *
                  parseInt(values.measurement.width.toString()),
              },
              category: {
                category_id: parseFloat(values.category.category_id.toString()),
              },
            })
          );
    },
  });

  const handleClickAddBarcode = () => {
    if (barcodes.code.length > 0 && barcodes.type.length > 0) {
      formik.setFieldValue("barcodes", [...formik.values.barcodes, barcodes]);
    }
    setBarcodes({
      code: "",
      type: "",
      is_primary: false,
    });
  };

  const dataBarcodes: BarcodeTypes[] = useMemo(
    (): BarcodeTypes[] =>
      formik.values.barcodes
        ? formik.values.barcodes.map((item) => ({
            ...item,
          }))
        : [],
    [formik.values.barcodes]
  );

  const handleClickRow = (args: BarcodeTypes) => {
    formik.setFieldValue(
      "barcodes",
      formik.values.barcodes.filter((i) => i.code !== args.code)
    );
  };

  const handleClickMoreBtnPopularity = () => {
    dispatch(getAllPopularitiesAction({ page: popularityData.number + 1 }));
  };
  const handleClickMoreBtnCommodity = () => {
    dispatch(getAllCommoditiesAction({ page: commodityData.number + 1 }));
  };
  const handleClickMoreBtnMeasureUnit = () => {
    dispatch(getAllMeasureUnitsAction({ page: commodityData.number + 1 }));
  };
  const handleCloseCategoryModal = () => {
    setModalCategory(false);
    if (levels.levelOne) {
      formik.setFieldValue(
        "category.category_id",
        selectedProductCategory.level_one?.id.toString()
      );
    } else if (levels.levelTwo) {
      formik.setFieldValue(
        "category.category_id",
        selectedProductCategory.level_two?.id.toString()
      );
      dispatch(
        getProductCategoryAction(
          selectedProductCategory.level_two?.id.toString() || EmptyString
        )
      );
    } else if (levels.levelThree) {
      formik.setFieldValue(
        "category.category_id",
        selectedProductCategory.level_three?.id.toString()
      );
      dispatch(
        getProductCategoryAction(
          selectedProductCategory.level_three?.id.toString() || EmptyString
        )
      );
    } else if (levels.levelFour) {
      formik.setFieldValue(
        "category.category_id",
        selectedProductCategory.level_four?.id.toString()
      );
      dispatch(
        getProductCategoryAction(
          selectedProductCategory.level_four?.id.toString() || EmptyString
        )
      );
    } else if (levels.levelFive) {
      formik.setFieldValue(
        "category.category_id",
        selectedProductCategory.level_five?.id.toString()
      );
      dispatch(
        getProductCategoryAction(
          selectedProductCategory.level_five?.id.toString() || EmptyString
        )
      );
    }
  };

  useEffect(() => {
    editMode &&
      dispatch(
        getProductCategoryTreeListAction(detailedProduct?.code || EmptyString)
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, editMode]);

  useEffect(() => {
    if (categoryTreeList.length > 0) {
      formik.setFieldValue(
        "category.category_id",
        categoryTreeList[categoryTreeList.length - 1].id
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryTreeList]);
  console.log("RERENDER");

  return (
    <>
      <Modal
        onClose={handleCloseCategoryModal}
        className="centered"
        title={t("tabs.categories")}
        open={modalCategory}
      >
        <ProductCategory levels={levels} onClose={handleCloseCategoryModal} />
      </Modal>

      <form onSubmit={formik.handleSubmit}>
        <div className="tabs">
          <Tabs>
            <TabList>
              <Tab>{t("tabs.general")}</Tab>
              <Tab>{t("tabs.barcodes")}</Tab>
              <Tab>{t("tabs.control")}</Tab>
              <Tab>{t("tabs.measurements")}</Tab>
              <Tab>{t("tabs.categories")}</Tab>
            </TabList>

            <TabPanel>
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
                  id="description"
                  name="description"
                  type="text"
                  label={t("columns.description")}
                  value={formik.values.description}
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
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.state}`}
                  action={getDictionaryContentAction}
                  options={dictionaryList.state}
                  placeholder={t("placeholders.selectState")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("state", value?.value);
                  }}
                  value={dictionaryList.state.find(
                    (item) => item.value === formik.values.state
                  )}
                />
                {formik.touched.state && formik.errors.state && (
                  <StyledErrorMessage>{formik.errors.state}</StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label={t("columns.is_suitable")}
                  value={formik.values.is_suitable}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(
                      "is_suitable",
                      e.currentTarget.checked
                    );
                  }}
                />
                {formik.touched.is_suitable && formik.errors.is_suitable && (
                  <StyledErrorMessage>
                    {formik.errors.is_suitable}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="type"
                  name="type"
                  type="text"
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
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.kitType}`}
                  action={getDictionaryContentAction}
                  options={dictionaryList.kitType}
                  placeholder={t("columns.kit_type")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("kit_type", value?.value);
                  }}
                  value={dictionaryList.kitType.find(
                    (item) => item.value === formik.values.kit_type
                  )}
                />
                {formik.touched.kit_type && formik.errors.kit_type && (
                  <StyledErrorMessage>
                    {formik.errors.kit_type}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.processingType}`}
                  action={getDictionaryContentAction}
                  options={dictionaryList.processingType}
                  placeholder={t("columns.processing_type")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("processing_type", value?.value);
                  }}
                  value={dictionaryList.processingType.find(
                    (item) => item.value === formik.values.processing_type
                  )}
                />
                {formik.touched.processing_type &&
                  formik.errors.processing_type && (
                    <StyledErrorMessage>
                      {formik.errors.processing_type}
                    </StyledErrorMessage>
                  )}
              </FormGroup>

              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.rotation}`}
                  action={getDictionaryContentAction}
                  placeholder={t("columns.rotation")}
                  options={dictionaryList.rotation}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("rotation", value?.value);
                  }}
                  value={dictionaryList.rotation.find(
                    (item) => item.value === formik.values.rotation
                  )}
                />
                {formik.touched.rotation && formik.errors.rotation && (
                  <StyledErrorMessage>
                    {formik.errors.rotation}
                  </StyledErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Select<ReactSelectValues>
                  className="selectWrapper"
                  options={measureUnitList}
                  placeholder={t("columns.measure_unit")}
                  components={{
                    MenuList: (props) => (
                      <SelectMenuButton
                        total_pages={measureUnitData.total_pages}
                        number={measureUnitData.number}
                        onClick={handleClickMoreBtnMeasureUnit}
                        {...props}
                      />
                    ),
                    ValueContainer: CustomValueContainer,
                  }}
                  theme={customTheme}
                  styles={customStyles()}
                  menuPosition="fixed"
                  onChange={(i) => {
                    formik.setFieldValue("measure_unit", i?.value);
                  }}
                  value={commodityList.find(
                    (item) => item.value === formik.values.measure_unit
                  )}
                  onMenuOpen={() => {
                    dispatch(getAllMeasureUnitsAction({ page: 1 }));
                  }}
                  isSearchable={true}
                />
                {formik.touched.measure_unit && formik.errors.measure_unit && (
                  <StyledErrorMessage>
                    {formik.errors.measure_unit}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="image_url"
                  name="image_url"
                  type="text"
                  label={t("columns.image_url")}
                  value={formik.values.image_url}
                  onChange={(e) =>
                    formik.setFieldValue("image_url", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.image_url && formik.errors.image_url && (
                  <StyledErrorMessage>
                    {formik.errors.image_url}
                  </StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="note"
                  name="note"
                  type="text"
                  label={t("columns.note")}
                  value={formik.values.note}
                  onChange={(e) => formik.setFieldValue("note", e.target.value)}
                  disabled={false}
                />
                {formik.touched.note && formik.errors.note && (
                  <StyledErrorMessage>{formik.errors.note}</StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.measure_state}`}
                  action={getDictionaryContentAction}
                  options={dictionaryList.measure_state}
                  placeholder={t("columns.measure_state")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue("measure_state", value?.value);
                  }}
                  value={dictionaryList.measure_state.find(
                    (item) => item.value === formik.values.measure_state
                  )}
                />
                {formik.touched.measure_state &&
                  formik.errors.measure_state && (
                    <StyledErrorMessage>
                      {formik.errors.measure_state}
                    </StyledErrorMessage>
                  )}
              </FormGroup>

              <FormGroup>
                <Select<ReactSelectValues>
                  className="selectWrapper"
                  options={popularityList}
                  placeholder={t("columns.popularity_code")}
                  components={{
                    MenuList: (props) => (
                      <SelectMenuButton
                        total_pages={popularityData.total_pages}
                        number={popularityData.number}
                        onClick={handleClickMoreBtnPopularity}
                        {...props}
                      />
                    ),
                  }}
                  theme={customTheme}
                  styles={customStyles()}
                  menuPosition="fixed"
                  onChange={(i) => {
                    formik.setFieldValue("popularity_code", i?.value);
                  }}
                  value={popularityList.find(
                    (item) => item.value === formik.values.popularity_code
                  )}
                  onMenuOpen={() => {
                    dispatch(getSearchAllPopularitiesAction({ page: 1 }));
                  }}
                  isSearchable={true}
                />
                {formik.touched.popularity_code &&
                  formik.errors.popularity_code && (
                    <StyledErrorMessage>
                      {formik.errors.popularity_code}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <Select<ReactSelectValues>
                  className="selectWrapper"
                  options={commodityList}
                  placeholder={t("columns.commodity_code")}
                  components={{
                    MenuList: (props) => (
                      <SelectMenuButton
                        total_pages={commodityData.total_pages}
                        number={commodityData.number}
                        onClick={handleClickMoreBtnCommodity}
                        {...props}
                      />
                    ),
                  }}
                  theme={customTheme}
                  styles={customStyles()}
                  menuPosition="fixed"
                  onChange={(i) => {
                    formik.setFieldValue("commodity_code", i?.value);
                  }}
                  value={commodityList.find(
                    (item) => item.value === formik.values.commodity_code
                  )}
                  onMenuOpen={() => {
                    dispatch(getSearchAllCommoditiesAction({ page: 1 }));
                  }}
                  isSearchable={true}
                />
                {formik.touched.commodity_code &&
                  formik.errors.commodity_code && (
                    <StyledErrorMessage>
                      {formik.errors.commodity_code}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
            </TabPanel>
            <TabPanel>
              <FormGroup className={"d-flex"}>
                <InputWithLabel
                  id="codeBar"
                  name="codeBar"
                  type="number"
                  label={t("columns.barcodes")}
                  value={barcodes.code || EmptyString}
                  onChange={(e) =>
                    setBarcodes({
                      ...barcodes,
                      code: e.target.value,
                    })
                  }
                  disabled={false}
                />
                <InputWithLabel
                  id="typeBar"
                  name="typeBar"
                  type="text"
                  label={t("columns.type")}
                  value={barcodes.type || EmptyString}
                  onChange={(e) =>
                    setBarcodes({
                      ...barcodes,
                      type: e.target.value,
                    })
                  }
                  disabled={false}
                />

                <Checkbox
                  disabled={
                    formik.values.barcodes.find((x) => x.is_primary === true)
                      ? true
                      : false
                  }
                  label={t("columns.is_primary")}
                  value={barcodes.is_primary || false}
                  onChange={(e) =>
                    setBarcodes({
                      ...barcodes,
                      is_primary: e.target.checked,
                    })
                  }
                />

                <Button
                  width="auto"
                  colors={{
                    bgColor: appColors.primary,
                    textColor: appColors.white,
                  }}
                  onClick={handleClickAddBarcode}
                  type={"button"}
                >
                  <span className={"btn-text"}>+</span>
                </Button>
              </FormGroup>
              <TableWrapper>
                <CustomTable<BarcodeTypes>
                  columns={tableColumns}
                  data={dataBarcodes}
                  handleClickRow={handleClickRow}
                  selectedRow={EmptyString}
                />
              </TableWrapper>
              {formik.errors.barcodes && (
                <StyledErrorMessage>
                  {formik.errors.barcodes}
                </StyledErrorMessage>
              )}
            </TabPanel>
            <TabPanel>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.accuracy_of_expiration_date}`}
                  action={getDictionaryContentAction}
                  placeholder={t("columns.accuracy_of_expiration_date")}
                  options={dictionaryList.accuracy_of_expiration_date}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue(
                      "control.accuracy_of_expiration_date",
                      value?.value
                    );
                  }}
                  value={dictionaryList.accuracy_of_expiration_date.find(
                    (item) =>
                      item.value ===
                      formik.values.control.accuracy_of_expiration_date
                  )}
                />
                {formik.touched.control?.accuracy_of_expiration_date &&
                  formik.errors.control?.accuracy_of_expiration_date && (
                    <StyledErrorMessage>
                      {formik.errors.control.accuracy_of_expiration_date}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.accuracy_of_production_date}`}
                  action={getDictionaryContentAction}
                  options={dictionaryList.accuracy_of_production_date}
                  placeholder={t("columns.accuracy_of_production_date")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue(
                      "control.accuracy_of_production_date",
                      value?.value
                    );
                  }}
                  value={dictionaryList.accuracy_of_production_date.find(
                    (item) =>
                      item.value ===
                      formik.values.control.accuracy_of_production_date
                  )}
                />
                {formik.touched.control?.accuracy_of_production_date &&
                  formik.errors.control?.accuracy_of_production_date && (
                    <StyledErrorMessage>
                      {formik.errors.control.accuracy_of_production_date}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <DynamicSelect<string>
                  payload={`${dictionaryCodes.productCard.self}.${dictionaryCodes.productCard.account_serial_number}`}
                  action={getDictionaryContentAction}
                  options={dictionaryList.account_serial_number}
                  placeholder={t("columns.account_serial_number")}
                  editMode={editMode}
                  onChange={(value) => {
                    formik.setFieldValue(
                      "control.account_serial_number",
                      value?.value
                    );
                  }}
                  value={dictionaryList.account_serial_number.find(
                    (item) =>
                      item.value === formik.values.control.account_serial_number
                  )}
                />
                {formik.touched.control?.account_serial_number &&
                  formik.errors.control?.account_serial_number && (
                    <StyledErrorMessage>
                      {formik.errors.control.account_serial_number}
                    </StyledErrorMessage>
                  )}
              </FormGroup>

              <FormGroup>
                <Checkbox
                  label={t("columns.is_print_expiration_date")}
                  value={formik.values.control.is_print_expiration_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(
                      "control.is_print_expiration_date",
                      e.currentTarget.checked
                    );
                  }}
                />
                {formik.touched.control?.is_print_expiration_date &&
                  formik.errors.control?.is_print_expiration_date && (
                    <StyledErrorMessage>
                      {formik.errors.control?.is_print_expiration_date}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <Checkbox
                  label={t("columns.is_track_expiration_date")}
                  value={formik.values.control.is_track_expiration_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(
                      "control.is_track_expiration_date",
                      e.currentTarget.checked
                    );
                  }}
                />
                {formik.touched.control?.is_track_expiration_date &&
                  formik.errors.control?.is_track_expiration_date && (
                    <StyledErrorMessage>
                      {formik.errors.control?.is_track_expiration_date}
                    </StyledErrorMessage>
                  )}
              </FormGroup>

              <FormGroup>
                <InputWithLabel
                  id="control.expiration_date"
                  name="control.expiration_date"
                  type="number"
                  label={t("columns.expiration_date")}
                  value={formik.values.control.expiration_date.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.expiration_date",
                      parseInt(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.expiration_date &&
                  formik.errors.control?.expiration_date && (
                    <StyledErrorMessage>
                      {formik.errors.control.expiration_date}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="control.min_expiration_date_for_inbound"
                  name="control.min_expiration_date_for_inbound"
                  type="number"
                  label={t("columns.min_expiration_date_for_inbound")}
                  value={formik.values.control.min_expiration_date_for_inbound.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.min_expiration_date_for_inbound",
                      parseInt(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.min_expiration_date_for_inbound &&
                  formik.errors.control?.min_expiration_date_for_inbound && (
                    <StyledErrorMessage>
                      {formik.errors.control.min_expiration_date_for_inbound}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="control.min_expiration_date_for_outbound"
                  name="control.min_expiration_date_for_outbound"
                  type="number"
                  label={t("columns.min_expiration_date_for_outbound")}
                  value={formik.values.control.min_expiration_date_for_outbound.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.min_expiration_date_for_outbound",
                      parseInt(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.min_expiration_date_for_outbound &&
                  formik.errors.control?.min_expiration_date_for_outbound && (
                    <StyledErrorMessage>
                      {formik.errors.control.min_expiration_date_for_outbound}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="control.min_count_in_picking"
                  name="control.min_count_in_picking"
                  type="text"
                  label={t("columns.min_count_in_picking")}
                  value={formik.values.control.min_count_in_picking}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.min_count_in_picking",
                      e.target.value
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.min_count_in_picking &&
                  formik.errors.control?.min_count_in_picking && (
                    <StyledErrorMessage>
                      {formik.errors.control.min_count_in_picking}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="control.max_count_in_picking"
                  name="control.max_count_in_picking"
                  type="text"
                  label={t("columns.max_count_in_picking")}
                  value={formik.values.control.max_count_in_picking}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.max_count_in_picking",
                      e.target.value
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.max_count_in_picking &&
                  formik.errors.control?.max_count_in_picking && (
                    <StyledErrorMessage>
                      {formik.errors.control.max_count_in_picking}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="control.type_of_trade_item"
                  name="control.type_of_trade_item"
                  type="text"
                  label={t("columns.type_of_trade_item")}
                  value={formik.values.control.type_of_trade_item}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.type_of_trade_item",
                      e.target.value
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.type_of_trade_item &&
                  formik.errors.control?.type_of_trade_item && (
                    <StyledErrorMessage>
                      {formik.errors.control.type_of_trade_item}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="control.equipment_type"
                  name="control.equipment_type"
                  type="text"
                  label={t("columns.equipment_type")}
                  value={formik.values.control.equipment_type}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "control.equipment_type",
                      e.target.value
                    )
                  }
                  disabled={false}
                />
                {formik.touched.control?.equipment_type &&
                  formik.errors.control?.equipment_type && (
                    <StyledErrorMessage>
                      {formik.errors.control.equipment_type}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
            </TabPanel>
            <TabPanel>
              <FormGroup>
                <InputWithLabel
                  id="measurement.net_weight"
                  name="measurement.net_weight"
                  type="number"
                  label={t("columns.net_weight")}
                  value={formik.values.measurement.net_weight.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.net_weight",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.net_weight &&
                  formik.errors.measurement?.net_weight && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.net_weight}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="measurement.gross_weight"
                  name="measurement.gross_weight"
                  type="number"
                  label={t("columns.gross_weight")}
                  value={formik.values.measurement.gross_weight.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.gross_weight",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.gross_weight &&
                  formik.errors.measurement?.gross_weight && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.gross_weight}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="measurement.length"
                  name="measurement.length"
                  type="number"
                  label={t("columns.length")}
                  value={formik.values.measurement.length.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.length",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.length &&
                  formik.errors.measurement?.length && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.length}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="measurement.width"
                  name="measurement.width"
                  type="number"
                  label={t("columns.width")}
                  value={formik.values.measurement.width.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.width",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.width &&
                  formik.errors.measurement?.width && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.width}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="measurement.height"
                  name="measurement.height"
                  type="number"
                  label={t("columns.height")}
                  value={formik.values.measurement.height.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.height",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.height &&
                  formik.errors.measurement?.height && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.height}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="measurement.volume"
                  name="measurement.volume"
                  type="number"
                  label={t("columns.volume")}
                  value={(
                    parseInt(formik.values.measurement.length.toString()) *
                    parseInt(formik.values.measurement.height.toString()) *
                    parseInt(formik.values.measurement.width.toString())
                  ).toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.volume",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.volume &&
                  formik.errors.measurement?.volume && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.volume}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id="measurement.cell_height"
                  name="measurement.cell_height"
                  type="number"
                  label={t("columns.cell_height")}
                  value={formik.values.measurement.cell_height.toString()}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "measurement.cell_height",
                      parseFloat(e.target.value)
                    )
                  }
                  disabled={false}
                />
                {formik.touched.measurement?.cell_height &&
                  formik.errors.measurement?.cell_height && (
                    <StyledErrorMessage>
                      {formik.errors.measurement.cell_height}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
            </TabPanel>
            <TabPanel>
              <FormGroup>
                <Picker
                  onClick={() => {
                    setModalCategory(true);
                    setLevels({
                      levelOne: true,
                      levelTwo: false,
                      levelThree: false,
                      levelFour: false,
                      levelFive: false,
                    });
                    dispatch(getProductCategoryAction(EmptyString));
                  }}
                  value={
                    editMode && categoryTreeList[0]
                      ? categoryTreeList[0].name
                      : selectedProductCategory.level_one?.name || EmptyString
                  }
                  label={t("columns.level_one")}
                  disabled={false}
                  hasValue={
                    selectedProductCategory?.level_one?.code
                      ? true
                      : categoryTreeList[0]
                      ? true
                      : false
                  }
                />
              </FormGroup>
              <FormGroup>
                <Picker
                  onClick={() => {
                    setModalCategory(true);
                    setLevels({
                      levelOne: false,
                      levelTwo: true,
                      levelThree: false,
                      levelFour: false,
                      levelFive: false,
                    });
                  }}
                  value={
                    editMode && categoryTreeList[1]
                      ? categoryTreeList[1].name
                      : selectedProductCategory.level_two?.name || EmptyString
                  }
                  label={t("columns.level_two")}
                  disabled={!selectedProductCategory?.level_one?.has_child}
                  hasValue={
                    selectedProductCategory?.level_two?.code
                      ? true
                      : categoryTreeList[1]
                      ? true
                      : false
                  }
                />
              </FormGroup>
              <FormGroup>
                <Picker
                  onClick={() => {
                    setModalCategory(true);
                    setLevels({
                      levelOne: false,
                      levelTwo: false,
                      levelThree: true,
                      levelFour: false,
                      levelFive: false,
                    });
                  }}
                  value={
                    editMode && categoryTreeList[2]
                      ? categoryTreeList[2].name
                      : selectedProductCategory.level_three?.name || EmptyString
                  }
                  label={t("columns.level_three")}
                  disabled={!selectedProductCategory?.level_two?.has_child}
                  hasValue={
                    selectedProductCategory?.level_three?.code
                      ? true
                      : categoryTreeList[2]
                      ? true
                      : false
                  }
                />
              </FormGroup>
              <FormGroup>
                <Picker
                  onClick={() => {
                    setModalCategory(true);
                    setLevels({
                      levelOne: false,
                      levelTwo: false,
                      levelThree: false,
                      levelFour: true,
                      levelFive: false,
                    });
                  }}
                  value={
                    editMode && categoryTreeList[3]
                      ? categoryTreeList[3].name
                      : selectedProductCategory.level_four?.name || EmptyString
                  }
                  label={t("columns.level_four")}
                  disabled={!selectedProductCategory?.level_three?.has_child}
                  hasValue={
                    selectedProductCategory?.level_four?.code
                      ? true
                      : categoryTreeList[3]
                      ? true
                      : false
                  }
                />
              </FormGroup>
              <FormGroup>
                <Picker
                  onClick={() => {
                    setModalCategory(true);
                    setLevels({
                      levelOne: false,
                      levelTwo: false,
                      levelThree: false,
                      levelFour: false,
                      levelFive: true,
                    });
                  }}
                  value={
                    editMode && categoryTreeList[4]
                      ? categoryTreeList[4].name
                      : selectedProductCategory.level_five?.name || EmptyString
                  }
                  label={t("columns.level_five")}
                  disabled={!selectedProductCategory?.level_four?.has_child}
                  hasValue={
                    selectedProductCategory?.level_five?.code
                      ? true
                      : categoryTreeList[4]
                      ? true
                      : false
                  }
                />
              </FormGroup>
            </TabPanel>
          </Tabs>
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
              {isFetchingPostProductCatalog === "pending" ||
              isFetchingPutProductCatalog === "pending"
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
