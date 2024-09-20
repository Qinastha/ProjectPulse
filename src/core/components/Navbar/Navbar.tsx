import { NavLink } from "react-router-dom";
import React from "react";
import "./Navbar.scss";
import { MiniProfile } from "../MiniProfile/MiniProfile";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

interface NavbarProps {
  pathname: string;
  id?: string;
  viewportWidth: number;
  viewportHeight: number;
  handlePopUpOpen: () => void;
  toggleNav: (e: React.MouseEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pathname,
  id,
  viewportWidth,
  viewportHeight,
  handlePopUpOpen,
  toggleNav,
}) => {
  return (
    <div className="navTabs">
      <div className="navProfile">
        <MiniProfile
          viewportHeight={viewportHeight}
          viewportWidth={viewportWidth}
          toggleNav={toggleNav}
        />
        {pathname !== `/projects/${id}` && (
          <button
            className="newProjectButton"
            type="button"
            onClick={handlePopUpOpen}>
            New Project
          </button>
        )}
      </div>
      <div className="navLinks nav-item">
        <NavLink to="/">
          {" "}
          <DashboardOutlinedIcon style={{ fontSize: 20 }} /> Dashboard
        </NavLink>
        <NavLink to="/projects">
          <ArticleOutlinedIcon style={{ fontSize: 20 }} /> Projects
        </NavLink>
      </div>
    </div>
  );
};
