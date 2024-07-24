import React from "react";
import "./PopUp.scss";
import { ManageProject } from "../Project/ManageProject";
import { useAppSelector } from "../../hooks";
import { getProjectPopMode } from "../../store/popUpSlice";
import { ManageTask } from "../ProjectTask/ManageTask";
import { ManageList } from "../ProjectTask/ManageList";

export interface PopUpProps {
  handleClosePopUp: () => void;
  isPopUpOpen?: boolean;
  mode?: "create" | "update" | "addList" | "editList" | "addTask" | "editTask";
}

const PopUp: React.FC<PopUpProps> = ({ handleClosePopUp, isPopUpOpen }) => {
  const mode = useAppSelector(getProjectPopMode);

  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  return (
    <div className="popUp__overlay" onClick={() => handleClosePopUp!()}>
      <div className="popUp__content" onClick={handleContentClick}>
        {isPopUpOpen && (mode === "create" || mode === "update") && (
          <ManageProject mode={mode} handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && (mode === "addList" || mode === "editList") && (
          <ManageList mode={mode} handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && (mode === "addTask" || mode === "editTask") && (
          <ManageTask mode={mode} handleClosePopUp={handleClosePopUp} />
        )}
      </div>
    </div>
  );
};

export default PopUp;
