import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Layout.scss";
import React, { useState } from "react";
import PopUp from "../PopUp/PopUp";
import { setStateNull, setUserInitial } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getPopUpState,
  setPopUpMode,
  togglePopUp,
} from "../../store/popUpSlice";
import { getCurrentProject } from "../../store/projectSlice";
import { useTheme } from "../../core/contexts/ThemeContext";
import { FixedHeader, Navbar } from "../../core";
import { useViewport } from "@Qinastha/pulse_library";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isNavbarExpand, setIsNavbarExpand] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popUpState = useAppSelector(getPopUpState);
  const { id } = useParams<{ id: string }>();
  const { isPopUpOpen } = popUpState;
  const currentProject = useAppSelector(getCurrentProject);
  const { theme, setTheme } = useTheme()!;
  const { viewportWidth, viewportHeight } = useViewport();

  const toggleNav = (): void => {
    setIsNavbarExpand(!isNavbarExpand);
  };

  const handlePopUpOpen = (): void => {
    dispatch(togglePopUp(true));
    dispatch(setPopUpMode("create"));
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setUserInitial(true));
    dispatch(setStateNull());
  };

  const toggleTheme = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="layoutContainer">
      <header
        className={`navbar  ${isNavbarExpand ? "expanded" : "notExpanded"}`}>
        <Navbar
          pathname={pathname}
          id={id}
          viewportWidth={viewportWidth}
          viewportHeight={viewportHeight}
          handlePopUpOpen={handlePopUpOpen}
          toggleNav={toggleNav}
        />
      </header>

      <main className={theme}>
        <div
          className={`fixedHeaderContent ${theme}`}
          onMouseLeave={(): void => setIsMenuOpen(false)}>
          <FixedHeader
            isMenuOpen={isMenuOpen}
            id={id}
            currentProject={currentProject}
            pathname={pathname}
            handleLogout={handleLogout}
            setIsMenuOpen={e => setIsMenuOpen(e)}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        </div>

        {isPopUpOpen && (
          <div>
            <PopUp
              handleClosePopUp={() => {
                dispatch(togglePopUp(false));
              }}
              isPopUpOpen={isPopUpOpen}
            />
          </div>
        )}

        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
