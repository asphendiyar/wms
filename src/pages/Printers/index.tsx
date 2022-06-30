import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Printer from "../../components/Printers/Printer";

const Printers: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("pageTitle.printers");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.printers")}</PageTitle>
      <PageWrapper>
        <Printer />
      </PageWrapper>
    </Fragment>
  );
};

export default Printers;
