import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle } from "../../components/Common/styled";
import BottomDetails from "../../components/Warehouse/BottomDetails/BottomDetails";
import Products from "../../components/Warehouse/Warehouses";
import {
  AllWarehouseWrapper,
  WarehouseBottom,
  WarehouseWrapper,
} from "./style";

const Warehouse: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.warehouses");
  });
  return (
    <AllWarehouseWrapper>
      <PageTitle>{t("pageTitle.warehouses")}</PageTitle>
      <WarehouseWrapper>
        <Products />
      </WarehouseWrapper>
      <WarehouseBottom>
        <BottomDetails />
      </WarehouseBottom>
    </AllWarehouseWrapper>
  );
};

export default Warehouse;
