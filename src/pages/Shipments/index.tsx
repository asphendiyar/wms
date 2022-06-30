import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Shipment from "../../components/Shipments/Shipment";

const Shipments: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.shipments");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.shipments")}</PageTitle>
      <PageWrapper>
        <Shipment />
      </PageWrapper>
    </Fragment>
  );
};

export default Shipments;
