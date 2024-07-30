import { NavLink } from "react-router-dom";
import React from "react";
import "./Navbar.scss";
import { MiniProfile } from "../MiniProfile/MiniProfile";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

interface NavbarProps {
  pathname: string;
  id?: string;
  handlePopUpOpen: () => void;
  toggleNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  pathname,
  id,
  handlePopUpOpen,
  toggleNav,
}) => {
  return (
    <div className="navTabs">
      <div className="navProfile">
        <MiniProfile />
        <button className="collapseButton" type="button" onClick={toggleNav}>
          &#8656;
        </button>
      </div>
      {pathname !== `/projects/${id}` && (
        <div className="navButtons">
          <button
            className="newProjectButton"
            type="button"
            onClick={handlePopUpOpen}>
            Create New Project
          </button>
        </div>
      )}
      <div className="navLinks nav-item">
        <NavLink to="/">
          {" "}
          <DashboardOutlinedIcon style={{ fontSize: 20 }} /> Dashboard{" "}
        </NavLink>
        <NavLink to="/projects">
          <ArticleOutlinedIcon style={{ fontSize: 20 }} /> Projects{" "}
        </NavLink>
        <NavLink to="/tasks">
          <ChecklistOutlinedIcon style={{ fontSize: 20 }} /> Tasks{" "}
        </NavLink>
      </div>
    </div>
  );
};
