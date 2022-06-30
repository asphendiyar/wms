import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import MeasureUnit from "../../components/MeasureUnits/MeasureUnit";

const MeasureUnits: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.measureUnits");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.measureUnits")}</PageTitle>
      <PageWrapper>
        <MeasureUnit />
      </PageWrapper>
    </Fragment>
  );
};

export default MeasureUnits;
