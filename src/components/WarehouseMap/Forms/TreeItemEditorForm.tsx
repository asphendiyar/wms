import { useFormik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Select, { SingleValue } from "react-select"
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
import {
  correctCellAction,
  getWarehouseCellTypesAction,
  getWarehouseErpsAction,
  getWarehouseFZonesAction,
} from "../../../app/reducers/warehouse-map/actions"
import { selectActiveRootWarehouseName } from "../../../app/reducers/warehouse-map/selectors"
import { WarehouseMapEnums } from "../../../app/reducers/warehouse-map/types"
import { Button } from "../../Common/Button"
import Checkbox from "../../Common/Checkbox"
import DynamicSelect from "../../Common/DynamicSelect"
import { InputWithLabel } from "../../Common/Input"
import SelectMenuButton, { CustomValueContainer } from "../../Common/rscc"
import {
  FlexJustifyBetween,
  FormGroup,
  StyledErrorMessage,
  Title,
} from "../../Common/styled"
import { SelectTypes } from "./CellsGeneratorForm"

type TreeItemEditorFormProps = {
  onClose: () => void
}
const TreeItemEditorForm: React.FC<TreeItemEditorFormProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isFetchingCorrectCell = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.correctCell)
  )
  const rootTreeNode: TreeNode = useAppSelector(selectActiveRootWarehouseName)
  const selectedRootWarehouseId = useAppSelector(
    (state) => state.warehouseMap.selectedRootWarehouseId
  )
  const warehouseErps = useAppSelector(
    (state) => state.warehouseMap.warehouseErps
  )
  const warehouseErpsResponse = useAppSelector(
    (state) => state.warehouseMap.warehouseErpsResponse
  )
  const warehouseCellTypesResponse = useAppSelector(
    (state) => state.warehouseMap.warehouseCellTypesResponse
  )
  const warehouseFZones = useAppSelector(
    (state) => state.warehouseMap.warehouseFZones
  )
  const warehouseCellTypes = useAppSelector(
    (state) => state.warehouseMap.warehouseCellTypes
  )
  const selectedNode = useAppSelector(
    (state) => state.warehouseMap.selectedNode
  )
  const detailedCellTypes = useAppSelector(
    (state) => state.cellTypes.detailedCellType
  )
  const cellData = useAppSelector((state) => state.warehouseMap.cellData)
  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.warehouse.retentionRules
  )
  const initialValues = {
    cell_type_id: cellData?.general.cell_type.id,
    warehouse_id: selectedRootWarehouseId,
    erp_warehouse_id: cellData?.erp_warehouse_id || 0,
    retention_rule: cellData?.general.retention_rule || EmptyString,
    is_allow_overflow: cellData?.general.is_allow_overflow || false,
    is_merge_trade_item: cellData?.general.is_merge_trade_item || false,
    high_rise: cellData?.general.high_rise,
    compression: cellData?.general.compression,
    actual_pallet: cellData?.general.actual_pallet,
    pallet_left: cellData?.general.pallet_left,
    max_pallet: cellData?.general.max_pallet,
    functional_zone_id: cellData?.general.functional_zone.id || 0,
    weight: cellData?.measurement.max_weight,
    volume: cellData?.measurement.volume,
    length: cellData?.measurement.length,
    width: cellData?.measurement.width,
    height: cellData?.measurement.height,
  }
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(
        correctCellAction({
          warehouse_id: Number(selectedRootWarehouseId),
          cell_id: selectedNode?.originalId || EmptyString,
          erp_warehouse_id: values.erp_warehouse_id,
          functional_zone_id: Number(values.functional_zone_id),
          general: {
            cell_type_id: Number(values.cell_type_id),
            actual_pallet: Number(values.actual_pallet),
            compression: Number(values.compression),
            high_rise: Number(values.high_rise),
            is_allow_overflow: values.is_allow_overflow,
            is_merge_trade_item: values.is_merge_trade_item,
            max_pallet: Number(values.max_pallet),
            pallet_left: Number(values.pallet_left),
            retention_rule: values.retention_rule,
          },
          measurement: {
            height: Number(values.height),
            length: Number(values.length),
            volume: Number(values.volume),
            weight: Number(values.weight),
            width: Number(values.width),
          },
        })
      )
    },
  })

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (detailedCellTypes) {
      formik.setFieldValue("weight", detailedCellTypes.weight)
      formik.setFieldValue("volume", detailedCellTypes.volume)
      formik.setFieldValue("height", detailedCellTypes.height)
      formik.setFieldValue("width", detailedCellTypes.width)
      formik.setFieldValue("length", detailedCellTypes.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailedCellTypes])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
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
              (item) => item.value === formik.values.erp_warehouse_id
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
            value={warehouseCellTypes.find(
              (item) => item.value === formik.values.cell_type_id
            )}
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
          <Select<ReactSelectValues>
            options={warehouseFZones}
            placeholder={t("columns.functional_zone_id")}
            theme={customTheme}
            styles={customStyles()}
            onChange={(option) => handleChangeSelects(option, "fZones")}
            menuPosition="fixed"
            value={warehouseFZones.find(
              (item) => item.value === formik.values.functional_zone_id
            )}
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
        <Title className={"mb-20"}>{t("tabs.general")}</Title>
        <FormGroup>
          <DynamicSelect<string>
            payload={`${dictionaryCodes.warehouse.self}.${dictionaryCodes.warehouse.retentionRules}`}
            options={dictionaryList}
            action={getDictionaryContentAction}
            placeholder={"Правило хранения"}
            editMode={true}
            onChange={(value) => {
              formik.setFieldValue("retention_rule", value?.value)
            }}
            value={dictionaryList.find(
              (item) => item.value === formik.values.retention_rule
            )}
          />
        </FormGroup>
        <FormGroup>
          <Checkbox
            label={t("columns.is_allow_overflow")}
            value={formik.values.is_allow_overflow}
            onChange={(e) => {
              formik.setFieldValue("is_allow_overflow", e.target.checked)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Checkbox
            label={t("columns.is_merge_trade_item")}
            value={formik.values.is_merge_trade_item}
            onChange={(e) => {
              formik.setFieldValue("is_merge_trade_item", e.target.checked)
            }}
          />
        </FormGroup>
        <FormGroup>
          <FlexJustifyBetween isFlexOne>
            <InputWithLabel
              id="high_rise"
              name="high_rise"
              type="text"
              label={t("columns.high_rise")}
              value={formik.values.high_rise?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              id="compression"
              name="compression"
              type="text"
              label={t("columns.compression")}
              value={formik.values.compression?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
          </FlexJustifyBetween>
        </FormGroup>
        <FormGroup>
          <FlexJustifyBetween isFlexOne>
            <InputWithLabel
              id="actual_pallet"
              name="actual_pallet"
              type="text"
              label={t("columns.actual_pallet")}
              value={formik.values.actual_pallet?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              id="pallet_left"
              name="pallet_left"
              type="text"
              label={t("columns.pallet_left")}
              value={formik.values.pallet_left?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              id="max_pallet"
              name="max_pallet"
              type="text"
              label={t("columns.max_pallet")}
              value={formik.values.max_pallet?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
          </FlexJustifyBetween>
        </FormGroup>
        <Title className={"mb-20"}>{t("tabs.measurements")}</Title>
        <FormGroup>
          <FlexJustifyBetween isFlexOne>
            <InputWithLabel
              id="weight"
              name="weight"
              type="text"
              label={t("columns.weight")}
              value={formik.values.weight?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              id="volume"
              name="volume"
              type="text"
              label={t("columns.volume")}
              value={formik.values.volume?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              id="length"
              name="length"
              type="text"
              label={t("columns.length")}
              value={formik.values.length?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
          </FlexJustifyBetween>
        </FormGroup>
        <FormGroup>
          <FlexJustifyBetween isFlexOne>
            <InputWithLabel
              id="width"
              name="width"
              type="text"
              label={t("columns.width")}
              value={formik.values.width?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
            <InputWithLabel
              id="height"
              name="height"
              type="text"
              label={t("columns.height")}
              value={formik.values.height?.toString() || EmptyString}
              onChange={formik.handleChange}
            />
          </FlexJustifyBetween>
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
          disabled={isFetchingCorrectCell === "pending"}
        >
          <span>{t("buttons.save")}</span>
        </Button>
      </FormGroup>
    </form>
  )
}

export default TreeItemEditorForm
