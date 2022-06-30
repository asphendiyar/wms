import styled from "styled-components";
import { appColors } from "../../../app/helpers";

export const TreeNodeChildrenWrapper = styled.div<{ nodeId: string }>`
  padding-left: 15px;
  border-left: 1px dashed ${appColors.gray};
  display: none;
  ${({ nodeId }) => {
    return `
      &.node-${nodeId}-expanded {
        display: block;
      }
    `;
  }}
`;
export const TreeNodeTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0 0;
  margin: 0;
  font-size: 15px;
  cursor: pointer;
  &:hover,
  &.selected,
  &:hover .tree-title__icon,
  &.selected .tree-title__icon {
    color: ${appColors.primary};
  }
  .tree-title__icon {
    font-size: 23px;
    display: flex;
    align-items: center;
    color: ${appColors.gray};
  }
`;
