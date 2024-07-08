import axios from "axios";
import { useEffect, useState } from "react";
import { IProject, IMember } from "../core/interfaces/IProject";
import "./Projects.scss";

export const Projects: React.FC = () => {
  const [allProjects, setAllProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/project/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response?.data) {
          console.log(response.data.value);
          setAllProjects(response.data.value);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchAllProjects();
  }, []);

  return (
    <div className="projects-container">
      {allProjects.map((project: IProject) => (
        <div key={project.projectName} className="projects-container__card">
          <img
            src={project.projectAvatar}
            alt={project.projectName}
            className="projects-container__card-avatar"
          />
          <div className="projects-container__card-details">
            <h2 className="projects-container__card-title">
              {project.projectName}
            </h2>
            <p className="projects-container__card-description">
              {project.projectDescription}
            </p>
            <p className="projects-container__card-tasks">
              Tasks: {project.tasks}
            </p>
            <p className="projects-container__card-date">
              Created At: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="projects-container__card-date">
              Updated At: {new Date(project.updatedAt).toLocaleDateString()}
            </p>
            <p className="projects-container__card-date">
              Started At: {new Date(project.startedAt).toLocaleDateString()}
            </p>
            <p className="projects-container__card-date">
              Completed At: {new Date(project.completedAt).toLocaleDateString()}
            </p>
            <p className="projects-container__card-status">
              Status: {project.isCompleted ? "Completed" : "In Progress"}
            </p>
            <p className="projects-container__card-creator">
              Creator: {project.creator}
            </p>
            <p className="projects-container__card-members-title">Members:</p>
            <ul className="projects-container__card-members-list">
              {project.members && project.members.length > 0 ? (
                project.members.map((member: IMember) => (
                  <li
                    key={member.userName}
                    className="projects-container__card-members-item">
                    {member.firstName} {member.lastName}
                  </li>
                ))
              ) : (
                <li className="projects-container__card-members-item">
                  No members
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
