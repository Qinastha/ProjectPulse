import React from "react";
import "./PopUp.scss";
import { ManageProject } from "../Project/ManageProject";
import { useAppSelector } from "../../hooks";
import { getProjectPopMode } from "../../store/popUpSlice";
import { ManageTask } from "../ProjectTask/ManageTask";
import { ManageList } from "../ProjectTask/ManageList";

export interface PopUpProps {
  handleClosePopUp: () => void;
  handleClose?: () => void;
  isPopUpOpen?: boolean;
}

const PopUp: React.FC<PopUpProps> = ({ handleClosePopUp, isPopUpOpen }) => {
  const mode = useAppSelector(getProjectPopMode);

  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  return (
    <div className="popUp__overlay" onClick={() => handleClosePopUp()}>
      <div className="popUp__content" onClick={handleContentClick}>
        {isPopUpOpen && (mode === "create" || mode === "update") && (
          <ManageProject mode={mode} handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && mode === "addList" && (
          <ManageList handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && mode === "addTask" && (
          <ManageTask handleClosePopUp={handleClosePopUp} />
        )}
      </div>
    </div>
  );
};

export default PopUp;
