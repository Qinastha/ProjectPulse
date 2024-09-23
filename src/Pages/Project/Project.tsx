import React, { useEffect } from "react";
import "./Project.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import { useParams } from "react-router-dom";
import {
  deleteProjectTask,
  deleteProjectTaskList,
  getCurrentProject,
  setCurrentProjectNull,
  setCurrentTaskId,
  setCurrentTaskListId,
} from "../../store/projectSlice";
import { ProjectTaskList } from "../../Components";
import { useTranslation } from "react-i18next";

export const Project: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>()!;
  const project = useAppSelector(getCurrentProject)!;

  const openAddList = () => {
    dispatch(setPopUpMode("addList"));
    dispatch(togglePopUp(true));
  };

  const openEditList = (listId: string) => {
    dispatch(setPopUpMode("editList"));
    dispatch(togglePopUp(true));
    dispatch(setCurrentTaskListId(listId));
  };

  const deleteList = (listId: string) => {
    if (listId) {
      dispatch(deleteProjectTaskList(listId));
    }
  };

  const openAddTask = (listId: string) => {
    dispatch(setPopUpMode("addTask"));
    dispatch(togglePopUp(true));
    dispatch(setCurrentTaskListId(listId));
  };

  const openEditTask = (listId: string, taskId: string) => {
    dispatch(setPopUpMode("editTask"));
    dispatch(togglePopUp(true));
    dispatch(setCurrentTaskListId(listId));
    dispatch(setCurrentTaskId(taskId));
  };

  const openPreviewTask = (listId: string, taskId: string) => {
    dispatch(togglePopUp(true));
    dispatch(setPopUpMode("previewTask"));
    dispatch(setCurrentTaskListId(listId));
    dispatch(setCurrentTaskId(taskId));
  };

  const deleteTask = (_id: string, listId: string, taskId: string) => {
    if (taskId) {
      dispatch(deleteProjectTask({ _id, listId, taskId }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentProjectNull());
      dispatch(setCurrentTaskListId(null));
    };
  }, [dispatch, id]);

  return (
    <div className="listContainer">
      <div className="taskContainer">
        <ProjectTaskList
          project={project}
          deleteList={deleteList}
          openEditList={openEditList}
          openAddTask={openAddTask}
          openEditTask={openEditTask}
          openPreviewTask={openPreviewTask}
          deleteTask={deleteTask}
        />
      </div>
      <button className="taskContainer--add_button" onClick={openAddList}>
        {t("project.addList")}
      </button>
    </div>
  );
};
