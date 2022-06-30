import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import EmailNotifications from "../../components/EmailNotification/EmailNotification";

const EmailNotification: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle.emailNotification");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.emailNotification")}</PageTitle>
      <PageWrapper>
        <EmailNotifications />
      </PageWrapper>
    </Fragment>
  );
};

export default EmailNotification;
