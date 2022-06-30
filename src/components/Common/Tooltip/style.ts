import styled from "styled-components";
import { appColors } from "../../../app/helpers";

export const StyledTooltip = styled.div`
  background-color: ${appColors.darkerGray};
  color: white;
  border-radius: 8px;
  padding: 0 5px;
  margin: 0;

  .rows {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }
  p {
    margin: 10px 5px;
    width: 15px;
    height: 15px;
    border-radius: 5px;
    background-color: red;
  }
  h6 {
    margin: 10px 5px;
    font-size: 14px;
    font-weight: 500;
  }
`;
