import React from "react";
import { useTranslation } from "react-i18next";
import { PostPutECPInCellsType } from "../../app/reducers/warehouse-map/types";
import {
  TreeActionItemWrapper,
  TreeActionsWrapper,
} from "../../pages/WarehouseMap/style";
import { ActionGroupWrapper } from "../Common/styled";

type CreateActionsDropdownProps = {
  ref: React.Ref<HTMLDivElement>;
  handleClick: (type: PostPutECPInCellsType) => void;
  displayState: boolean;
};
const CreateActionsDropdown = React.forwardRef<
  HTMLDivElement,
  CreateActionsDropdownProps
>(({ handleClick }, ref) => {
  const { t } = useTranslation();
  return (
    <TreeActionsWrapper ref={ref} className={`create-actions`}>
      <TreeActionItemWrapper onClick={() => handleClick("commodities")}>
        <ActionGroupWrapper>
          <span>{t("pageTitle.commodities")}</span>
        </ActionGroupWrapper>
      </TreeActionItemWrapper>
      <TreeActionItemWrapper onClick={() => handleClick("popularities")}>
        <ActionGroupWrapper>
          <span>{t("pageTitle.popularities")}</span>
        </ActionGroupWrapper>
      </TreeActionItemWrapper>
      <TreeActionItemWrapper onClick={() => handleClick("equipments")}>
        <ActionGroupWrapper>
          <span>{t("pageTitle.equipments")}</span>
        </ActionGroupWrapper>
      </TreeActionItemWrapper>
    </TreeActionsWrapper>
  );
});

export default CreateActionsDropdown;
