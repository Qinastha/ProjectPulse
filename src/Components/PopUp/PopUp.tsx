import React, {useEffect, useState} from "react";
import "./PopUp.scss";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    fetchAllProjects,
    fetchProjectById,
    getCurrentProject,
    getIsNewProject,
    getIsUpdateProject,
    setCurrentProject,
    setIsNewProject,
    setIsUpdateProject,
} from "../../store/projectSlice";
import {updateProfile} from "../../store/userSlice";
import {POPUP_REQUIRED_INPUTS, PopUpFormData, postData, putData} from "../../core";
import {PulseForm} from "../PulseForm/PulseForm";

const PopUp: React.FC = () => {
    const dispatch = useAppDispatch();

    const currentProject = useAppSelector(getCurrentProject);

    const isNewProject = useAppSelector(getIsNewProject);
    const isUpdateProject = useAppSelector(getIsUpdateProject);

    const [popUpFormData, setPopUpFormData] = useState<PopUpFormData>({
        projectName: "",
        projectDescription: "",
        projectAvatar: null,
        members: [],
    });

    const requiredInputs = POPUP_REQUIRED_INPUTS;
    const inputValues = [
        popUpFormData?.projectName,
        popUpFormData?.projectDescription,
        popUpFormData?.projectAvatar,
        popUpFormData?.members,
    ];

    useEffect(() => {
        if (currentProject?._id && isUpdateProject) {
            dispatch(fetchProjectById(currentProject._id));
            setPopUpFormData({
                projectName: currentProject?.projectName || "",
                projectDescription: currentProject?.projectDescription || "",
                projectAvatar: currentProject?.projectAvatar || "",
                members: currentProject?.members || [],
            });
        } else {
            setPopUpFormData({
                projectName: "",
                projectDescription: "",
                projectAvatar: null,
                members: [],
            })
        }
    }, [currentProject?._id, isUpdateProject]);

    const handleUpdateProject = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        if (e?.target) {
            const {name, value} = e.target;
            setPopUpFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFile = async (file: string) => {
        if (!file) {
            return;
        }
        const response = await postData("core/uploadImage", {avatar: file})
        if (response) {
            dispatch(updateProfile(response.value));
            setPopUpFormData({
                ...popUpFormData,
                projectAvatar: response.value,
            });
        } else {
            alert("Failed to update avatar");
        }
    };

    const handleClose = () => {
        dispatch(setIsNewProject(null));
        dispatch(setIsUpdateProject(null));
        dispatch(setCurrentProject(null));
        setPopUpFormData({
            ...popUpFormData,
            projectName: "",
            projectDescription: "",
            projectAvatar: null,
            members: [],
        })
    };

    const handleOverlayClick = () => {
        if (isNewProject || isUpdateProject) {
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
                const response = await postData("project/new", popUpFormData)
                if (response?.value) {
                    alert("Project added");
                    handleClose();
                    dispatch(fetchAllProjects());
                }
            } else if (isUpdateProject && _id) {
                const response = await putData(`project/update/${_id}`, popUpFormData)
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

    return (
        <div
            className={`new-project-pop__overlay ${isNewProject || isUpdateProject ? "new-project-pop__overlay--open" : ""}`}
            onClick={handleOverlayClick}>
            <div
                className={`new-project-pop ${isNewProject || isUpdateProject ? "new-project-pop--open" : ""}`}
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
