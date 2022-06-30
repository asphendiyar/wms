import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CellType from "../../components/CellTypes/CellType";
import { PageTitle, PageWrapper } from "../../components/Common/styled";

const CellTypes: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.cellTypes");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.cellTypes")}</PageTitle>
      <PageWrapper>
        <CellType />
      </PageWrapper>
    </Fragment>
  );
};

export default CellTypes;
