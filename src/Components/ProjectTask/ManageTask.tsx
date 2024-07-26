import React, { useEffect } from "react";
import { PulseForm } from "../PulseForm/PulseForm";
import { PopUpProps } from "../PopUp/PopUp";
import "./ManageTask.scss";
import { useTaskForm } from "../../core/utility/useTask";
import { TaskFormData } from "../../core/interfaces/taskFormData";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getCurrentProject,
  getCurrentTaskId,
  getCurrentTaskListId,
  setCurrentTaskId,
  setCurrentTaskListId,
} from "../../store/projectSlice";
import { ITaskList, ITasks } from "../../core";

interface ManageTaskProps extends PopUpProps {
  mode: "addTask" | "editTask";
}

export const ManageTask: React.FC<ManageTaskProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const { _id, taskLists } = useAppSelector(getCurrentProject)!;
  const currentTaskListId = useAppSelector(getCurrentTaskListId)!;
  const currentTaskId = useAppSelector(getCurrentTaskId)!;

  const task = taskLists
    .find((list: ITaskList) => list._id === currentTaskListId)!
    .tasks.find((task: ITasks) => task._id === currentTaskId)!;
  console.log("task ==========");
  console.log(task);

  const initialFormData: TaskFormData = {
    title: task?.title || "",
    description: task?.description || "",
    members: task?.members || [],
    checkList: task?.checklist || [
      {
        text: "",
        isCompleted: false,
      },
    ],
    deadLine: task?.deadLine || new Date(),
    taskDepartment: task?.taskDepartment || "developer",
    taskStatus: task?.taskStatus || "to do",
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentTaskListId(null));
      dispatch(setCurrentTaskId(null));
    };
  }, [dispatch, mode]);

  const {
    taskFormData,
    requiredInputs,
    inputValues,
    handleTaskChange,
    handleTaskSubmit,
  } = useTaskForm(
    initialFormData,
    mode,
    _id,
    currentTaskId,
    currentTaskListId,
  )!;

  return (
    <div className={"task-pop-form"}>
      <PulseForm
        requiredInputs={requiredInputs}
        inputValues={inputValues}
        formTitle={mode === "addTask" ? "New Task List" : "Edit Task"}
        onChange={e => handleTaskChange(e)}
      />
      <div className="task-pop-form__actions">
        <button
          type="button"
          className="task-pop-form__button task-pop-form__button--cancel"
          onClick={() => handleClosePopUp()}>
          {" "}
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            handleClosePopUp();
            handleTaskSubmit();
          }}
          className="task-pop-form__button task-pop-form__button--submit">
          Add Task List
        </button>
      </div>
    </div>
  );
};
