import { lazy, Suspense } from "react";
import {IProject, IMember} from "../core/interfaces/IProject";
import {useAppSelector} from "../hooks";
import {getProjects} from "../store/projectSlice";
import "./Projects.scss";
import {FallbackLoader} from "../Components/FallbackLoader";

const ProjectCard = lazy(() => import('../Components/ProjectCard'));

export const Projects: React.FC=() => {
  const fetchedProjects = useAppSelector(getProjects);

  return (
    <Suspense fallback={<FallbackLoader />}>
    <div className="projects-container">
      {fetchedProjects.map((project: IProject) => (
        <ProjectCard key={project.projectName} project={project} />
      ))}
    </div>
    </Suspense>
  );
};
