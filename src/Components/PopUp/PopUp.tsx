import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PopUp.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchAllProjects,
  fetchProjectById,
  getCurrentProject,
  getIsNewProject,
  getIsUpdateProject,
  getProjectOpen,
  setCurrentProject,
  setIsNewProject,
  setIsUpdateProject,
  setProjectOpen,
} from "../../store/projectSlice";
import { updateProfile } from "../../store/userSlice";
import { POPUP_REQUIRED_INPUTS, PopUpFormData } from "../../core";
import { PulseForm } from "../PulseForm/PulseForm";

const PopUp: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const currentProject = useAppSelector(getCurrentProject);

  const projectOpen = useAppSelector(getProjectOpen);
  const isNewProject = useAppSelector(getIsNewProject);
  const isUpdateProject = useAppSelector(getIsUpdateProject);

  const [popUpFormData, setPopUpFormData] = useState<PopUpFormData>({
    projectName: "",
    projectDescription: "",
    projectAvatar: null,
    selectedMembers: [],
  });

  const requiredInputs = POPUP_REQUIRED_INPUTS;
  const inputValues = [
    popUpFormData?.projectName,
    popUpFormData?.projectDescription,
    popUpFormData?.projectAvatar,
    popUpFormData?.selectedMembers,
  ];

  useEffect(() => {
    if (currentProject?._id && isUpdateProject) {
      dispatch(fetchProjectById(currentProject._id));
      setPopUpFormData({
        projectName: currentProject?.projectName || "",
        projectDescription: currentProject?.projectDescription || "",
        projectAvatar: currentProject?.projectAvatar || "",
        selectedMembers: currentProject?.members || [],
      });
    }
  }, [currentProject?._id, isUpdateProject, dispatch]);

  const handleUpdateProject = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPopUpFormData((prevState: PopUpFormData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFile = async (file: string) => {
    console.log(file);
    if (!file) {
      return;
    }
    const response = await axios.post(
      "http://localhost:4000/api/project/***",
      { avatar: file },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.data) {
      dispatch(updateProfile(response.data.value));
      setPopUpFormData({
        ...popUpFormData,
        projectAvatar: response.data.value,
      });
    } else {
      alert("Failed to update avatar");
    }
  };

  const handleClose = () => {
    dispatch(setProjectOpen(null));
    dispatch(setIsNewProject(null));
    dispatch(setIsUpdateProject(null));
    dispatch(setCurrentProject(null));
  };

  const handleOverlayClick = () => {
    if (projectOpen && (isNewProject || isUpdateProject)) {
      handleClose();
    }
  };

  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  const handleProjectSubmit = async (_id?: string) => {
    try {
      if (isNewProject) {
        const response = await axios.post(
          "http://localhost:4000/api/project/new",
          {
            projectName: popUpFormData.projectName,
            projectDescription: popUpFormData.projectDescription,
            projectAvatar: popUpFormData.projectAvatar,
            members: popUpFormData.selectedMembers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data?.value) {
          alert("Project added");
          handleClose();
          dispatch(fetchAllProjects());
        }
      } else if (isUpdateProject && _id) {
        const response = await axios.put(
          `http://localhost:4000/api/project/update/${_id}`,
          {
            projectName: popUpFormData.projectName,
            projectDescription: popUpFormData.projectDescription,
            projectAvatar: popUpFormData.projectAvatar,
            members: popUpFormData.selectedMembers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data?.value) {
          alert("Project updated");
          handleClose();
          dispatch(fetchAllProjects());
        } else {
          alert("Failed to update project");
        }
      }
    } catch (error) {
      console.error("Error during posting new project:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`new-project-pop__overlay ${projectOpen && (isNewProject || isUpdateProject) ? "new-project-pop__overlay--open" : ""}`}
      onClick={handleOverlayClick}>
      <div
        className={`new-project-pop ${projectOpen && (isNewProject || isUpdateProject) ? "new-project-pop--open" : ""}`}
        onClick={handleContentClick}>
        <div className={"new-project-pop__form"}>
          <PulseForm
            requiredInputs={requiredInputs}
            inputValues={inputValues}
            formTitle={
              isNewProject
                ? "Add information for new project"
                : "Update project info"
            }
            formClassName={"new-project-pop__content"}
            inputClassName={"new-project-pop__content-field"}
            onChange={e => handleUpdateProject(e)}
            handleFile={handleFile}
          />
          <div className="new-project-pop__actions">
            <button
              type="button"
              className="new-project-pop__button"
              onClick={handleClose}>
              {" "}
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleProjectSubmit(currentProject?._id)}
              className="new-project-pop__button new-project-pop__button--submit">
              {isNewProject ? "Add Project" : "Update Project"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
