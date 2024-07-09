import axios from "axios";
import {useState, useEffect, useRef} from "react";
import "./NewProjectPop.scss";
import {IUser} from "../store/userSlice";
import {DragAvatar} from "./DragAvatar";
import {useDebounce} from "../hooks";

interface NewProjectPopProps {
  handleClose: () => void;
  open: boolean;
}

type Members=Partial<IUser>&{
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  position?: string;
  avatar?: string;
};

const memberFilterCheck=[
  {
    firstName: "John",
    lastName: "Doe",
    userName: "john_doe",
    email: "john.doe@example.com",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    userName: "jane_smith",
    email: "jane.smith@example.com",
  },
];


const NewProjectPop: React.FC<NewProjectPopProps>=({handleClose, open}) => {
  const [projectName, setProjectName]=useState("");
  const [projectDescription, setProjectDescription]=useState("");
  const [projectLogo, setProjectLogo]=useState("");
  const [memberSearch, setMemberSearch]=useState("");
  const debouncedMembers = useDebounce(memberSearch, 1000)
  const token=localStorage.getItem("token");
  const [members, setMembers]=useState<Members[]>(memberFilterCheck);
  const [filteredMembers, setFilteredMembers]=useState<Members[]>([]);
  const [selectedMembers, setSelectedMembers]=useState<Members[]>([]);
  const popupRef=useRef<HTMLFormElement>(null);

  const handleClickOutside=(event: MouseEvent) => {
    if(popupRef.current&&!popupRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  if(open) {
    document.addEventListener('mousedown', handleClickOutside);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
  }

  useEffect(() => {
    const fetchAllUsers=async () => {
      try {
        const response=await axios.get("http://localhost:4000/api/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setMembers(response.data.value);
      } catch(error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAllUsers();
  }, []);


  useEffect(() => {
    if(debouncedMembers.trim()!=="") {
      const filter=members.filter(
        (member: Members) =>
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

  const handleAddMember=(member: Members) => {
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
    setProjectLogo(e);
    console.log(projectLogo);
  };

  const handleAddProject=async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response=await axios.post(
        "http://localhost:4000/api/project/new",
        {
          projectName,
          projectDescription,
          projectLogo,
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
      }
    } catch(error) {
      console.error("Error during posting new project:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`new-project-pop ${open? "new-project-pop--open":""}`}>
      <form className="new-project-pop__form" onSubmit={handleAddProject}
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
            <DragAvatar open={open} handleAddLogo={handleAddLogo} />
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
                {filteredMembers.map((member: Members) => (
                  <div
                    key={member.userName}
                    className="new-project-pop__user-item">
                    <input
                      type="checkbox"
                      checked={selectedMembers.some(
                        (selectedMember: Members) =>
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
                {selectedMembers.map((member: Members) => (
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
            type="submit"
            className="new-project-pop__button new-project-pop__button--submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export {NewProjectPop};
