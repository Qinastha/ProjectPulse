import axios from "axios";
import React, {useEffect, useState} from "react";
import "./PopUp.scss";
import {useAppDispatch, useAppSelector, useDebounce} from "../../hooks";
import {
  fetchAllProjects,
  fetchProjectById,
  getAllMembers,
  getCurrentProject,
  getIsNewProject,
  getIsUpdateProject,
  getProjectOpen,
  setCurrentProject,
  setIsNewProject,
  setIsUpdateProject,
  setProjectOpen,
} from "../../store/projectSlice";
import {updateProfile} from "../../store/userSlice";
import {IMember, POPUP_REQUIRED_INPUTS, PopUpFormData} from "../../core";
import {PulseForm} from "../PulseForm/PulseForm";

const PopUp: React.FC = () => {
    const token = localStorage.getItem("token");
    const dispatch = useAppDispatch();

    const allMembers = useAppSelector(getAllMembers);
    const currentProject = useAppSelector(getCurrentProject);

    const [memberSearch, setMemberSearch] = useState("");
    const debouncedMembers = useDebounce(memberSearch, 500);
    const [filteredMembers, setFilteredMembers] = useState<IMember[]>([]);

    const projectOpen = useAppSelector(getProjectOpen);
    const isNewProject = useAppSelector(getIsNewProject);
    const isUpdateProject = useAppSelector(getIsUpdateProject);

    const [popUpFormData, setPopUpFormData] = useState<PopUpFormData>({
        projectName: "",
        projectDescription: "",
        projectAvatar: null,
        selectedMembers: [],
    });

    const formReset = () => {
        setPopUpFormData({
            projectName: "",
            projectDescription: "",
            projectAvatar: null,
            selectedMembers: [],
        });
        setMemberSearch("");
    };

    const requiredInputs = POPUP_REQUIRED_INPUTS;
    const inputValues = [
        popUpFormData.projectName,
        popUpFormData.projectDescription,
        popUpFormData.projectAvatar,
    ];

    useEffect(() => {
        if (currentProject?._id && isUpdateProject) {
            dispatch(fetchProjectById(currentProject._id));

            setPopUpFormData({
                projectName: currentProject.projectName || "",
                projectDescription: currentProject.projectDescription || "",
                projectAvatar: currentProject.projectAvatar || "",
                selectedMembers: currentProject.members || [],
            });
        } else {
            formReset();
        }
    }, [currentProject?._id, isUpdateProject, dispatch]);

    useEffect(() => {
        if (debouncedMembers.trim() !== "") {
            const filter = allMembers.filter((member: IMember) => {
                return (
                    (member.firstName
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase()) ||
                        member.lastName
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase()) ||
                        member.userName
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase()) ||
                        member.email
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase())) &&
                    !popUpFormData.selectedMembers.some(
                        selectedMember => selectedMember.userName === member.userName,
                    )
                );
            });
            setFilteredMembers(filter);
        } else {
            setFilteredMembers([]);
        }
    }, [debouncedMembers, allMembers, popUpFormData.selectedMembers]);

    const handleUpdateProject = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const {name, value} = e.target;
        setPopUpFormData((prevState: PopUpFormData) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddMember = (member: IMember) => {
        setPopUpFormData((prevState: PopUpFormData) => ({
            ...prevState,
            selectedMembers: [...prevState.selectedMembers, member],
        }));
        setFilteredMembers([]);
        setMemberSearch("");
    };

    const handleRemoveMember = (userName: string) => {
        setPopUpFormData((prevState: PopUpFormData) => ({
            ...prevState,
            selectedMembers: prevState.selectedMembers.filter(
                member => member.userName !== userName,
            ),
        }));
    };

    const handleFile = async (file: string) => {
        console.log(file);
        if (!file) {
            return;
        }
        const response = await axios.post(
            "http://localhost:4000/api/project/***",
            {avatar: file},
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
        formReset();
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
                <form className="new-project-pop__form">
                    <div className="new-project-pop__title">New Project</div>
                    <div className="new-project-pop__content">
                        <div className="new-project-pop__text">
                            Please provide information about the project
                        </div>
                        <PulseForm
                            requiredInputs={requiredInputs}
                            inputValues={inputValues}
                            formTitle={"Info"}
                            onChange={e => handleUpdateProject(e)}
                            handleFile={handleFile}
                        />
                        <div className="new-project-pop__user-add">
                            <input
                                className="new-project-pop__input"
                                name="projectMember"
                                placeholder="Project Member"
                                type="text"
                                value={memberSearch}
                                onChange={e => setMemberSearch(e.target.value)}
                                autoComplete="off"
                            />
                            {filteredMembers.length > 0 && (
                                <div className="new-project-pop__user-list">
                                    {filteredMembers.map((member: IMember) => (
                                        <div
                                            key={member.userName}
                                            className="new-project-pop__user-item">
                                            <div
                                                className="new-project-pop__select-button"
                                                onClick={() => handleAddMember(member)}>
                        <span>
                          {member.firstName} {member.lastName}
                        </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="new-project-pop__selected-members">
                            <div className="new-project-pop__text">Selected Members:</div>
                            {popUpFormData.selectedMembers.length > 0 && (
                                <div className="new-project-pop__selected-list">
                                    {popUpFormData.selectedMembers.map((member: IMember) => (
                                        <div
                                            key={member.userName}
                                            className="new-project-pop__selected-member">
                      <span>
                        {member.firstName} {member.lastName}
                      </span>
                                            <button
                                                type="button"
                                                className="new-project-pop__delete-button"
                                                onClick={() => handleRemoveMember(member.userName)}>
                                                &#x232B;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="new-project-pop__actions">
                        <button
                            type="button"
                            className="new-project-pop__button"
                            onClick={handleClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => handleProjectSubmit(currentProject?._id)}
                            className="new-project-pop__button new-project-pop__button--submit">
                            {isNewProject ? "Add Project" : "Update Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopUp;


// <input
//     autoFocus
//     required
//     className="new-project-pop__input"
//     name="projectName"
//     placeholder="Project Name"
//     type="text"
//     value={popUpFormData.projectName}
//     onChange={e => handleUpdateProject(e)}
//     autoComplete="off"
// />
// <input
//     required
//     className="new-project-pop__input"
//     name="projectDescription"
//     placeholder="Project Description"
//     type="text"
//     value={popUpFormData.projectDescription}
//     onChange={e => handleUpdateProject(e)}
//     autoComplete="off"
// />
// {
//     <div>
//         <DragAvatar handleAddLogo={handleAddLogo} projectAvatar={projectAvatar}/>
//     </div>
// }