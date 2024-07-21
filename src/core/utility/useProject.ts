import {POPUP_REQUIRED_INPUTS} from "../constants/popUpInputs.constants";
import {fetchAllProjects} from "../../store/projectSlice";
import {useAppDispatch} from "../../hooks";
import {PopUpFormData} from "../interfaces/popUpFormData";
import React, {useState} from "react";
import {postData, putData} from "../requests/httpRequests";

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
            const {name, value} = e.target;
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
        const response = await postData("core/uploadImage", {avatar: file});
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
            const url = mode === "create" ? "project/new" : `project/update/${_id}`
            const method = mode === "create" ? postData : putData
            const response = await method(url, popUpFormData)
            if (response?.value) {
                console.log(response)
                handleClose()
                dispatch(fetchAllProjects())
            }
        } catch (error) {
            console.error("Error during posting new project:", error)
        }
    }

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
