import { POPUP_REQUIRED_INPUTS } from "../constants/popUpInputs.constants";
import { fetchAllProjects } from "../../store/projectSlice";
import { useAppDispatch } from "../../hooks";
import React, { useState } from "react";
import { postData, putData } from "../requests/httpRequests";
import { PopUpFormData } from "../interfaces/popUpFormData";

export const useProjectForm = (
  initialFormData: PopUpFormData,
  mode: "create" | "update",
) => {
  const dispatch = useAppDispatch();

  const [popUpFormData, setPopUpFormData] =
    useState<PopUpFormData>(initialFormData);

  const requiredInputs = POPUP_REQUIRED_INPUTS;
  const inputValues = [
    popUpFormData.projectAvatar,
    popUpFormData.projectName,
    popUpFormData.projectDescription,
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
      const url = mode === "create" ? "project/new" : `project/update/${_id}`;
      const method = mode === "create" ? postData : putData;
      const response = await method(url, popUpFormData);
      if (response?.value) {
        handleClose();
        dispatch(fetchAllProjects());
      }
    } catch (error) {
      console.error("Error during posting new project:", error);
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
