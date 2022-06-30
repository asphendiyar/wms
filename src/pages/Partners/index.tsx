import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Partner from "../../components/Partners/Partner";

const Partners: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.partners");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.partners")}</PageTitle>
      <PageWrapper>
        <Partner />
      </PageWrapper>
    </Fragment>
  );
};

export default Partners;
