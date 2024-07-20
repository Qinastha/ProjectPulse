import { POPUP_REQUIRED_INPUTS } from "../constants/popUpInputs.constants";
import { fetchAllProjects } from "../../store/projectSlice";
import { postData, putData } from "../requests/httpRequests";
import { useAppDispatch } from "../../hooks";
import { PopUpFormData } from "../interfaces/popUpFormData";
import React, { useState } from "react";

export const useProjectForm = (
  initialFormData: PopUpFormData,
  mode: "create" | "update",
) => {
  const dispatch = useAppDispatch();

  const [popUpFormData, setPopUpFormData] =
    useState<PopUpFormData>(initialFormData);

  const requiredInputs = POPUP_REQUIRED_INPUTS;
  const inputValues = [
    popUpFormData.projectName,
    popUpFormData.projectDescription,
    popUpFormData.projectAvatar,
    popUpFormData.members,
  ];

  const handleUpdateProject = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e?.target) {
      const { name, value } = e.target;
      setPopUpFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFile = async (file: string) => {
    if (!file) {
      return;
    }
    const response = await postData("core/uploadImage", { avatar: file });
    if (response) {
      setPopUpFormData({
        ...popUpFormData,
        projectAvatar: response.value,
      });
    } else {
      alert("Failed to update avatar");
    }
  };

  const handleClose = () => {
    setPopUpFormData({
      ...popUpFormData,
      projectName: "",
      projectDescription: "",
      projectAvatar: null,
      members: [],
    });
  };

  const handleProjectSubmit = async (_id?: string) => {
    try {
      if (mode === "create") {
        const response = await postData("project/new", popUpFormData);
        if (response?.value) {
          alert("Project added");
          handleClose();
          dispatch(fetchAllProjects());
        }
      } else if (mode === "update" && _id) {
        const response = await putData(`project/update/${_id}`, popUpFormData);
        if (response?.value) {
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
  return {
    popUpFormData,
    requiredInputs,
    inputValues,
    handleUpdateProject,
    handleFile,
    handleProjectSubmit,
    handleClose,
  };
};
