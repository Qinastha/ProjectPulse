import React from "react";
import "./PopUp.scss";
import { ManageProject } from "../Project/ManageProject";

export interface PopUpProps {
  mode: "create" | "update";
  handleClosePopUp: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ mode, handleClosePopUp }) => {
  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  return (
    <div className="popUp__overlay" onClick={handleClosePopUp}>
      <div className="popUp__content" onClick={handleContentClick}>
        <ManageProject mode={mode} handleClosePopUp={handleClosePopUp} />
      </div>
    </div>
  );
};

export default PopUp;
