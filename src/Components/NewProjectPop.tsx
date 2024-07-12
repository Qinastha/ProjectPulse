import axios from "axios";
import {useState, useEffect, useRef} from "react";
import "./NewProjectPop.scss";
import {DragAvatar} from "./DragAvatar";
import {useAppDispatch, useAppSelector, useDebounce} from "../hooks";
import {fetchAllMembers, fetchAllProjects, getAllMembers, getNewProjectOpen, getUpdateProjectOpen, setNewProjectOpen, setUpdateProjectOpen} from "../store/projectSlice";
import {IMember} from "../core/interfaces/IProject";

const NewProjectPop: React.FC=() => {
  const token=localStorage.getItem("token");
  const dispatch=useAppDispatch();

  const [projectName, setProjectName]=useState("");
  const [projectDescription, setProjectDescription]=useState("");
  const [projectAvatar, setProjectAvatar]=useState("");
  const [memberSearch, setMemberSearch]=useState("");

  const allMembers=useAppSelector(getAllMembers);

  const [members, setMembers]=useState<IMember[]>([]);
  const debouncedMembers=useDebounce(memberSearch, 1000);
  const [filteredMembers, setFilteredMembers]=useState<IMember[]>([]);
  const [selectedMembers, setSelectedMembers]=useState<IMember[]>([]);

  const popupRef=useRef<HTMLFormElement>(null);

  const newProjectOpen=useAppSelector(getNewProjectOpen);
  const updateProjectOpen=useAppSelector(getUpdateProjectOpen);

  const handleClickOutside=(event: MouseEvent) => {
    if(popupRef.current&&!popupRef.current.contains(event.target as Node)) {
      dispatch(setNewProjectOpen(false));
      dispatch(setUpdateProjectOpen(false));
    }
  };

  const formReset=() => {
    setProjectName("");
    setProjectDescription("");
    setSelectedMembers([]);
    setMemberSearch("");
  };

  useEffect(() => {
    if((newProjectOpen===true)||(updateProjectOpen===true)) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      formReset();
    }
  }, [newProjectOpen, updateProjectOpen]);

  useEffect(() => {
    if(!allMembers) {
      dispatch(fetchAllMembers());
    } else
      setMembers(allMembers);
  }, [allMembers, dispatch]);

  useEffect(() => {
    if(debouncedMembers.trim()!=="") {
      const filter=members.filter(
        (member: IMember) =>
          member.firstName.toLowerCase().includes(memberSearch.toLowerCase())||
          member.lastName.toLowerCase().includes(memberSearch.toLowerCase())||
          member.userName.toLowerCase().includes(memberSearch.toLowerCase())||
          member.email.toLowerCase().includes(memberSearch.toLowerCase()),
      );
      setFilteredMembers(filter);
    } else {
      setFilteredMembers([]);
    }
  }, [debouncedMembers, members]);

  const handleAddMember=(member: IMember) => {
    setSelectedMembers([...selectedMembers, member]);
    setFilteredMembers([]);
    setMemberSearch("");
  };

  const handleRemoveMember=(userName: string) => {
    setSelectedMembers(
      selectedMembers.filter(member => member.userName!==userName),
    );
  };

  const handleAddLogo=(e: string) => {
    setProjectAvatar(e);
  };

  const handleClose=() => {
    dispatch(setNewProjectOpen(false));
    dispatch(setUpdateProjectOpen(false));
  };

  const handleProjectSubmit=async () => {
    try {
      if(newProjectOpen===true) {
        const response=await axios.post(
          "http://localhost:4000/api/project/new",
          {
            projectName,
            projectDescription,
            projectAvatar,
            members: selectedMembers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if(response.data?.value) {
          console.log(response.data.value);
          alert("Project added");
          handleClose();
          dispatch(fetchAllProjects());
        }
      } else if(updateProjectOpen) {
        const response=await axios.put(
          `http://localhost:4000/api/project/update/${_id}`,
          {
            projectName,
            projectDescription,
            projectAvatar,
            members: selectedMembers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if(response.data?.value) {
          console.log(response.data.value);
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
    <div className={`new-project-pop ${newProjectOpen||updateProjectOpen? "new-project-pop--open":""}`}>
      <form className="new-project-pop__form"
        ref={popupRef}>
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
            onChange={e => setProjectName(e.target.value)}
          />
          <input
            required
            className="new-project-pop__input"
            name="projectDescription"
            placeholder="Project Description"
            type="text"
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
          />
          <div>
            <DragAvatar handleAddLogo={handleAddLogo} />
          </div>
          <div className="new-project-pop__user-add">
            <input
              className="new-project-pop__input"
              name="projectMember"
              placeholder="Project Member"
              type="text"
              value={memberSearch}
              onChange={e => setMemberSearch(e.target.value)}
            />
            {filteredMembers.length>0&&(
              <div className="new-project-pop__user-list">
                {filteredMembers.map((member: IMember) => (
                  <div
                    key={member.userName}
                    className="new-project-pop__user-item">
                    <input
                      type="checkbox"
                      checked={selectedMembers.some(
                        (selectedMember: IMember) =>
                          selectedMember.userName===member.userName,
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
                  <div
                    key={member.userName}
                    className="new-project-pop__selected-member ">
                    <span>
                      {member.firstName} {member.lastName}
                    </span>
                    <button
                      type="button"
                      className="new-project-pop__delete-button"
                      onClick={() => handleRemoveMember(member.userName)}>
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
            onClick={handleProjectSubmit}
            className="new-project-pop__button new-project-pop__button--submit">
            {newProjectOpen? "Add Project":"Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export {NewProjectPop};
