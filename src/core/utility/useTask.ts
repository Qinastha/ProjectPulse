import React, { useState } from "react";
import { TASK_REQUIRED_INPUTS } from "../constants/taskInputs.constants";
import { TaskFormData } from "../interfaces/taskFormData";
import { postData, putData } from "../requests/httpRequests";
import { useAppDispatch } from "../../hooks";
import { setProject } from "../../store/projectSlice";

export const useTaskForm = (
  initialFormData: TaskFormData,
  mode: "addTask" | "editTask",
  _id: string | null,
  currentTaskListId: string | null,
  currentTaskId: string | null,
) => {
  const dispatch = useAppDispatch();

  console.log("id of current LIST");
  console.log(currentTaskListId);

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
      console.log("currentTaskList ID ====");
      console.log(currentTaskListId);
      const url =
        mode === "addTask"
          ? `project/${_id}/taskList/${currentTaskListId}/task/new`
          : `project/${_id}/taskList/${currentTaskListId}/task/${currentTaskId}`;
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
