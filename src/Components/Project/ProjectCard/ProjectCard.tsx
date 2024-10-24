import React from "react";
import { IProject, IUser } from "../../../core";
import { useTheme } from "../../../core/contexts/ThemeContext";
import "./ProjectCard.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
          <span className="label">{t("projectCard.created")}</span>{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
        <p className="projects-container__card-status">
          <span className="label">{t("projectCard.status")}</span>{" "}
          {project.isCompleted ? "Completed" : "In Progress"}
        </p>
        <p className="projects-container__card-creator">
          <span className="label">{t("projectCard.creator")}</span> {""}
          {project.creator.firstName}
        </p>
        <p className="projects-container__card-members-title">
          {t("projectCard.members")}
        </p>
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
              {t("projectCard.noMembers")}
            </li>
          )}
        </ul>
      </div>
      <div className="projects-container__card-buttons">
        <button
          className="projects-container__edit-button"
          onClick={() => handleUpdateProjectOpen(project._id)}>
          {t("button.update")}
        </button>
        <button
          className="projects-container__show-button"
          onClick={() => handleShowProject(project._id)}>
          {t("button.show")}
        </button>
        <button
          className="projects-container__delete-button"
          onClick={() => handleDelete(project._id)}>
          {t("button.delete")}
        </button>
      </div>
    </div>
  );
};
