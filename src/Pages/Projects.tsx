import {lazy, Suspense, useEffect} from "react";
import {IProject} from "../core/interfaces/IProject";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getProjects, projectDelete, fetchAllProjects, setUpdateProjectOpen, } from "../store/projectSlice";
import "./Projects.scss";
import {FallbackLoader} from "../Components/FallbackLoader";

const ProjectCard=lazy(() => import('../Components/ProjectCard'));

export const Projects: React.FC=() => {
  const dispatch=useAppDispatch();
  const initialProjects=useAppSelector(getProjects);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleDelete=(_id: string) => {
    dispatch(projectDelete(_id));
    console.log(_id)
  };

  const handleUpdateProjectOpen = () => {
    dispatch(setUpdateProjectOpen(true));
  }

  return (
    <Suspense fallback={<FallbackLoader />}>
      <div className="projects-container">
        {initialProjects.map((project: IProject) => (
          <ProjectCard key={project._id} project={project}
            handleDelete={handleDelete} handleUpdateProjectOpen={handleUpdateProjectOpen} />
        ))}
      </div>
    </Suspense>
  );
};
