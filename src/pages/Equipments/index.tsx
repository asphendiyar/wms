import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Equipment from "../../components/Equipments/Equipment";

const Equipments: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.equipments");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.equipments")}</PageTitle>
      <PageWrapper>
        <Equipment />
      </PageWrapper>
    </Fragment>
  );
};

export default Equipments;
