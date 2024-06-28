import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import { NewProjectPop } from "./NewProjectPop";
import pinkBlossom from "../assets/pinkBlossom.png";

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [isExpand, setIsExpand] = useState(true);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = (): void => {
    setIsExpand(!isExpand);
  };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    navigate("/login");
  };

  const getPageTitle = (pathname: string): string => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/projects":
        return "Projects";
      case "/tasks":
        return "Tasks";
      case "/logs":
        return "Time Log";
      case "/resources":
        return "Resource Mgnt";
      case "/users":
        return "User";
      case "/templates":
        return "Project Template";
      case "/settings/app":
        return "Global Settings";
      case "/settings/profile":
        return "Profile Settings";
      default:
        return "Unknown";
    }
  };
  return (
    <div className="container">
      <header className={`navbar ${isExpand ? "" : "notExpanded"}`}>
        <div className="navButtons">
          <button className="collapseButton" type="button" onClick={toggleNav}>
            &#8656;
          </button>
          <button type="button" onClick={handleClickOpen}>
            {" "}
            Create New Project
          </button>
        </div>

        <div>
          <NewProjectPop handleClose={handleClose} open={open} />
        </div>

        <NavLink to="/"> Dashboard </NavLink>
        <NavLink to="/projects"> Projects </NavLink>
        <NavLink to="/tasks"> Tasks </NavLink>
        <NavLink to="/logs"> Time Log </NavLink>
        <NavLink to="/resources"> Resource Mgnt </NavLink>
        <NavLink to="/users"> User </NavLink>
        <NavLink to="/templates"> Project Template </NavLink>
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
                  alt="Setiings"
                  onClick={(): void => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div className="dropdown-menu">
                    <NavLink to="/settings/app"> Global Settings</NavLink>
                    <NavLink to="/settings/profile"> Profile Settings</NavLink>
                  </div>
                )}
              </div>
              <button onClick={handleLogout}>LogOut</button>
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
