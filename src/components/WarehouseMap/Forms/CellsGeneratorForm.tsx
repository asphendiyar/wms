import { useFormik } from "formik"
import { Fragment, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Select, { SingleValue } from "react-select"
import * as Yup from "yup"
import { ReactSelectValues, TreeNode } from "../../../app/commonTypes"
import {
  appColors,
  customStyles,
  customTheme,
  EmptyString,
} from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getDetailedCellTypesAction } from "../../../app/reducers/cell-types/actions"
import { getDictionaryContentAction } from "../../../app/reducers/dictionary/actions"
import { dictionaryCodes } from "../../../app/reducers/dictionary/initials"
import { namedRequestsInProgress } from "../../../app/reducers/requests"
import { clearWarehouseErps } from "../../../app/reducers/warehouse-map"
import {
  generateCellAction,
  getWarehouseCellTypesAction,
  getWarehouseErpsAction,
  getWarehouseFZonesAction,
} from "../../../app/reducers/warehouse-map/actions"
import { selectActiveRootWarehouseName } from "../../../app/reducers/warehouse-map/selectors"
import {
  CellGeneratorFormValues,
  WarehouseMapEnums,
} from "../../../app/reducers/warehouse-map/types"
import { CellsGeneratorFormWrapper } from "../../../pages/WarehouseMap/style"
import { Button } from "../../Common/Button"
import Checkbox from "../../Common/Checkbox"
import DynamicSelect from "../../Common/DynamicSelect"
import { InputWithLabel } from "../../Common/Input"
import SelectMenuButton, { CustomValueContainer } from "../../Common/rscc"
import {
  FlexJustifyBetween,
  FormGroup,
  StyledErrorMessage,
} from "../../Common/styled"

type CellsGeneratorFormProps = {
  handleClose: () => void
}

type InputGroupProps = {
  nameField: string
  fromField: string
  toField: string
  labels: {
    nameFieldLabel: string
    fromFieldLabel: string
    toFieldLabel: string
  }
  values: {
    nameFieldValue: string
    fromFieldValue: string
    toFieldValue: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type SelectTypes = "cellTypes" | "erps" | "fZones"

const InputGroup: React.FC<InputGroupProps> = (props) => {
  return (
    <FlexJustifyBetween isFlexOne>
      {/* <InputWithLabel
        id={props.nameField}
        name={props.nameField}
        type="text"/
        label={props.labels.nameFieldLabel}
        value={props.values.nameFieldValue}
        onChange={props.onChange}
      /> */}
      <InputWithLabel
        id={props.fromField}
        name={props.fromField}
        type="text"
        label={props.labels.fromFieldLabel}
        value={props.values.fromFieldValue}
        onChange={props.onChange}
      />
      <InputWithLabel
        id={props.toField}
        name={props.toField}
        type="text"
        label={props.labels.toFieldLabel}
        value={props.values.toFieldValue}
        onChange={props.onChange}
      />
    </FlexJustifyBetween>
  )
}

const validationSchema = Yup.object().shape({
  erp_warehouse_id: Yup.string().required("Обязательное поле"),
  functional_zone_id: Yup.string().required("Обязательное поле"),
  cell_type_id: Yup.string().required("Обязательное поле"),
  // high_rise: Yup.number()
  //   .typeError("Только цифры")
  //   .required("Обязательное поле"),
  // compression: Yup.number()
  //   .typeError("Только цифры")
  //   .required("Обязательное поле"),
  prefix_region: Yup.string().required("Обязательное поле"),
  // prefix_row: Yup.string().required("Обязательное поле"),
  // row_from: Yup.string().required("Обязательное поле"),
  // row_to: Yup.string().required("Обязательное поле"),
  // prefix_section: Yup.string().required("Обязательное поле"),
  // section_from: Yup.string().required("Обязательное поле"),
  // section_to: Yup.string().required("Обязательное поле"),
  // prefix_floor: Yup.string().required("Обязательное поле"),
  // floor_from: Yup.string().required("Обязательное поле"),
  // floor_to: Yup.string().required("Обязательное поле"),
  // prefix_compartment: Yup.string().required("Обязательное поле"),
  // compartment_from: Yup.string().required("Обязательное поле"),
  // compartment_to: Yup.string().required("Обязательное поле"),
  // prefix_shelf: Yup.string().required("Обязательное поле"),
  // shelf_from: Yup.string().required("Обязательное поле"),
  // shelf_to: Yup.string().required("Обязательное поле"),
  // max_weight: Yup.number()
  //   .typeError("Только цифры")
  //   .required("Обязательное поле"),
  // length: Yup.number().typeError("Только цифры").required("Обязательное поле"),
  // width: Yup.number().typeError("Только цифры").required("Обязательное поле"),
  // height: Yup.number().typeError("Только цифры").required("Обязательное поле"),
})

const CellsGeneratorForm: React.FC<CellsGeneratorFormProps> = ({
  handleClose,
}) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isFetchingGenerateCell = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.generateCell)
  )
  const selectedRootWarehouseId = useAppSelector(
    (state) => state.warehouseMap.selectedRootWarehouseId
  )
  const rootTreeNode: TreeNode = useAppSelector(selectActiveRootWarehouseName)
  const warehouseErps = useAppSelector(
    (state) => state.warehouseMap.warehouseErps
  )
  const cellData = useAppSelector((state) => state.warehouseMap.cellData)
  const detailedCellType = useAppSelector(
    (state) => state.cellTypes.detailedCellType
  )
  const warehouseFZones = useAppSelector(
    (state) => state.warehouseMap.warehouseFZones
  )
  const warehouseErpsResponse = useAppSelector(
    (state) => state.warehouseMap.warehouseErpsResponse
  )
  const warehouseCellTypesResponse = useAppSelector(
    (state) => state.warehouseMap.warehouseCellTypesResponse
  )
  const warehouseCellTypes = useAppSelector(
    (state) => state.warehouseMap.warehouseCellTypes
  )
  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.warehouse
  )

  const initialValues = {
    warehouse_id: Number(selectedRootWarehouseId) || 0,
    erp_warehouse_id: cellData?.erp_warehouse_id || EmptyString,
    functional_zone_id: cellData?.general.functional_zone.id || EmptyString,
    cell_type_id: cellData?.general.cell_type.id || EmptyString,
    is_allow_overflow: cellData?.general.is_allow_overflow || false,
    is_merge_trade_item: cellData?.general.is_merge_trade_item || false,
    high_rise: cellData?.general.high_rise || EmptyString,
    compression: cellData?.general.compression || EmptyString,
    prefix_region: cellData?.region || EmptyString,
    prefix_row: EmptyString,
    row_from: EmptyString,
    row_to: EmptyString,
    prefix_section: EmptyString,
    section_from: EmptyString,
    section_to: EmptyString,
    prefix_floor: EmptyString,
    floor_from: EmptyString,
    floor_to: EmptyString,
    prefix_compartment: EmptyString,
    compartment_from: EmptyString,
    compartment_to: EmptyString,
    prefix_shelf: EmptyString,
    shelf_from: EmptyString,
    shelf_to: EmptyString,
    max_weight: cellData?.measurement.max_weight || EmptyString,
    max_volume: cellData?.measurement.max_volume || EmptyString,
    length: cellData?.measurement.length || EmptyString,
    width: cellData?.measurement.width || EmptyString,
    height: cellData?.measurement.height || EmptyString,
    is_save_without_commodity_unit: EmptyString,
    is_save_comm_unit_same_level: EmptyString,
    commodity_unit_disassembly_rule: EmptyString,
    package_disassembly_rule: EmptyString,
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const newValues = {} as CellGeneratorFormValues
      for (const key in values) {
        //@ts-ignore
        if (typeof values[key] !== "number" && values[key].length) {
          //@ts-ignore
          newValues[key] = values[key]
        }
      }
      dispatch(
        generateCellAction({
          ...newValues,
          warehouse_id: Number(selectedRootWarehouseId),
          cell_type_id: Number(values.cell_type_id),
          erp_warehouse_id: Number(values.erp_warehouse_id),
          functional_zone_id: values.functional_zone_id,
          high_rise: Number(values.high_rise),
          compression: Number(values.compression),
          height: Number(values.height),
          width: Number(values.width),
          length: Number(values.length),
          max_volume:
            Number(formik.values.length) *
            Number(formik.values.width) *
            Number(formik.values.height),
          max_weight: Number(values.max_weight),
        })
      )
    },
  })

  const onClose = () => handleClose()

  const handleClickSelectMoreButton = (selectType: SelectTypes) => {
    switch (selectType) {
      case "cellTypes":
        dispatch(
          getWarehouseCellTypesAction({
            page: warehouseCellTypesResponse
              ? warehouseCellTypesResponse.number + 1
              : 1,
          })
        )
        break
      case "erps":
        dispatch(
          getWarehouseErpsAction({
            page: warehouseErpsResponse ? warehouseErpsResponse.number + 1 : 1,
            warehouse_id: selectedRootWarehouseId,
          })
        )
        break
    }
  }

  const handleChangeSelects = (
    option: SingleValue<ReactSelectValues>,
    selectType: SelectTypes
  ) => {
    switch (selectType) {
      case "cellTypes":
        option &&
          option?.optValue &&
          dispatch(getDetailedCellTypesAction(option?.optValue))
        formik.setFieldValue("cell_type_id", option?.value)
        break
      case "erps":
        formik.setFieldValue("erp_warehouse_id", option?.value)
        break
      case "fZones":
        formik.setFieldValue("functional_zone_id", option?.value)
        break
    }
  }

  useEffect(() => {
    dispatch(
      getWarehouseErpsAction({
        page: 1,
        warehouse_id: selectedRootWarehouseId,
      })
    )
    dispatch(getWarehouseFZonesAction({ id: selectedRootWarehouseId }))
    dispatch(getWarehouseCellTypesAction({ page: 1 }))
    return () => {
      dispatch(clearWarehouseErps())
    }
  }, [dispatch, selectedRootWarehouseId])

  useEffect(() => {
    if (detailedCellType) {
      formik.setFieldValue("length", detailedCellType.length)
      formik.setFieldValue("width", detailedCellType.width)
      formik.setFieldValue("height", detailedCellType.height)
      formik.setFieldValue("max_weight", detailedCellType.weight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailedCellType])

  return (
    <Fragment>
      <CellsGeneratorFormWrapper onSubmit={formik.handleSubmit}>
        <FormGroup>
          <InputWithLabel
            id="warehouse_id"
            name="warehouse_id"
            type="text"
            label={t("columns.warehouses")}
            value={rootTreeNode?.title || EmptyString}
            onChange={() => undefined}
            readOnly={true}
          />
        </FormGroup>
        <FormGroup>
          <Select<ReactSelectValues>
            options={warehouseErps}
            placeholder={t("columns.erp_warehouse")}
            theme={customTheme}
            components={{
              MenuList: (props) => (
                <SelectMenuButton
                  total_pages={warehouseErpsResponse?.total_pages}
                  number={warehouseErpsResponse?.number}
                  onClick={() => handleClickSelectMoreButton("erps")}
                  {...props}
                />
              ),
              ValueContainer: CustomValueContainer,
            }}
            onChange={(option) => handleChangeSelects(option, "erps")}
            styles={customStyles()}
            menuPosition="fixed"
            value={warehouseErps.find(
              (item) => item.value === cellData?.erp_warehouse_id
            )}
            isSearchable={true}
            isClearable
          />
          {formik.touched.erp_warehouse_id &&
            formik.errors.erp_warehouse_id && (
              <StyledErrorMessage>
                {formik.errors.erp_warehouse_id}
              </StyledErrorMessage>
            )}
        </FormGroup>
        <FormGroup>
          <Select<ReactSelectValues>
            options={warehouseFZones}
            placeholder={t("columns.functional_zone_id")}
            theme={customTheme}
            styles={customStyles()}
            onChange={(option) => handleChangeSelects(option, "fZones")}
            menuPosition="fixed"
            components={{
              ValueContainer: CustomValueContainer,
            }}
            isSearchable={true}
            isClearable
          />
          {formik.touched.functional_zone_id &&
            formik.errors.functional_zone_id && (
              <StyledErrorMessage>
                {formik.errors.functional_zone_id}
              </StyledErrorMessage>
            )}
        </FormGroup>
        <FormGroup>
          <Select<ReactSelectValues>
            options={warehouseCellTypes}
            placeholder={t("columns.cell_types")}
            theme={customTheme}
            onChange={(option) => handleChangeSelects(option, "cellTypes")}
            components={{
              MenuList: (props) => (
                <SelectMenuButton
                  total_pages={warehouseCellTypesResponse?.total_pages}
                  number={warehouseCellTypesResponse?.number}
                  onClick={() => handleClickSelectMoreButton("cellTypes")}
                  {...props}
                />
              ),
              ValueContainer: CustomValueContainer,
            }}
            styles={customStyles()}
            menuPosition="fixed"
            isSearchable={true}
            isClearable
          />
          {formik.touched.cell_type_id && formik.errors.cell_type_id && (
            <StyledErrorMessage>
              {formik.errors.cell_type_id}
            </StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Checkbox
            label={t("columns.is_allow_overflow")}
            value={formik.values.is_allow_overflow}
            onChange={(e) =>
              formik.setFieldValue("is_allow_overflow", e.target.checked)
            }
          />
        </FormGroup>
        <FormGroup>
          <Checkbox
            label={t("columns.is_merge_trade_item")}
            value={formik.values.is_merge_trade_item}
            onChange={(e) =>
              formik.setFieldValue("is_merge_trade_item", e.target.checked)
            }
          />
        </FormGroup>
        <FlexJustifyBetween isFlexOne>
          <FormGroup>
            <InputWithLabel
              id="high_rise"
              name="high_rise"
              type="number"
              label={t("columns.high_rise")}
              value={formik.values.high_rise.toString()}
              onChange={formik.handleChange}
            />
            {formik.touched.high_rise && formik.errors.high_rise && (
              <StyledErrorMessage>{formik.errors.high_rise}</StyledErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputWithLabel
              id="compression"
              name="compression"
              type="number"
              label={t("columns.compression")}
              value={formik.values.compression.toString()}
              onChange={formik.handleChange}
            />
            {formik.touched.compression && formik.errors.compression && (
              <StyledErrorMessage>
                {formik.errors.compression}
              </StyledErrorMessage>
            )}
          </FormGroup>
        </FlexJustifyBetween>
        <FormGroup>
          <InputWithLabel
            id="prefix_region"
            name="prefix_region"
            type="text"
            label={t("columns.prefix_region")}
            value={formik.values.prefix_region}
            onChange={formik.handleChange}
          />
          {formik.touched.prefix_region && formik.errors.prefix_region && (
            <StyledErrorMessage>
              {formik.errors.prefix_region}
            </StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputGroup
            nameField="prefix_row"
            fromField="row_from"
            toField="row_to"
            labels={{
              nameFieldLabel: t("columns.prefix_row"),
              fromFieldLabel: t("columns.row_from"),
              toFieldLabel: t("columns.row_to"),
            }}
            onChange={formik.handleChange}
            values={{
              nameFieldValue: formik.values.prefix_row,
              fromFieldValue: formik.values.row_from,
              toFieldValue: formik.values.row_to,
            }}
          />
          {formik.touched.prefix_row && formik.errors.prefix_row && (
            <StyledErrorMessage>{formik.errors.prefix_row}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputGroup
            nameField="prefix_floor"
            fromField="floor_from"
            toField="floor_to"
            labels={{
              nameFieldLabel: t("columns.prefix_floor"),
              fromFieldLabel: t("columns.floor_from"),
              toFieldLabel: t("columns.floor_to"),
            }}
            onChange={formik.handleChange}
            values={{
              nameFieldValue: formik.values.prefix_floor,
              fromFieldValue: formik.values.floor_from,
              toFieldValue: formik.values.floor_to,
            }}
          />
          {formik.touched.prefix_floor && formik.errors.prefix_floor && (
            <StyledErrorMessage>
              {formik.errors.prefix_floor}
            </StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputGroup
            nameField="prefix_shelf"
            fromField="shelf_from"
            toField="shelf_to"
            labels={{
              nameFieldLabel: t("columns.prefix_shelf"),
              fromFieldLabel: t("columns.shelf_from"),
              toFieldLabel: t("columns.shelf_to"),
            }}
            onChange={formik.handleChange}
            values={{
              nameFieldValue: formik.values.prefix_shelf,
              fromFieldValue: formik.values.shelf_from,
              toFieldValue: formik.values.shelf_to,
            }}
          />
          {formik.touched.prefix_shelf && formik.errors.prefix_shelf && (
            <StyledErrorMessage>
              {formik.errors.prefix_shelf}
            </StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputGroup
            nameField="prefix_section"
            fromField="section_from"
            toField="section_to"
            labels={{
              nameFieldLabel: t("columns.prefix_section"),
              fromFieldLabel: t("columns.section_from"),
              toFieldLabel: t("columns.section_to"),
            }}
            onChange={formik.handleChange}
            values={{
              nameFieldValue: formik.values.prefix_section,
              fromFieldValue: formik.values.section_from,
              toFieldValue: formik.values.section_to,
            }}
          />
          {formik.touched.prefix_section && formik.errors.prefix_section && (
            <StyledErrorMessage>
              {formik.errors.prefix_section}
            </StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputGroup
            nameField="prefix_compartment"
            fromField="compartment_from"
            toField="compartment_to"
            labels={{
              nameFieldLabel: t("columns.prefix_compartment"),
              fromFieldLabel: t("columns.compartment_from"),
              toFieldLabel: t("columns.compartment_to"),
            }}
            onChange={formik.handleChange}
            values={{
              nameFieldValue: formik.values.prefix_compartment,
              fromFieldValue: formik.values.compartment_from,
              toFieldValue: formik.values.compartment_to,
            }}
          />
          {formik.touched.prefix_compartment &&
            formik.errors.prefix_compartment && (
              <StyledErrorMessage>
                {formik.errors.prefix_compartment}
              </StyledErrorMessage>
            )}
        </FormGroup>
        <FlexJustifyBetween isFlexOne>
          <FormGroup>
            <InputWithLabel
              id="length"
              name="length"
              type="number"
              label={t("columns.length")}
              value={formik.values.length.toString()}
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
            />
            {formik.touched.height && formik.errors.height && (
              <StyledErrorMessage>{formik.errors.height}</StyledErrorMessage>
            )}
          </FormGroup>
        </FlexJustifyBetween>
        <FormGroup>
          <InputWithLabel
            id="max_weight"
            name="max_weight"
            type="number"
            label={t("columns.max_weight")}
            value={formik.values.max_weight.toString()}
            onChange={formik.handleChange}
          />
          {formik.touched.max_weight && formik.errors.max_weight && (
            <StyledErrorMessage>{formik.errors.max_weight}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <DynamicSelect<string>
            payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.storeWithoutTradeItem}`}
            options={dictionaryList.storeWithoutTradeItem}
            action={getDictionaryContentAction}
            placeholder={t("columns.is_save_without_commodity_unit")}
            editMode={false}
            onChange={(value) => {
              formik.setFieldValue(
                "is_save_without_commodity_unit",
                value?.value
              )
            }}
            value={dictionaryList.storeWithoutTradeItem.find(
              (item) =>
                item.value === formik.values.is_save_without_commodity_unit
            )}
          />
        </FormGroup>
        <FormGroup>
          <DynamicSelect<string>
            payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.storeInTradeItemSameLevel}`}
            options={dictionaryList.storeInTradeItemSameLevel}
            action={getDictionaryContentAction}
            placeholder={t("columns.is_save_comm_unit_same_level")}
            editMode={false}
            onChange={(value) => {
              formik.setFieldValue("is_save_comm_unit_same_level", value?.value)
            }}
            value={dictionaryList.storeInTradeItemSameLevel.find(
              (item) =>
                item.value === formik.values.is_save_comm_unit_same_level
            )}
          />
        </FormGroup>
        <FormGroup>
          <DynamicSelect<string>
            payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.commodityUnitDisassemblyRules}`}
            options={dictionaryList.commodityUnitDisassemblyRules}
            action={getDictionaryContentAction}
            placeholder={t("columns.commodity_unit_disassembly_rule")}
            editMode={false}
            onChange={(value) => {
              formik.setFieldValue(
                "commodity_unit_disassembly_rule",
                value?.value
              )
            }}
            value={dictionaryList.commodityUnitDisassemblyRules.find(
              (item) =>
                item.value === formik.values.commodity_unit_disassembly_rule
            )}
          />
        </FormGroup>
        <FormGroup>
          <DynamicSelect<string>
            payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.packageDisassemblyRules}`}
            options={dictionaryList.packageDisassemblyRules}
            action={getDictionaryContentAction}
            placeholder={t("columns.package_disassembly_rule")}
            editMode={false}
            onChange={(value) => {
              formik.setFieldValue("package_disassembly_rule", value?.value)
            }}
            value={dictionaryList.packageDisassemblyRules.find(
              (item) => item.value === formik.values.package_disassembly_rule
            )}
          />
        </FormGroup>
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
            disabled={isFetchingGenerateCell === "pending"}
          >
            <span>
              {isFetchingGenerateCell === "pending"
                ? t("buttons.wait")
                : t("buttons.new")}
            </span>
          </Button>
        </FormGroup>
      </CellsGeneratorFormWrapper>
    </Fragment>
  )
}

export default CellsGeneratorForm
