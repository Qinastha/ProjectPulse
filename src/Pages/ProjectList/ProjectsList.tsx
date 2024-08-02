import React, { useEffect } from "react";
import {
  fetchAllProjects,
  getProjects,
  projectDelete,
  setCurrentProject,
} from "../../store/projectSlice";
import "./ProjectsList.scss";
import { ProjectCard } from "../../Components";
import { IProject } from "../../core";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import { useNavigate } from "react-router-dom";

export const ProjectsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialProjects = useAppSelector(getProjects);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [fetchAllProjects]);

  const handleDelete = (_id: string) => {
    dispatch(projectDelete(_id));
    console.log(_id);
  };

  const handleUpdateProjectOpen = (_id: string) => {
    dispatch(togglePopUp(true));
    dispatch(setPopUpMode("update"));
    dispatch(setCurrentProject(_id));
    console.log(_id);
  };

  const handleShowProject = (_id: string) => {
    navigate(`${_id}`);
    dispatch(setCurrentProject(_id));
  };

  return (
    <>
      {initialProjects && (
        <div className="projects-container">
          {initialProjects.map((project: IProject) => (
            <ProjectCard
              key={project._id}
              project={project}
              handleDelete={handleDelete}
              handleUpdateProjectOpen={handleUpdateProjectOpen}
              handleShowProject={handleShowProject}
            />
          ))}
        </div>
      )}
    </>
  );
};
