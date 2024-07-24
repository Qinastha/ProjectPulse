import React, { useState } from "react";
import { TASK_REQUIRED_INPUTS } from "../constants/taskInputs.constants";
import { TaskFormData } from "../interfaces/taskFormData";
import { postData, putData } from "../requests/httpRequests";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getCurrentProject,
  getCurrentTaskListId,
  setProject,
} from "../../store/projectSlice";

export const useTaskForm = (
  initialFormData: TaskFormData,
  mode: "addTask" | "editTask",
) => {
  const dispatch = useAppDispatch();
  const taskListId = useAppSelector(getCurrentTaskListId);
  const { _id: projectId } = useAppSelector(getCurrentProject)!;

  const [taskFormData, setTaskFormData] =
    useState<TaskFormData>(initialFormData);

  const requiredInputs = TASK_REQUIRED_INPUTS;
  const inputValues = [
    taskFormData.title,
    taskFormData.description,
    taskFormData.members,
    taskFormData.checkList,
    taskFormData.deadLine,
    taskFormData.taskDepartment,
    taskFormData.taskStatus,
  ];

  const handleTaskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e?.target) {
      const { name, value } = e.target;
      setTaskFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleTaskSubmit = async () => {
    try {
      const method = mode === "addTask" ? postData : putData;
      const url =
        mode === "addTask"
          ? `project/${projectId}/taskList/${taskListId}/task/new`
          : `task/`;
      const response = await method(url, taskFormData);
      if (response?.value) {
        console.log(response);
        dispatch(setProject(response.value));
      }
    } catch (error) {
      console.error("Error during posting new project:", error);
    }
  };

  return {
    taskFormData,
    requiredInputs,
    inputValues,
    handleTaskChange,
    handleTaskSubmit,
  };
};
