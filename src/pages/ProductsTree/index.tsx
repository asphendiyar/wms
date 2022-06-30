import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { PageTitle } from "../../components/Common/styled"
import ProductsTreeContent from "../../components/ProductsTree"

const ProductsTree: React.FC = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t("pageTitle.productsTree")
  })
  return (
    <div className="products-tree__wrapper">
      <PageTitle>{t("pageTitle.productsTree")}</PageTitle>
      <ProductsTreeContent />
    </div>
  )
}

export default ProductsTree
