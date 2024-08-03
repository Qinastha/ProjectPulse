import React from "react";
import { IProject, IUser } from "../../../core";
import { useTheme } from "../../../core/contexts/ThemeContext";
import "./ProjectCard.scss";

interface ProjectCardProps {
  project: IProject;
  handleDelete: (_id: string) => void;
  handleUpdateProjectOpen: (_id: string) => void;
  handleShowProject: (_id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  handleDelete,
  handleUpdateProjectOpen,
  handleShowProject,
}) => {
  const { theme } = useTheme()!;
  return (
    <div key={project._id} className={`projects-container__card ${theme}`}>
      <img
        src={project.projectAvatar}
        alt={project.projectName}
        className="projects-container__card-avatar"
      />
      <div className="projects-container__card-details">
        <h2 className="projects-container__card-title">
          {project.projectName}
        </h2>
        <h5 className="projects-container__card-description">
          {project.projectDescription}
        </h5>
        <p className="projects-container__card-date">
          <span className="label">Created At:</span>{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
        <p className="projects-container__card-date">
          <span className="label">Completed At:</span>{" "}
          {new Date(project.completedAt).toLocaleDateString()}
        </p>
        <p className="projects-container__card-status">
          <span className="label">Status:</span>{" "}
          {project.isCompleted ? "Completed" : "In Progress"}
        </p>
        <p className="projects-container__card-creator">
          <span className="label">Creator:</span> {project.creator.firstName}
        </p>
        <p className="projects-container__card-members-title">Members:</p>
        <ul className="projects-container__card-members-list">
          {project.members && project.members.length > 0 ? (
            project.members.map((member: IUser) => (
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
      <div className="projects-container__card-buttons">
        <button
          className="projects-container__edit-button"
          onClick={() => handleUpdateProjectOpen(project._id)}>
          Edit
        </button>
        <button
          className="projects-container__delete-button"
          onClick={() => handleDelete(project._id)}>
          Delete
        </button>
      </div>
      <div className="projects-container__extra-button">
        <button
          className="projects-container__show-button"
          onClick={() => handleShowProject(project._id)}>
          Show Project
        </button>
      </div>
    </div>
  );
};
