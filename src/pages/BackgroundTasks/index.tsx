import React, { Fragment, useEffect } from "react";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import BackgroundTask from "../../components/BackgroundTasks/BackgroundTask";
import { useTranslation } from "react-i18next";

const BackgroundTasks: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.backgroundTasks");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.backgroundTasks")}</PageTitle>
      <PageWrapper>
        <BackgroundTask />
      </PageWrapper>
    </Fragment>
  );
};

export default BackgroundTasks;
