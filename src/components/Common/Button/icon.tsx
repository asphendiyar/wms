import { PropsWithChildren } from "react";
import styled from "styled-components";
import { appColors } from "../../../app/helpers";

type IconButtonProps = {
  onClick: () => void;
  popupText?: string;
  disabled?: boolean;
  className?: string;
};

const StyledIconButton = styled.button<{ disabled: boolean }>`
  background-color: ${appColors.white};
  position: relative;
  border: none;
  padding: 6px 8px;
  border-radius: 5px;
  font-size: 18px;
  color: ${appColors.skyBlue};
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover,
  &.active {
    box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  }
  .icon-button__popup {
    position: absolute;
    padding: 3px 5px;
    border-radius: 3px;
    background-color: ${appColors.overlay};
    color: ${appColors.white};
    font-size: 13px;
    bottom: -30px;
    display: none;
    z-index: 9 !important;
  }
  &:hover .icon-button__popup {
    display: inline;
  }
  &.remove {
    color: ${appColors.error};
  }
  color: ${({ disabled }) => (disabled ? "#89adbf54" : "none")} !important;
`;

function IconButton({
  onClick,
  popupText,
  children,
  disabled,
  className,
}: PropsWithChildren<IconButtonProps>): JSX.Element {
  return (
    <StyledIconButton
      type="button"
      disabled={disabled || false}
      onClick={!disabled ? onClick : () => null}
      className={className}
    >
      {children}
      {popupText && <span className="icon-button__popup">{popupText}</span>}
    </StyledIconButton>
  );
}

export default IconButton;
