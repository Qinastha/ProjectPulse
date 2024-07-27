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
import { Navbar } from "../../core/components/Navbar/Navbar";
import { FixedHeader } from "../../core/components/fixedHeader/FixedHeader";
import { getCurrentProject } from "../../store/projectSlice";

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

  return (
    <div className="layoutContainer">
      <header
        className={`navbar ${isNavbarExpand ? "expanded" : "notExpanded"}`}>
        <Navbar
          pathname={pathname}
          id={id}
          handlePopUpOpen={handlePopUpOpen}
          toggleNav={toggleNav}
        />
      </header>

      <main>
        <div
          className="coreContent"
          onMouseLeave={(): void => setIsMenuOpen(false)}>
          <FixedHeader
            isMenuOpen={isMenuOpen}
            id={id}
            currentProject={currentProject}
            pathname={pathname}
            handleLogout={handleLogout}
            setIsMenuOpen={e => setIsMenuOpen(e)}
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
