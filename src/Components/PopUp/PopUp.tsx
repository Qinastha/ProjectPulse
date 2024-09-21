import React from "react";
import "./PopUp.scss";
import { ManageProject } from "../Project/ManageProject/ManageProject";
import { useAppSelector } from "../../hooks";
import { getProjectPopMode } from "../../store/popUpSlice";
import { ManageTask } from "../ProjectTask/ManageTask/ManageTask";
import { ManageList } from "../ProjectTask/ManageList/ManageList";
import { ProjectTaskPreview } from "../ProjectTask/ProjectTaskPreview/ProjectTaskPreview";
import { WidgetPreview } from "../Widget/WidgetPreview/WidgetPreview";
import { useTheme } from "../../core/contexts/ThemeContext";

export interface PopUpProps {
  handleClosePopUp: () => void;
  isPopUpOpen?: boolean;
  mode?:
    | "create"
    | "update"
    | "addList"
    | "editList"
    | "addTask"
    | "editTask"
    | "previewTask"
    | "showWidget";
}

// PopUp component to display pop-up content based on the current mode
const PopUp: React.FC<PopUpProps> = ({ handleClosePopUp, isPopUpOpen }) => {
  const mode = useAppSelector(getProjectPopMode);
  const { theme } = useTheme()!;

  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  return (
    <div className="popUp__overlay" onClick={() => handleClosePopUp!()}>
      <div className={`popUp__content ${theme}`} onClick={handleContentClick}>
        {isPopUpOpen && (mode === "create" || mode === "update") && (
          <ManageProject mode={mode} handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && (mode === "addList" || mode === "editList") && (
          <ManageList mode={mode} handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && (mode === "addTask" || mode === "editTask") && (
          <ManageTask mode={mode} handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && mode === "previewTask" && (
          <ProjectTaskPreview handleClosePopUp={handleClosePopUp} />
        )}

        {isPopUpOpen && mode === "showWidget" && (
          <WidgetPreview mode={mode} handleClosePopUp={handleClosePopUp} />
        )}
      </div>
    </div>
  );
};

export default PopUp;
