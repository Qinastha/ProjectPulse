import React, { useEffect } from "react";
import { PopUpProps } from "../../PopUp/PopUp";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getCurrentProject,
  getCurrentTaskId,
  getCurrentTaskListId,
  setCurrentTaskId,
  setCurrentTaskListId,
} from "../../../store/projectSlice";
import { ITaskList, ITasks, TaskFormData } from "../../../core";
import "./ProjectTaskPreview.scss";
import { TaskPreview } from "./TaskPreview";

export const ProjectTaskPreview: React.FC<PopUpProps> = ({
  handleClosePopUp,
}) => {
  const dispatch = useAppDispatch();
  const { taskLists } = useAppSelector(getCurrentProject)!;
  const currentTaskListId = useAppSelector(getCurrentTaskListId)!;
  const currentTaskId = useAppSelector(getCurrentTaskId)!;
  const task = taskLists
    .find((list: ITaskList) => list._id === currentTaskListId)!
    .tasks.find((task: ITasks) => task._id === currentTaskId)!;

  const taskData: TaskFormData = {
    title: task?.title,
    description: task?.description,
    members: task?.members,
    checkList: task?.checkList,
    deadLine: task?.deadLine,
    taskDepartment: task?.taskDepartment,
    taskStatus: task?.taskStatus,
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentTaskListId(null));
      dispatch(setCurrentTaskId(null));
    };
  }, [dispatch]);

  return (
    <div className="previewTask">
      <TaskPreview taskData={taskData} handleClosePopUp={handleClosePopUp} />
    </div>
  );
};
