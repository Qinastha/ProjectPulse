import { Outlet, useNavigate } from "react-router-dom";
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
import { setCurrentProjectNull } from "../../store/projectSlice";
import { Navbar } from "../../core/components/Navbar/Navbar";
import { FixedHeader } from "../../core/components/fixedHeader/FixedHeader";

export const Layout: React.FC = () => {
  const [isNavbarExpand, setIsNavbarExpand] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popUpState = useAppSelector(getPopUpState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isPopUpOpen } = popUpState;

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
        <Navbar handlePopUpOpen={handlePopUpOpen} toggleNav={toggleNav} />
      </header>

      <main>
        <div
          className="coreContent"
          onMouseLeave={(): void => setIsMenuOpen(false)}>
          <FixedHeader
            isMenuOpen={isMenuOpen}
            handleLogout={handleLogout}
            setIsMenuOpen={e => setIsMenuOpen(e)}
          />
        </div>

        {isPopUpOpen && (
          <div>
            <PopUp
              handleClosePopUp={() => {
                dispatch(togglePopUp(false));
                dispatch(setCurrentProjectNull());
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
