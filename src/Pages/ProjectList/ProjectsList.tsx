import React, { useEffect, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportWidth = window.innerWidth;

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

  const goToNext = () => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex + 1) % initialProjects.length,
    );
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex: number) =>
        (prevIndex - 1 + initialProjects.length) % initialProjects.length,
    );
  };

  const translateX =
    viewportWidth < 1200 ? -currentIndex * 25 : -currentIndex * 25 + 23;

  return (
    <div className="carousel">
      {currentIndex > 0 && (
        <button
          className="carousel__button carousel__button--prev"
          onClick={goToPrevious}>
          &lt;
        </button>
      )}
      <div
        className="carousel__container"
        style={{ transform: `translateX(${translateX}%)` }}>
        {initialProjects.map((project: IProject, index: number) => (
          <div
            key={index}
            className={`carousel__item ${index === currentIndex ? "carousel__item--active" : "carousel__item--blurred"}`}>
            <ProjectCard
              project={project}
              handleDelete={handleDelete}
              handleUpdateProjectOpen={handleUpdateProjectOpen}
              handleShowProject={handleShowProject}
            />
          </div>
        ))}
      </div>
      {currentIndex < initialProjects.length - 1 && (
        <button
          className="carousel__button carousel__button--next"
          onClick={goToNext}>
          &gt;
        </button>
      )}
    </div>
  );
};
