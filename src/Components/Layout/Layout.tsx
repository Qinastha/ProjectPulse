import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import "./Layout.scss";
import {useState} from "react";
import pinkBlossom from "../../assets/pinkBlossom.png"
import {useAppDispatch} from "../../hooks";
import {setProjectOpen, setIsNewProject} from "../../store/projectSlice";
import PopUp from "../PopUp/PopUp";


export const Layout: React.FC=() => {
  const {pathname}=useLocation();
  const [isExpand, setIsExpand]=useState(true);
  const [isOpen, setIsOpen]=useState(false);
  const navigate=useNavigate();
  const dispatch=useAppDispatch();


  const toggleNav=(): void => {
    setIsExpand(!isExpand);
  };

  const handleOpen=(): void => {
    dispatch(setProjectOpen(true));
    dispatch(setIsNewProject(true));
  };

  const handleLogout=(): void => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getPageTitle=(pathname: string): string => {
    switch(pathname) {
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
      <header className={`navbar ${isExpand? "":"notExpanded"}`}>
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

        <div>
          <PopUp />
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
                  alt="Settings"
                  onClick={(): void => setIsOpen(!isOpen)}
                />
                {isOpen&&(
                  <div className="dropdown-menu">
                    <NavLink to="/settings/app"> Global Settings</NavLink>
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