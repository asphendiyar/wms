import styled from "styled-components"
import { appColors } from "../../app/helpers"

export const TreeActionsWrapper = styled.div`
  position: absolute;
  border-radius: 10px;
  padding: 10px 0;
  box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  background-color: ${appColors.white};
  z-index: 1;
  &.tree-actions {
    right: 0;
    top: 40px;
  }
  &.create-actions {
    right: -200px;
    bottom: -65px;
  }
`
export const TreeActionItemWrapper = styled.div`
  padding: 7px 20px;
  border-bottom: 1px solid ${appColors.lightGray};
  cursor: pointer;
  font-size: 24px;
  &:last-child {
    border-bottom: none;
  }
  &:hover > * {
    color: ${appColors.primary};
  }
  span {
    font-size: 14px;
  }
`
export const CellsGeneratorFormWrapper = styled.form``
