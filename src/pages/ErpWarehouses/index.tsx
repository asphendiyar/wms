import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import ErpWarehouse from "../../components/ErpWarehouses/ErpWarehouse";

const ErpWarehouses: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.erpWarehouses");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.erpWarehouses")}</PageTitle>
      <PageWrapper>
        <ErpWarehouse />
      </PageWrapper>
    </Fragment>
  );
};

export default ErpWarehouses;
