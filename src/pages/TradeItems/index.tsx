import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import TradeItem from "../../components/TradeItems/TradeItem";

const TradeItems: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.tradeItems");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.tradeItems")}</PageTitle>
      <PageWrapper>
        <TradeItem />
      </PageWrapper>
    </Fragment>
  );
};

export default TradeItems;
