import pinkBlossom from "../../../assets/pinkBlossom.png";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import "./fixedHeader.scss";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { CurrentProject } from "../../interfaces/IProject";

interface FixedHeaderProps {
  isMenuOpen: boolean;
  id?: string;
  currentProject: CurrentProject | null;
  handleLogout: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({
  isMenuOpen,
  id,
  currentProject,
  handleLogout,
  setIsMenuOpen,
}) => {
  const { pathname } = useLocation();

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

  return (
    <div className="heading">
      <h1>{getPageTitle(pathname)}</h1>
      <div className="headingRightPart">
        <input type="text" placeholder="Search for anything..." />
        <div className="dropdown-container">
          <img
            className="settingIcon"
            src={pinkBlossom}
            alt="Settings"
            onMouseEnter={(): void => setIsMenuOpen(true)}
          />
          {isMenuOpen && (
            <div className="dropdown-menu">
              <NavLink to="/settings/profile">
                {" "}
                Profile Settings
                <SettingsOutlinedIcon style={{ fontSize: 16 }} />
              </NavLink>
            </div>
          )}
        </div>
        <button className="logoutButton" onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};
