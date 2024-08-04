import React from "react";
import { ProjectCard } from "../../../Components";
import { IProject } from "../../../core";
import "./GridProjects.scss";

interface GridLayoutProps {
  projects: IProject[];
  handleDelete: (id: string) => void;
  handleUpdateProjectOpen: (id: string) => void;
  handleShowProject: (id: string) => void;
}

export const GridProjects: React.FC<GridLayoutProps> = ({
  projects,
  handleDelete,
  handleUpdateProjectOpen,
  handleShowProject,
}) => {
  return (
    <div className="gridProjects__container">
      {projects.map(project => (
        <ProjectCard
          key={project._id}
          project={project}
          handleDelete={handleDelete}
          handleUpdateProjectOpen={handleUpdateProjectOpen}
          handleShowProject={handleShowProject}
        />
      ))}
    </div>
  );
};
