import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.scss";
import React, { useState } from "react";
import pinkBlossom from "../../assets/pinkBlossom.png";
import PopUp from "../PopUp/PopUp";
import { setStateNull, setUserInitial } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getPopUpState,
  setPopUpMode,
  togglePopUp,
} from "../../store/popUpSlice";

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [isNavbarExpand, setIsNavbarExpand] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popUpState = useAppSelector(getPopUpState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isPopUpOpen, popUpMode } = popUpState;

  const toggleNav = (): void => {
    setIsNavbarExpand(!isNavbarExpand);
  };

  const handleOpen = (): void => {
    dispatch(togglePopUp(true));
    dispatch(setPopUpMode("create"));
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setUserInitial(true));
    dispatch(setStateNull());
  };

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
        return "Unknown";
    }
  };

  return (
    <div className="layoutContainer">
      <header className={`navbar ${isNavbarExpand ? "" : "notExpanded"}`}>
        <div className="navButtons">
          <button className="collapseButton" type="button" onClick={toggleNav}>
            &#8656;
          </button>
          <button
            className="newProjectButton"
            type="button"
            onClick={handleOpen}>
            Create New Project
          </button>
        </div>

        {isPopUpOpen && (
          <div>
            <PopUp
              mode={popUpMode}
              handleClosePopUp={() => dispatch(togglePopUp(false))}
            />
          </div>
        )}

        <NavLink to="/"> Dashboard </NavLink>
        <NavLink to="/projects"> Projects </NavLink>
        <NavLink to="/tasks"> Tasks </NavLink>
      </header>

      <main>
        <div className="coreContent">
          <div className="heading">
            <h1>{getPageTitle(pathname)}</h1>
            <div className="headingRightPart">
              <input type="text" placeholder="Search for anything..." />
              <div className="dropdown-container">
                <img
                  className="settingIcon"
                  src={pinkBlossom}
                  alt="Settings"
                  onClick={(): void => setIsMenuOpen(!isMenuOpen)}
                />
                {isMenuOpen && (
                  <div className="dropdown-menu">
                    <NavLink to="/settings/profile"> Profile Settings</NavLink>
                  </div>
                )}
              </div>
              <button className="logoutButton" onClick={handleLogout}>
                LogOut
              </button>
            </div>
          </div>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
