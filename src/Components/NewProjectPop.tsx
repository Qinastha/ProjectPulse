import axios from "axios";
import {useState, useEffect, useRef} from "react";
import "./NewProjectPop.scss";
import {DragAvatar} from "./DragAvatar";
import {useAppDispatch, useAppSelector, useDebounce} from "../hooks";
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
  setIsNewProject
} from "../store/projectSlice";
import {IMember} from "../core/interfaces/IProject";

const NewProjectPop: React.FC=() => {
  const token=localStorage.getItem("token");
  const dispatch=useAppDispatch();

  const [projectName, setProjectName]=useState("");
  const [projectDescription, setProjectDescription]=useState("");
  const [projectAvatar, setProjectAvatar]=useState("");

  const allMembers=useAppSelector(getAllMembers);
  const currentProject=useAppSelector(getCurrentProject);

  const [memberSearch, setMemberSearch]=useState("");
  const debouncedMembers=useDebounce(memberSearch, 1000);
  const [filteredMembers, setFilteredMembers]=useState<IMember[]>([]);
  const [selectedMembers, setSelectedMembers]=useState<IMember[]>([]);

  const popupRef=useRef<HTMLFormElement>(null);

  const projectOpen=useAppSelector(getProjectOpen);
  const isNewProject=useAppSelector(getIsNewProject);
  const isUpdateProject=useAppSelector(getIsUpdateProject);

  const formReset=() => {
    setProjectName("");
    setProjectDescription("");
    setSelectedMembers([]);
    setMemberSearch("");
  };

  // useEffect(() => {
  //   const handleClickOutside=(event: MouseEvent) => {
  //     event.stopPropagation()
  //     if(
  //       popupRef.current&&
  //       !popupRef.current.contains(event.target as Node)
  //     ) {
  //       handleClose()
  //       formReset();
  //     }
  //   };

  //   if(projectOpen&&(isNewProject||isUpdateProject)) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     formReset();
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [projectOpen, popupRef, dispatch]);


  useEffect(() => {
    if(currentProject?._id&&isUpdateProject) {
      if(!currentProject||projectName) {
        dispatch(fetchProjectById(currentProject._id));
      }
      setProjectName(currentProject.projectName||"");
      setProjectDescription(currentProject.projectDescription||"");
      setProjectAvatar(currentProject.projectAvatar||"");
      setSelectedMembers(currentProject.members||[]);
      console.log(currentProject._id);
    }
  }, [currentProject]);

  useEffect(() => {
    if(debouncedMembers.trim()!=="") {
      const filter=allMembers.filter(
        (member: IMember) =>
          member.firstName.toLowerCase().includes(memberSearch.toLowerCase())||
          member.lastName.toLowerCase().includes(memberSearch.toLowerCase())||
          member.userName.toLowerCase().includes(memberSearch.toLowerCase())||
          member.email.toLowerCase().includes(memberSearch.toLowerCase())
      );
      setFilteredMembers(filter);
    } else {
      setFilteredMembers([]);
    }
  }, [debouncedMembers, allMembers, memberSearch]);

  const handleAddMember=(member: IMember) => {
    setSelectedMembers([...selectedMembers, member]);
    setFilteredMembers([]);
    setMemberSearch("");
  };

  const handleRemoveMember=(userName: string) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.userName!==userName)
    );
  };

  const handleAddLogo=(e: string) => {
    setProjectAvatar(e);
  };

  const handleClose=() => {
    dispatch(setProjectOpen(null));
    dispatch(setIsNewProject(null));
    dispatch(setIsUpdateProject(null));
    formReset();
  };

  const handleProjectSubmit=async (_id?: string) => {
    try {
      if(isNewProject) {
        const response=await axios.post(
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
        if(response.data?.value) {
          alert("Project added");
          handleClose();
          dispatch(fetchAllProjects());
        }
      } else if(isUpdateProject&&_id) {
        const response=await axios.put(
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
        if(response.data?.value) {
          alert("Project updated");
          handleClose();
          dispatch(fetchAllProjects());
        } else {
          alert("Failed to update project");
        }
      }
    } catch(error) {
      console.error("Error during posting new project:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`new-project-pop ${projectOpen? "new-project-pop--open":""}`}>
      <form className="new-project-pop__form" ref={popupRef}>
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
          />
          <input
            required
            className="new-project-pop__input"
            name="projectDescription"
            placeholder="Project Description"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
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
            />
            {filteredMembers.length>0&&(
              <div className="new-project-pop__user-list">
                {filteredMembers.map((member: IMember) => (
                  <div key={member.userName} className="new-project-pop__user-item">
                    <input
                      type="checkbox"
                      checked={selectedMembers.some(
                        (selectedMember: IMember) =>
                          selectedMember.userName===member.userName
                      )}
                      onChange={() => handleAddMember(member)}
                    />
                    <span>
                      {member.firstName} {member.lastName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="new-project-pop__selected-members">
            <div className="new-project-pop__text">Selected Members:</div>
            {selectedMembers.length>0&&(
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
                      X
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
            {isNewProject? "Add Project":"Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectPop;