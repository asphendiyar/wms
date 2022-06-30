import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Commodity from "../../components/Commodities/Commodity";
import { PageTitle, PageWrapper } from "../../components/Common/styled";

const Commodities: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.commodities");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.commodities")}</PageTitle>
      <PageWrapper>
        <Commodity />
      </PageWrapper>
    </Fragment>
  );
};

export default Commodities;
