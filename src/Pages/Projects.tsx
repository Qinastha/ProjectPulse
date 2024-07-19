import React, {useEffect} from "react";
import {
    fetchAllProjects,
    getProjects,
    getProjectStatus,
    projectDelete,
    setCurrentProject,
    setIsUpdateProject,
} from "../store/projectSlice";
import "./Projects.scss";
import {FallbackLoader, ProjectCard} from "../Components";
import {IProject} from "../core";
import {useAppDispatch, useAppSelector} from "../hooks";

export const Projects: React.FC = () => {
    const dispatch = useAppDispatch();
    const initialProjects = useAppSelector(getProjects);
    const isLoading = useAppSelector(getProjectStatus);

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [fetchAllProjects]);

    const handleDelete = (_id: string) => {
        dispatch(projectDelete(_id));
        console.log(_id);
    };

    const handleUpdateProjectOpen = (_id: string) => {
        dispatch(setIsUpdateProject(true));
        dispatch(setCurrentProject(_id));
        console.log(_id);
    };

    return (
        <>
            {isLoading && initialProjects.length === 0 ? (
                <FallbackLoader/>
            ) : (
                <div className="projects-container">
                    {initialProjects.map((project: IProject) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            handleDelete={handleDelete}
                            handleUpdateProjectOpen={handleUpdateProjectOpen}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
