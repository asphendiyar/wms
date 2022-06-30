import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import PeriodicReservation from "../../components/PeriodicReservations/PeriodicReservation";

const PeriodicReservations: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.periodicReservations");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.periodicReservations")}и</PageTitle>
      <PageWrapper>
        <PeriodicReservation />
      </PageWrapper>
    </Fragment>
  );
};

export default PeriodicReservations;
