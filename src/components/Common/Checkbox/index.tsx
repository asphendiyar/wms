import React from "react";
import styled from "styled-components";
import { appColors } from "../../../app/helpers";
const CheckboxContainer = styled.div`
  .container {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 0px;
    padding-left: 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 17px;
    width: 17px;
    background-color: ${appColors.lightGray};
    border-radius: 5px;
    border: 1px solid ${appColors.lightGray};
  }
  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: ${appColors.gray};
  }
  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: ${appColors.green};
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 6px;
    top: 1px;
    width: 3px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .flexStyle {
    display: flex;
    align-items: center;
  }
`;
type CheckBoxProps = {
  value: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};
const Checkbox: React.FC<CheckBoxProps> = ({
  value,
  onChange,
  label,
  disabled,
}) => (
  <CheckboxContainer>
    <label className="container">
      <div className="flexStyle">
        <input
          type="checkbox"
          checked={disabled ? false : value}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="checkmark" />
        {label}
      </div>
    </label>
  </CheckboxContainer>
);
export default Checkbox;
