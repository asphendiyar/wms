import React from "react";
import styled from "styled-components";
import { appColors, EmptyString } from "../../../app/helpers";
import { DetailedCheckbox } from "../Checkbox/DetailedCheckBox";
import { Percentage } from "../Percentage";

const Wrapper = styled.div`
  margin-top: 6px;
  border-bottom: 1px solid rgba(22, 22, 22, 0.1);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 6px;
`;

const StyledLabel = styled.label`
  cursor: auto;
  font-size: 14px;
  color: ${appColors.primary};
  width: 50%;
`;

export const StyledValue = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 600;
  width: 50%;
`;

type DetailProps = {
  label: string;
  name?: string | number;
  value?: boolean;
  percentage?: number;
};
export const FieldWithLabel: React.FC<DetailProps> = ({
  label,
  name,
  value,
  percentage,
}) => {
  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>
        {value !== undefined && (
          <DetailedCheckbox checkedd={value || false} desc={EmptyString} />
        )}
        {percentage ? <Percentage width={percentage} /> : <>{name}</>}
      </StyledValue>
    </Wrapper>
  );
};
