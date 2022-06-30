import styled from "styled-components";
import { appColors } from "../../app/helpers";

export const NavbarWrapper = styled.nav`
  height: calc(100vh - 71px);
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  padding: 0 10px;
  background-color: ${appColors.white};
  overflow-y: auto;
`;
export const NavbarItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  .search-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
  }
  .search-icon {
    position: absolute;
    top: 9px;
    left: 9px;
  }
`;
export const NavLinksWrapper = styled.div`
  margin: 7px 0;
`;
export const NavLinksGroupTitle = styled.div`
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: ${appColors.navbarText};
  &:hover {
    background-color: ${appColors.ligherGray};
  }
  &.opened {
    background-color: ${appColors.ligherGray};
    color: ${appColors.primary};
  }
  .title-info {
    gap: 5px;
  }
`;
export const NavLinksItems = styled.div`
  display: none;
  border-radius: 8px;
  padding-right: 10px;
  padding-left: 15px;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
  &.opened {
    display: block;
  }
  a {
    display: block;
    font-size: 15px;
    padding: 5px 0 5px 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    color: ${appColors.navbarText};
  }
  a:hover {
    background-color: ${appColors.ligherGray};
  }
  a.active {
    font-weight: 900;
    color: ${appColors.primary};
    background-color: ${appColors.ligherGray};
  }
`;
