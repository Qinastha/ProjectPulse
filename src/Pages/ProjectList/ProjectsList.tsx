import React, { useState } from "react";
import {
  getProjects,
  projectDelete,
  setCurrentProject,
} from "../../store/projectSlice";
import "./ProjectsList.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import { useNavigate } from "react-router-dom";
import { CarouselProjects } from "./CarouselProjects/CarouselProjects";
import { GridProjects } from "./GridProjects/GridProjects";
import { useViewport } from "@Qinastha/pulse_library";

export const ProjectsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialProjects = useAppSelector(getProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { viewportWidth } = useViewport();

  const handleDelete = (_id: string) => {
    dispatch(projectDelete(_id));
  };

  const handleUpdateProjectOpen = (_id: string) => {
    dispatch(togglePopUp(true));
    dispatch(setPopUpMode("update"));
    dispatch(setCurrentProject(_id));
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

  return viewportWidth < 1024 ? (
    <CarouselProjects
      projects={initialProjects}
      currentIndex={currentIndex}
      goToNext={goToNext}
      goToPrevious={goToPrevious}
      handleDelete={handleDelete}
      handleUpdateProjectOpen={handleUpdateProjectOpen}
      handleShowProject={handleShowProject}
    />
  ) : (
    <GridProjects
      projects={initialProjects}
      handleDelete={handleDelete}
      handleUpdateProjectOpen={handleUpdateProjectOpen}
      handleShowProject={handleShowProject}
    />
  );
};
