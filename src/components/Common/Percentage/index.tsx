import React from "react";
import styled from "styled-components";
import { appColors } from "../../../app/helpers";

type PercentagePropTypes = {
  width: number;
};

const PercentagerWrapper = styled.div<PercentagePropTypes>`
  width: ${({ width }) => (width <= 100 ? width : 100)}%;
  border-radius: 4px;
  background-color: ${appColors.ligherGray};
  width: 90%;
  border-radius: 4px;
  text-align: center;
  color: ${({ width }) => (width <= 50 ? appColors.black : appColors.white)};
  position: relative;
  padding: 5px;
  z-index: 0;
`;

const PercentageInner = styled.div<PercentagePropTypes>`
  background-color: ${({ width }) =>
    width <= 100 ? appColors.green : appColors.error};
  width: ${({ width }) => (width <= 100 ? width : 100)}%;
  border-radius: 4px;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

type PercentageProps = {
  width: number;
};

export const Percentage: React.FC<PercentageProps> = ({ ...props }) => {
  return (
    <PercentagerWrapper width={props.width}>
      {`${props.width}%`}

      <PercentageInner width={props.width} />
    </PercentagerWrapper>
  );
};
