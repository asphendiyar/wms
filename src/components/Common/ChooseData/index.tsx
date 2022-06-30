import { useTranslation } from "react-i18next";
import { CgDetailsMore } from "react-icons/cg";
import styled from "styled-components";
import { appColors, EmptyString } from "../../../app/helpers";

const ChooseDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${appColors.black};
  background-color: ${appColors.white};
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  border-radius: 16px;
  height: 100%;
  &.inner {
    margin-top: 150px;
  }
`;
export const ChooseData: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <ChooseDataWrapper className={className ?? EmptyString}>
      <CgDetailsMore />
      <p>{t("alerts.warningMessage")}</p>
    </ChooseDataWrapper>
  );
};
