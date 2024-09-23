import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getCurrentProject,
  setCurrentProjectNull,
} from "../../../store/projectSlice";
import React, { useEffect } from "react";
import { PopUpProps } from "../../PopUp/PopUp";
import { useProjectForm } from "../../../core";
import "./ManageProject.scss";
import { PulseForm } from "@Qinastha/pulse_library";
import { getAllUsers, getUser } from "../../../store/userSlice";
import { useTranslation } from "react-i18next";

interface ManageProjectProps extends PopUpProps {
  mode: "create" | "update";
}

export const ManageProject: React.FC<ManageProjectProps> = ({
  mode,
  handleClosePopUp,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(getCurrentProject);
  const allUsers = useAppSelector(getAllUsers);
  const currentUser = useAppSelector(getUser);

  useEffect(() => {
    return () => {
      dispatch(setCurrentProjectNull());
    };
  }, [dispatch, mode]);

  const initialFormData = {
    projectAvatar: currentProject?.projectAvatar || null,
    projectName: currentProject?.projectName || "",
    projectDescription: currentProject?.projectDescription || "",
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

  const isFormValid = () => {
    return Object.values(popUpFormData).every(
      value =>
        value !== null && value !== undefined && value.toString().trim() !== "",
    );
  };

  return (
    <div className="project-pop__form">
      <PulseForm
        requiredInputs={requiredInputs}
        inputValues={inputValues}
        formTitle={
          mode === "create"
            ? t("manageProject.newTitle")
            : t("manageProject.editTitle")
        }
        allMembers={allUsers}
        currentUser={currentUser}
        onChange={e => handleUpdateProject(e)}
        handleFile={handleFile}
      />
      <div className="project-pop__actions">
        <button
          type="button"
          className="project-pop__button
                    project-pop__button--cancel"
          onClick={() => handleClosePopUp()}>
          {" "}
          {t("button.cancel")}
        </button>
        <button
          type="button"
          disabled={!isFormValid()}
          onClick={() => {
            handleProjectSubmit(currentProject?._id);
            handleClosePopUp();
          }}
          className="project-pop__button project-pop__button--submit">
          {mode === "create"
            ? t("manageProject.addProject")
            : t("manageProject.editProject")}{" "}
        </button>
      </div>
    </div>
  );
};
