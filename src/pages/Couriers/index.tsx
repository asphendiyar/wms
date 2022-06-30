import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Courier from "../../components/Couriers/Courier";

const Couriers: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.couriers");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.couriers")}</PageTitle>
      <PageWrapper>
        <Courier />
      </PageWrapper>
    </Fragment>
  );
};

export default Couriers;
