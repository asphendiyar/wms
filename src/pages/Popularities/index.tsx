import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Popularity from "../../components/Popularities/Popularities";

const Popularities: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.popularities");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.popularities")}</PageTitle>
      <PageWrapper>
        <Popularity />
      </PageWrapper>
    </Fragment>
  );
};

export default Popularities;
