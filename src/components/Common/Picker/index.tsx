import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";
import {
  appColors,
  classNameGenerator,
  EmptyString,
} from "../../../app/helpers";

type PickerPropTypes = {
  disabled?: boolean;
  hasValue?: boolean;
};

export const StyledPickerLabel = styled.label`
  cursor: auto;
  font-size: 14px;
  font-weight: 400;
  background-color: transparent;
  padding: 0 5px;
  left: 5px;
  transition: 0.1s;
  &.hasValue {
    position: absolute;
    top: -8px;
    background-color: ${appColors.white};
    font-weight: 500;
    color: ${appColors.primary};
    font-size: 12px;
  }
  &.disabled {
    color: ${appColors.darkGray};
  }
`;

const PickerWrapper = styled.div<PickerPropTypes>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ disabled }) =>
    disabled ? appColors.darkGray : appColors.white};
  color: ${({ disabled }) => (disabled ? appColors.darkGray : appColors.black)};
  border: 2px solid ${appColors.lightGray};
  border-radius: 4px;
  font-weight: 400;
  background-color: transparent;
  height: 32px;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  padding-left: ${({ hasValue }) => (hasValue ? 10 : 2)}px;
  & .icon {
    color: ${appColors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 5px;
    height: 100%;
    &:hover {
      background-color: ${appColors.ligherGray};
    }
  }
  position: relative;
`;

type PickerProps = {
  label: string;
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  hasValue: boolean;
};

export const Picker: React.FC<PickerProps> = ({ label, ...props }) => {
  return (
    <PickerWrapper disabled={props.disabled} hasValue={props.hasValue}>
      <StyledPickerLabel
        className={classNameGenerator([
          props.hasValue ? "hasValue" : EmptyString,
          props.disabled ? "disabled" : EmptyString,
        ])}
      >
        {label}
      </StyledPickerLabel>
      <p>{props.hasValue ? props.value : EmptyString}</p>
      <div
        className="icon"
        onClick={!props.disabled ? props.onClick : () => null}
      >
        <BsThreeDotsVertical />
      </div>
    </PickerWrapper>
  );
};
