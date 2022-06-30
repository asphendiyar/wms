import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  appColors,
  classNameGenerator,
  EmptyString,
} from "../../../app/helpers"
import { StyledInput } from "../styled"

const Wrapper = styled.div`
  position: relative;
`

const StyledLabel = styled.label`
  cursor: auto;
  font-size: 14px;
  font-weight: 400;
  background-color: transparent;
  padding: 0 5px;
  position: absolute;
  left: 5px;
  top: 9px;
  font-size: 14px;
  transition: 0.1s;
  &.focused {
    top: -8px;
    background-color: ${appColors.white};
    color: ${appColors.primary};
    font-size: 11px;
    font-weight: bold;
  }
  &.disabled {
    color: ${appColors.darkGray};
  }
`

type InputWithLabelProps = {
  id: string
  value: string
  label: string
  labelBg?: string
  name: string
  type: "text" | "number" | "email" | "password"
  disabled?: boolean
  readOnly?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(props.value.length > 0)

  const handleBlur = () => {
    !props.value.length && setIsFocused(false)
    props.onBlur && props.onBlur()
  }
  const handleFocus = () => {
    setIsFocused(true)
    props.onFocus && props.onFocus()
  }

  useEffect(() => {
    if (props.value.length) setIsFocused(true)
  }, [props.value.length])

  return (
    <Wrapper>
      <StyledLabel
        htmlFor={props.id}
        className={classNameGenerator([
          isFocused ? "focused" : EmptyString,
          props.disabled ? "disabled" : EmptyString,
        ])}
      >
        {label}
      </StyledLabel>
      <StyledInput
        {...props}
        {...(isFocused && props.onFocus)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={props.disabled ? "disabled" : EmptyString}
      />
    </Wrapper>
  )
}
