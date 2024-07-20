import "./ManageProject.scss";
import { useProjectForm } from "../../core/utility/useProject";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProjectById, getCurrentProject } from "../../store/projectSlice";
import React, { useEffect } from "react";
import { PulseForm } from "../PulseForm/PulseForm";
import { PopUpProps } from "../PopUp/PopUp";

export const ManageProject: React.FC<PopUpProps> = ({
  mode,
  handleClosePopUp,
}) => {
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(getCurrentProject);

  useEffect(() => {
    if (currentProject && mode === "update") {
      dispatch(fetchProjectById(currentProject._id));
    }
  }, [dispatch, mode]);

  const initialFormData = {
    projectName: currentProject?.projectName || "",
    projectDescription: currentProject?.projectDescription || "",
    projectAvatar: currentProject?.projectAvatar || null,
    members: currentProject?.members || [],
  };

  const {
    popUpFormData,
    requiredInputs,
    inputValues,
    handleUpdateProject,
    handleFile,
    handleProjectSubmit,
    handleClose,
  } = useProjectForm(initialFormData, mode);

  return (
    <div className={"project-pop__form"}>
      <PulseForm
        requiredInputs={requiredInputs}
        inputValues={inputValues}
        formTitle={
          mode === "create"
            ? "Add information for new project"
            : "Update project info"
        }
        onChange={e => handleUpdateProject(e)}
        handleFile={handleFile}
      />
      <div className="project-pop__actions">
        <button
          type="button"
          className="project-pop__button"
          onClick={() => handleClosePopUp()}>
          {" "}
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            handleProjectSubmit(currentProject?._id);
            handleClosePopUp();
          }}
          className="nproject-pop__button project-pop__button--submit">
          {mode === "create" ? "Add Project" : "Update Project"}{" "}
        </button>
      </div>
    </div>
  );
};
