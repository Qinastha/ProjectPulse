import {useEffect} from "react";
import {IProject} from "../core/interfaces/IProject";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getProjects, projectDelete, fetchAllProjects, setIsUpdateProject, setCurrentProject, setProjectOpen, getProjectStatus} from "../store/projectSlice";
import "../Components/ProjectCard/ProjectCard.scss";
import {FallbackLoader} from "../Components/FallBackLoader/FallbackLoader";
import ProjectCard from "../Components/ProjectCard/ProjectCard";


export const Projects: React.FC=() => {
  const dispatch=useAppDispatch();
  const initialProjects=useAppSelector(getProjects);
  const isLoading=useAppSelector(getProjectStatus);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [fetchAllProjects]);

  const handleDelete=(_id: string) => {
    dispatch(projectDelete(_id));
    console.log(_id);
  };

  const handleUpdateProjectOpen=(_id: string) => {
    dispatch(setProjectOpen(true));
    dispatch(setIsUpdateProject(true));
    dispatch(setCurrentProject(_id));
    console.log(_id);
  };

  return (
    <>
      {isLoading&&initialProjects.length===0? (
        <FallbackLoader />):(
        <div className="projects-container">
          {
            initialProjects.map((project: IProject) => (
              <ProjectCard key={project._id} project={project}
                handleDelete={handleDelete} handleUpdateProjectOpen={handleUpdateProjectOpen} />
            ))
          }
        </div>
      )}
    </>
  );
};
