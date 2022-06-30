import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageTitle, PageWrapper } from "../../components/Common/styled";
import Inventory from "../../components/Inventories/Inventories";

const Inventories: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("pageTitle.inventories");
  });
  return (
    <Fragment>
      <PageTitle>{t("pageTitle.inventories")}</PageTitle>
      <PageWrapper>
        <Inventory />
      </PageWrapper>
    </Fragment>
  );
};

export default Inventories;
