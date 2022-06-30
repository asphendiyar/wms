import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle } from "../../components/Common/styled";
import Products from "../../components/ProductCatalog/Products/Products";
import { AllProductCatalogWrapper } from "./style";

const ProductCatalog: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.productCatalog");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.productCatalog")}</PageTitle>
      <AllProductCatalogWrapper>
        <Products />
      </AllProductCatalogWrapper>
    </Fragment>
  );
};

export default ProductCatalog;
