import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { RouteEnums } from "../../app/commonTypes"
import { PageTitle } from "../../components/Common/styled"
import WarehouseMapContent from "../../components/WarehouseMap"

const WarehouseMapPage: React.FC = () => {
  const { t } = useTranslation()

  const location = useLocation()

  useEffect(() => {
    document.title =
      location.pathname === RouteEnums.warehouseMap
        ? t("pageTitle.warehouseMap")
        : location.pathname === RouteEnums.warehouseProducts
        ? t("pageTitle.warehouseProducts")
        : t("pageTitle.warehouseMap")
  })

  return (
    <div className="warehouse-map__wrapper">
      <PageTitle>
        {location.pathname === RouteEnums.warehouseMap &&
          t("pageTitle.warehouseMap")}
        {location.pathname === RouteEnums.warehouseProducts &&
          t("pageTitle.warehouseProducts")}
      </PageTitle>
      <WarehouseMapContent />
    </div>
  )
}

export default WarehouseMapPage
