import { NavLink } from "react-router-dom";
import React from "react";
import "./Navbar.scss";

interface NavbarProps {
  handlePopUpOpen: () => void;
  toggleNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  handlePopUpOpen,
  toggleNav,
}) => {
  return (
    <>
      <div className="navButtons">
        <button className="collapseButton" type="button" onClick={toggleNav}>
          &#8656;
        </button>
        <button
          className="newProjectButton"
          type="button"
          onClick={handlePopUpOpen}>
          Create New Project
        </button>
      </div>

      <NavLink to="/"> Dashboard </NavLink>
      <NavLink to="/projects"> Projects </NavLink>
      <NavLink to="/tasks"> Tasks </NavLink>
    </>
  );
};
