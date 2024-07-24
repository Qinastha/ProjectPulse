import React, { useEffect } from "react";
import "./Project.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import { useParams } from "react-router-dom";
import {
  deleteProjectTaskList,
  fetchProjectById,
  getCurrentProject,
  setCurrentProjectNull,
  setCurrentTaskListId,
} from "../../store/projectSlice";
import { ProjectTaskList } from "../../Components/ProjectTask/ProjectTaskList";

export const Project: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const project = useAppSelector(getCurrentProject)!;

  const openAddList = () => {
    dispatch(setPopUpMode("addList"));
    dispatch(togglePopUp(true));
  };

  const openEditList = (taskId: string) => {
    dispatch(setPopUpMode("editList"));
    dispatch(togglePopUp(true));
    dispatch(setCurrentTaskListId(taskId));
  };

  const deleteList = (listId: string) => {
    if (listId) {
      dispatch(deleteProjectTaskList(listId));
    }
  };

  const openAddTask = () => {
    dispatch(setPopUpMode("addTask"));
    dispatch(togglePopUp(true));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(setCurrentProjectNull());
    };
  }, [dispatch, id]);

  return (
    <>
      <div className="listContainer">
        <div className="taskContainer">
          <ProjectTaskList
            project={project}
            deleteList={deleteList}
            openEditList={openEditList}
            openAddTask={openAddTask}
          />
        </div>
        <button className="taskContainer--add_button" onClick={openAddList}>
          Add another list
        </button>
      </div>
    </>
  );
};
