import React, { useRef, useState } from "react";
import { ProjectCard } from "../../../Components";
import { IProject } from "../../../core";
import "./CarouselProjects.scss";
import useViewport from "../../../core/utility/useViewportWidth";

interface CarouselProps {
  projects: IProject[];
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  handleDelete: (id: string) => void;
  handleUpdateProjectOpen: (id: string) => void;
  handleShowProject: (id: string) => void;
}

export const CarouselProjects: React.FC<CarouselProps> = ({
  projects,
  currentIndex,
  goToNext,
  goToPrevious,
  handleDelete,
  handleUpdateProjectOpen,
  handleShowProject,
}) => {
  const { viewportHeight } = useViewport();
  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX !== null && endX !== null) {
      const deltaX = startX - endX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
      setStartX(null);
      setEndX(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setEndX(e.touches[0].clientX);
  };

  const translateX =
    viewportHeight > 450 ? -currentIndex * 20 + 3 : -currentIndex * 23 + 10;

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        style={{ transform: `translateX(${translateX}%)` }}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={`carousel__item ${index === currentIndex ? "carousel__item--active" : "carousel__item--blurred"}`}
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <ProjectCard
              project={project}
              handleDelete={handleDelete}
              handleUpdateProjectOpen={handleUpdateProjectOpen}
              handleShowProject={handleShowProject}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
