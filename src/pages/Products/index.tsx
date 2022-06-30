import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { PageTitle } from "../../components/Common/styled"
import ProductsContent from "../../components/Products"

const ProductsPage: React.FC = () => {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t("pageTitle.warehouseProducts")
  })

  return (
    <div className="products__wrapper">
      <PageTitle>{t("pageTitle.warehouseProducts")}</PageTitle>
      <ProductsContent />
    </div>
  )
}

export default ProductsPage
