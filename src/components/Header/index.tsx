import React, { useRef, useState } from "react";
import { MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { useOnClickOutside, useAppDispatch } from "../../app/hooks";
import {
  appColors,
  customStyles,
  customTheme,
  EmptyString,
} from "../../app/helpers";
import logo from "../../assets/images/logo.svg";
import { Button } from "../Common/Button";
import { fetchSignOutAction } from "../../app/reducers/auth";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { ReactSelectValues } from "../../app/commonTypes";

export const HeaderWrapper = styled.div`
  box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  -webkit-box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  -moz-box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  position: relative;
  padding: 18px 21px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  .settings {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #972323;
    padding: 0.5rem 2rem;
    background: ${appColors.white};
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }

  .logo,
  .user-info {
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  .user {
    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 1rem;
  }
  .user:hover {
    color: ${appColors.primary};
    transition: 0.5s;
  }
  .clicked {
    font-size: 1.2rem;
    color: ${appColors.primary};
  }
  .item {
    border-bottom: 1px solid #dcdcdc;
    padding: 5px 0;
    width: 100%;
  }
  .username {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }
  .username span {
    margin-right: 1rem;
  }
  img {
    height: 30px;
  }
  .logo__line {
    margin: 0 10px;
    color: ${appColors.silver};
  }
  .logo__text {
    font-size: 16px;
    font-weight: 600;
  }
  .wrapper-lang {
    width: 150px;
  }
`;

export const Header: React.FC = () => {
  const languages: ReactSelectValues[] = [
    { value: "ru", label: "Русский" },
    { value: "kk", label: "Қазақша" },
    { value: "en", label: "English" },
  ];
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);

  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState<string>(
    localStorage.getItem("language")?.toString() || EmptyString
  );
  useOnClickOutside(ref, () => setIsComponentVisible(false));

  const handleClick = () => {
    dispatch(fetchSignOutAction());
    localStorage.clear();
  };

  const handleClickOpenDropdown = () => setIsComponentVisible(true);
  const { i18n } = useTranslation();
  const changeLanguage = (lan: string) => {
    i18n.changeLanguage(lan);
    localStorage.setItem("language", lan);
  };
  return (
    <header>
      <HeaderWrapper>
        <div className={"logo"}>
          <Link to="/">
            <img src={logo} alt={"LOGO"} />
          </Link>
          <span className={"logo__line"}>|</span>
          <span className={"logo__text"}>Warehouse Management System</span>
        </div>
        <span
          className={`${isComponentVisible ? "clicked " : EmptyString}user`}
          onClick={handleClickOpenDropdown}
        >
          <BiUser />
        </span>
        {isComponentVisible && (
          <div ref={ref} className="settings">
            <span className="username item">
              <span>
                <BiUser />
              </span>
              {localStorage.getItem("client_id")}
            </span>
            <span className="item">
              <Select<ReactSelectValues>
                className="selectWrapper"
                options={languages}
                placeholder={t("columns.language")}
                theme={customTheme}
                styles={customStyles()}
                menuPosition="fixed"
                onChange={(i) => {
                  typeof i?.value === "string" &&
                    setSelectedFilterOption(i.value);
                  changeLanguage(`${i?.value}`);
                }}
                isSearchable={false}
                value={languages.find((e) => e.value === selectedFilterOption)}
              />
            </span>

            <span className="item">
              <Button
                colors={{ textColor: "red" }}
                className={"primary"}
                onClick={handleClick}
              >
                <MdExitToApp />
                <span>{t("buttons.logOut")}</span>
              </Button>
            </span>
          </div>
        )}
      </HeaderWrapper>
    </header>
  );
};
