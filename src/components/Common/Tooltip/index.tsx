import React from "react";
import { StyledTooltip } from "./style";

export const Tooltip: React.FC = () => {
  return (
    <StyledTooltip>
      <span className="rows">
        <p />
        <h6>Товар не готов к использованию</h6>
      </span>
    </StyledTooltip>
  );
};

export default Tooltip;
