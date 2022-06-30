import styled from "styled-components";
import { appColors } from "../../../app/helpers";

type ButtonColorsTypes = {
  bgColor?: string;
  textColor?: string;
};
type ButtonPropTypes = {
  colors?: ButtonColorsTypes; // Button bg and text color
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  fontSize?: number;
  width?: string;
};

const StyledButton = styled.button<{
  colors?: ButtonColorsTypes;
  disabled?: boolean;
  fontSize?: number;
  width?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || 15}px;
  width: ${({ width }) => width || "100%"};
  border: none;
  border-radius: 5px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ colors }) => colors?.bgColor};
  color: ${({ colors }) => colors?.textColor};
  padding: 10px;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
    transition: opacity 0.2s;
    cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  }
  &.primary {
    background-color: ${appColors.primary};
    color: ${appColors.white};
  }
  &.outlined {
    background-color: ${appColors.white};
    border: 1px solid ${appColors.primary};
    color: ${appColors.primary};
  }
  &.more {
    width: 50px;
    margin: 0 auto;
    font-size: 12px;
    padding: 2px 3px;
  }
`;

export const Button: React.FC<ButtonPropTypes> = ({
  children,
  type,
  ...props
}) => {
  return (
    <StyledButton type={type || "button"} {...props}>
      {children}
    </StyledButton>
  );
};
