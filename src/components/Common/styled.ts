// This file contains common styled components

import styled from "styled-components"
import { appColors } from "../../app/helpers"

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const StyledInput = styled.input<{ width?: string }>`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 7px 10px;
  border: 2px solid;
  width: ${({ width }) => width || "100%"};
  outline: none;
  font-size: 14px;
  transition: 0.05s;
  color: ${appColors.black};
  border-color: ${appColors.silver};
  background-color: ${appColors.white};
  &:hover,
  &:focus {
    border-color: ${appColors.darkGray};
    transition: 0.05s;
  }
  &.disabled {
    border-color: ${appColors.lightGray};
    color: ${appColors.darkGray};
  }
`
export const FormGroup = styled.div`
  margin-bottom: 15px;
  &.d-flex {
    gap: 10px;
  }
  &.form-btns {
    position: -webkit-sticky;
    position: sticky;
    background: white;
  }
  &.form-btns {
    bottom: 0;
  }
  &.form-btns > * {
    margin-top: 15px;
    flex: 1;
    justify-content: center;
    font-size: 17px;
  }
  h4 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  span {
    font-weight: 500;
  }
`

export const StyledErrorMessage = styled.span`
  color: ${appColors.error};
  font-size: 13px;
`
export const StyledIcon = styled.span`
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${appColors.primary};
  &.search-input__icon {
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 2px;
    bottom: 0;
    color: ${appColors.gray};
  }
`
export const Title = styled.h3<{ fSize?: number }>`
  font-size: ${({ fSize }) => fSize + "px" || "16px"};
  font-weight: 600;
  margin: 0;
  background-color: ${appColors.white};
  display: flex;
  align-items: center;
  gap: 10px;
  &.mb-20 {
    margin-bottom: 20px;
  }
  &.mb-10 {
    margin-bottom: 10px;
  }
  &.ml-15 {
    margin-left: 15px;
  }
`
export const PageTitle = styled.h2`
  font-size: 28px;
  margin: 0;
  margin-bottom: 20px;
  font-weight: bold;
`
export const STable = styled.table`
  width: 100%;
  text-align: left;

  thead {
    position: sticky;
    top: -5px;
    z-index: 2;
  }
  .tooltip-hover {
    position: absolute;
    top: 50px;
    display: none;
  }
  .tooltip:hover ~ .tooltip-hover {
    display: block;
  }

  .cell-with-icon {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  .cell-with-icon .icon {
    margin-right: 10px;
    font-size: 20px;
  }
  thead tr {
    background-color: ${appColors.wheat} !important;
    box-shadow: none;
    margin-top: 0;
  }
  thead tr td {
    background-color: ${appColors.wheat} !important;
  }
  th,
  td {
    border: none;
    padding: 8px 5px;
  }
  thead tr td {
    display: flex;
    align-items: center;
  }
  tr th:first-child,
  tr td:first-child {
    border-radius: 5px 0 0 5px;
  }
  tr th:last-child,
  tr td:last-child {
    border-radius: 0 5px 5px 0;
  }
  tr {
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
      0px 0.5px 2px rgba(96, 97, 112, 0.16);
    margin-top: 5px;
  }
  tbody tr:hover {
    color: ${appColors.primary};
  }
  tr:nth-child(odd),
  tr:nth-child(odd) td {
    background-color: ${appColors.white};
  }
  tr:nth-child(even),
  tr:nth-child(even) td {
    background-color: ${appColors.ligherGray};
  }
  .selected-row {
    color: ${appColors.primary};
  }
  tr.exceptional-row,
  tr.exceptional-row td {
    background-color: ${appColors.error};
    color: ${appColors.white};
  }
  .sticky-cell.shadow {
    box-shadow: 8px 0 16px -10px rgba(0, 0, 0, 0.2);
  }
`
export const STd = styled.td`
  max-width: 98%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  padding: 8px 5px;
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  &:last-child {
    border-radius: 0 5px 5px 0;
  }
  &.sticky-cell {
    position: sticky;
    left: 0;
    z-index: 1;
  }
  &.cell-with-icon {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  &.cell-with-icon .icon {
    margin-right: 10px;
    font-size: 20px;
  }
  &:hover + .toolTips {
    display: block;
  }
  &.align-center {
    text-align: center;
  }
`
export const TableWrapper = styled.div<{ height?: string }>`
  width: 100%;
  overflow-x: auto;
  position: relative;
  ${({ height }) => `max-height:${height || "auto"}`}
`
export const SearchInputWrapper = styled.div`
  position: relative;
  .search-category {
    font-size: 25px;
    position: absolute;
    top: -4px;
    right: 5px;
    color: ${appColors.gray};
  }
`
export const ActionGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  &.mb-20 {
    margin-bottom: 20px;
  }
`
export const FlexJustifyBetween = styled.div<{ isFlexOne?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  &.mb-30 {
    margin-bottom: 30px;
  }
  &.mb-15 {
    margin-bottom: 15px;
  }
  &.align-items-start {
    align-items: flex-start;
  }
  ${({ isFlexOne }) =>
    isFlexOne &&
    `& > * {
    flex: 1;
  }`}
`
export const CloseBtn = styled.span`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: ${appColors.primary};
  }
`
export const MoreButton = styled.button.attrs(() => ({ type: "button" }))`
  margin-top: 5px;
  border: none;
  background: transparent;
  display: block;
  outline: none;
  color: ${appColors.primary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    color: ${appColors.primaryDark};
  }
  font-size: 12px;
`

export const PageWrapper = styled.div`
  background: ${appColors.white};
  border-radius: 16px;
  padding: 8px;
  height: calc(100vh - 160px);
`

export const PageTableOperations = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  .styled-input {
    border-radius: 8px;
    height: 30px;
    font-size: 14px;
    background: rgba(118, 118, 128, 0.12);
  }
  .filter-operations {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

export const DetailsWrapper = styled.div`
  height: 100%;
  .top-details {
    height: 70%;
    overflow-y: auto;
  }
  .bottom-details {
    height: 30%;
    overflow-y: auto;
  }
`

export const TreeWrapper = styled.div`
  height: calc(100vh - 195px);
  overflow-y: auto;
`

export const TreeViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .tree-view__tree,
  .tree-view__content {
    background-color: ${appColors.white};
    border-radius: 10px;
    padding: 20px;
    height: calc(100vh - 185px);
  }
  .tree-view__tree {
    width: 30%;
  }
  .tree-view__content {
    width: 62%;
  }
`
