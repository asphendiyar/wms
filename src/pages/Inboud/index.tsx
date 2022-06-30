import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Inbounds from "../../components/Inbound/Inbounds";

const Inbound: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.inbound");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.inbound")}</PageTitle>
      <PageWrapper>
        <Inbounds />
      </PageWrapper>
    </Fragment>
  );
};

export default Inbound;
