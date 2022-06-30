import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PickingPriority from "../../components/PickingPriorities/PickingPriority";
import { PageTitle, PageWrapper } from "../../components/Common/styled";

const PickingPriorities: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.pickingPriorities");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.pickingPriorities")}</PageTitle>
      <PageWrapper>
        <PickingPriority />
      </PageWrapper>
    </Fragment>
  );
};

export default PickingPriorities;
