import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Outbound from "../../components/Outbound/Outbound";

const Outbounds: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.outbound");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.outbound")}</PageTitle>
      <PageWrapper>
        <Outbound />
      </PageWrapper>
    </Fragment>
  );
};

export default Outbounds;
