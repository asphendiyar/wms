import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import PickingOrder from "../../components/PickingOrders/PickingOrder";

const PickingOrders: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.pickingOrders");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.pickingOrders")}</PageTitle>
      <PageWrapper>
        <PickingOrder />
      </PageWrapper>
    </Fragment>
  );
};

export default PickingOrders;
