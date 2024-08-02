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
  handlePopUpOpen: () => void;
  toggleNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pathname,
  id,
  viewportWidth,
  handlePopUpOpen,
  toggleNav,
}) => {
  return (
    <div className="navTabs">
      <div className="navProfile">
        <div className="miniProfile__container">
          <MiniProfile />
        </div>
        {viewportWidth > 768 && (
          <button className="collapseButton" type="button" onClick={toggleNav}>
            &#8656;
          </button>
        )}
        {pathname !== `/projects/${id}` && (
          <div className="newProjectButton__container">
            <button
              className="newProjectButton"
              type="button"
              onClick={handlePopUpOpen}>
              Create New Project
            </button>
          </div>
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
