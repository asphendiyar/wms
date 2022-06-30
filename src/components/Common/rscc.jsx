// React Select Custom Components

// This component used to for floating label
import React from "react"
import { useTranslation } from "react-i18next"
import { components } from "react-select"
import { MoreButton } from "./styled"

const { ValueContainer, Placeholder, MenuList } = components

// eslint-disable-next-line
export function CustomValueContainer({ children, ...props }) {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  )
}

const SelectMenuButton = ({ total_pages, number, onClick, ...props }) => {
  const { t } = useTranslation()
  return (
    <>
      <MenuList {...props}>{props.children}</MenuList>
      {total_pages > number && (
        <MoreButton type="button" onClick={onClick}>
          {t("buttons.showMore")}
        </MoreButton>
      )}
    </>
  )
}

export default SelectMenuButton
