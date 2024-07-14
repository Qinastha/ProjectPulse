import axios from "axios";
import { useState, useEffect } from "react";
import "./NewProjectPop.scss";
import { DragAvatar } from "./DragAvatar";
import { useAppDispatch, useAppSelector, useDebounce } from "../hooks";
import {
  fetchAllProjects,
  getAllMembers,
  getProjectOpen,
  getIsUpdateProject,
  setProjectOpen,
  setIsUpdateProject,
  getCurrentProject,
  fetchProjectById,
  getIsNewProject,
  setIsNewProject,
  setCurrentProject
} from "../store/projectSlice";
import { IMember } from "../core/interfaces/IProject";

const NewProjectPop: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectAvatar, setProjectAvatar] = useState("");

  const allMembers = useAppSelector(getAllMembers);
  const currentProject = useAppSelector(getCurrentProject);

  const [memberSearch, setMemberSearch] = useState("");
  const debouncedMembers = useDebounce(memberSearch, 500);
  const [filteredMembers, setFilteredMembers] = useState<IMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);

  const projectOpen = useAppSelector(getProjectOpen);
  const isNewProject = useAppSelector(getIsNewProject);
  const isUpdateProject = useAppSelector(getIsUpdateProject);

  const formReset = () => {
    setProjectName("");
    setProjectDescription("");
    setSelectedMembers([]);
    setMemberSearch("");
  };

  useEffect(() => {
    if (currentProject?._id && isUpdateProject) {
      if (isUpdateProject) {
        dispatch(fetchProjectById(currentProject._id));
      }
      setProjectName(currentProject.projectName || "");
      setProjectDescription(currentProject.projectDescription || "");
      setProjectAvatar(currentProject.projectAvatar || "");
      setSelectedMembers(currentProject.members || []);
    } else {
      formReset()
    }
  }, [currentProject?._id, isUpdateProject]);

  useEffect(() => {
    if (debouncedMembers.trim() !== "") {
      const filter = allMembers.filter((member: IMember) => {
        return (
          (member.firstName.toLowerCase().includes(debouncedMembers.toLowerCase()) ||
            member.lastName.toLowerCase().includes(debouncedMembers.toLowerCase()) ||
            member.userName.toLowerCase().includes(debouncedMembers.toLowerCase()) ||
            member.email.toLowerCase().includes(debouncedMembers.toLowerCase())) &&
          !selectedMembers.some((selectedMember) => selectedMember.userName === member.userName)
        );
      });
      setFilteredMembers(filter);
    } else {
      setFilteredMembers([]);
    }
  }, [debouncedMembers, allMembers, selectedMembers]);

  const handleAddMember = (member: IMember) => {
    setSelectedMembers([...selectedMembers, member]);
    setFilteredMembers([]);
    setMemberSearch("");
  };

  const handleRemoveMember = (userName: string) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.userName !== userName)
    );
  };

  const handleAddLogo = (e: string) => {
    setProjectAvatar(e);
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

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); 
  };

  const handleProjectSubmit = async (_id?: string) => {
    try {
      if (isNewProject) {
        const response = await axios.post(
          "http://localhost:4000/api/project/new",
          {
            projectName,
            projectDescription,
            projectAvatar,
            members: selectedMembers
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
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
            projectName,
            projectDescription,
            projectAvatar,
            members: selectedMembers
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
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
    <div className={`new-project-pop__overlay ${projectOpen && (isNewProject || isUpdateProject) ? 'new-project-pop__overlay--open' : ''}`} onClick={handleOverlayClick}>
    <div className={`new-project-pop ${projectOpen && (isNewProject||isUpdateProject)? "new-project-pop--open" : ""}`} onClick={handleContentClick}>
      <form className="new-project-pop__form" autoComplete="off">
        <div className="new-project-pop__title">New Project</div>
        <div className="new-project-pop__content">
          <div className="new-project-pop__text">
            Please provide information about the project
          </div>
          <input
            autoFocus
            required
            className="new-project-pop__input"
            name="projectName"
            placeholder="Project Name"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            autoComplete="off"
          />
          <input
            required
            className="new-project-pop__input"
            name="projectDescription"
            placeholder="Project Description"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            autoComplete="off"
          />
          <div>
            <DragAvatar handleAddLogo={handleAddLogo} projectAvatar={projectAvatar} />
          </div>
          <div className="new-project-pop__user-add">
            <input
              className="new-project-pop__input"
              name="projectMember"
              placeholder="Project Member"
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              autoComplete="off"
            />
            {filteredMembers.length > 0 && (
              <div className="new-project-pop__user-list">
                {filteredMembers.map((member: IMember) => (
                  <div key={member.userName} className="new-project-pop__user-item">
                    <div
                      className="new-project-pop__select-button"
                      onClick={() => handleAddMember(member)}
                    >
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
            {selectedMembers.length > 0 && (
              <div className="new-project-pop__selected-list">
                {selectedMembers.map((member: IMember) => (
                  <div key={member.userName} className="new-project-pop__selected-member">
                    <span>
                      {member.firstName} {member.lastName}
                    </span>
                    <button
                      type="button"
                      className="new-project-pop__delete-button"
                      onClick={() => handleRemoveMember(member.userName)}
                    >
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
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleProjectSubmit(currentProject?._id)}
            className="new-project-pop__button new-project-pop__button--submit"
          >
            {isNewProject ? "Add Project" : "Update Project"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default NewProjectPop;
