import styled from "styled-components";
import { appColors } from "../../app/helpers";

export const AllWarehouseWrapper = styled.div`
  font-size: 14px;
  width: 100%;
  height: calc(100vh - 99px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  .icons {
  }
`;

export const WarehouseWrapper = styled.div`
  width: 50%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  .selectWrapper {
    width: 50%;
    margin-right: 8px;
  }
`;

export const WarehouseBottom = styled.div`
  border-radius: 16px;
  background-color: ${appColors.white};
  height: 100%;
  .tabs {
    margin: 1rem 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icons {
    margin-bottom: 1rem;
  }
  .tables {
    margin: 1rem 10px;
  }
`;
