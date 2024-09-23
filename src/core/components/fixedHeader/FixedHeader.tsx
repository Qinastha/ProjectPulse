import pinkBlossom from "../../../assets/pinkBlossom.png";
import { NavLink } from "react-router-dom";
import React from "react";
import "./fixedHeader.scss";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IProject } from "../../interfaces/IProject";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@Qinastha/pulse_library";

interface FixedHeaderProps {
  isMenuOpen: boolean;
  id?: string;
  currentProject: IProject | null;
  pathname: string;
  theme: string;
  handleLogout: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  toggleTheme: () => void;
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({
  isMenuOpen,
  id,
  currentProject,
  pathname,
  theme,
  handleLogout,
  setIsMenuOpen,
  toggleTheme,
}) => {
  const { t, i18n } = useTranslation();
  const getPageTitle = (pathname: string): string => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/projects":
        return "Projects";
      case "/tasks":
        return "Tasks";
      case "/settings/profile":
        return "Profile Settings";
      default:
        if (pathname.startsWith("/projects/") && id) {
          return currentProject ? currentProject!.projectName : "Project";
        }
        return "Unknown";
    }
  };

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
  };

  return (
    <div className="heading">
      <h1>{getPageTitle(pathname)}</h1>
      <div className="headingRight">
        <button className="theme-switcher" onClick={toggleTheme}>
          {theme === "light" ? (
            <div className="theme-switcher__dark">
              <DarkMode className="icon" />
              <span>{t("fixedHeader.switchDark")}</span>
            </div>
          ) : (
            <div className="theme-switcher__light">
              <LightMode className="icon" />
              <span>{t("fixedHeader.switchLight")}</span>
            </div>
          )}
        </button>
        <div className="language-switcher">
          <LanguageSwitcher switchLanguage={switchLanguage} />
        </div>
        <div className="dropdown-container">
          <img
            className="settingIcon"
            src={pinkBlossom}
            alt="Settings"
            onMouseOver={(): void => setIsMenuOpen(true)}
          />
          {isMenuOpen && (
            <div className="dropdown-menu">
              <NavLink to="/settings/profile">
                {" "}
                {t("fixedHeader.profile")}
                <SettingsOutlinedIcon style={{ fontSize: 16 }} />
              </NavLink>
            </div>
          )}
        </div>
        <button className="logoutButton" onClick={handleLogout}>
          {t("fixedHeader.logout")}
        </button>
      </div>
    </div>
  );
};
