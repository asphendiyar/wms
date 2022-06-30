import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import TradeItemDocument from "../../components/TradeItemDocuments/TradeItemDocument";

const TradeItemDocuments: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.tradeItemDocuments");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.tradeItemDocuments")}</PageTitle>
      <PageWrapper>
        <TradeItemDocument />
      </PageWrapper>
    </Fragment>
  );
};

export default TradeItemDocuments;
