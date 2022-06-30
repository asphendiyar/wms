import { useFormik } from "formik"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { TreeNode } from "../../app/commonTypes"
import { appColors, EmptyString } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  adjustProductsAction,
  adjustTEAction,
} from "../../app/reducers/products/actions"
import { selectActiveRootWarehouse } from "../../app/reducers/products/selectors"
import { ProductsEnums } from "../../app/reducers/products/types"
import { namedRequestsInProgress } from "../../app/reducers/requests"
import { Button } from "../Common/Button"
import { InputWithLabel } from "../Common/Input"
import { FormGroup, Title } from "../Common/styled"

const ProductTEForm: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const rootTreeNode: TreeNode = useAppSelector(selectActiveRootWarehouse)
  const adjustingProductsStatus = useAppSelector((state) =>
    namedRequestsInProgress(state, ProductsEnums.adjustProducts)
  )
  const selectedNode = useAppSelector((state) => state.products.selectedNode)
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  )
  const selectedTE = useAppSelector((state) => state.products.selectedTE)

  const editMode = Boolean(selectedProduct) || Boolean(selectedTE)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      warehouse_id: rootTreeNode?.id,
      erp_warehouse: "NORMAL",
      cell: EmptyString,
      sku: EmptyString,
      barcode: EmptyString,
      quantity: EmptyString,
    },
    onSubmit: (values) => {
      const { barcode, ...formValues } = values
      barcode.length > 0
        ? dispatch(
            adjustTEAction({
              ...formValues,
              warehouse_id: Number(rootTreeNode?.id),
              quantity: Number(formValues.quantity),
              barcode,
            })
          )
        : dispatch(
            adjustProductsAction({
              ...formValues,
              warehouse_id: Number(rootTreeNode?.id),
              quantity: Number(formValues.quantity),
            })
          )
    },
  })

  useEffect(() => {
    if (adjustingProductsStatus === "success") onClose()
    if (selectedNode) formik.setFieldValue("cell", selectedNode.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustingProductsStatus, selectedNode])

  useEffect(() => {
    if (editMode) {
      formik.setFieldValue("sku", selectedProduct?.sku ?? EmptyString)
      formik.setFieldValue(
        "quantity",
        selectedProduct?.available_quantity ?? EmptyString
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode])

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
          <InputWithLabel
            id="cell"
            name="cell"
            type="text"
            label={t("columns.cell")}
            value={selectedNode?.id || EmptyString}
            onChange={() => undefined}
            readOnly={true}
          />
        </FormGroup>

        <FormGroup>
          <InputWithLabel
            id="barcode"
            name="barcode"
            type="text"
            label={t("columns.trade_item_barcode")}
            value={formik.values.barcode}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <InputWithLabel
            id="sku"
            name="sku"
            type="text"
            label={t("columns.sku")}
            value={formik.values.sku}
            onChange={formik.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Title>Описание товара:</Title>
        </FormGroup>
        <FormGroup>
          <InputWithLabel
            id="quantity"
            name="quantity"
            type="text"
            label={t("columns.quantity")}
            value={formik.values.quantity.toString()}
            onChange={formik.handleChange}
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
          disabled={adjustingProductsStatus === "pending"}
        >
          <span>{editMode ? t("buttons.save") : t("buttons.add")}</span>
        </Button>
      </FormGroup>
    </form>
  )
}

export default ProductTEForm
