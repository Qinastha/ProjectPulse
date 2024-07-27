import React, { useEffect } from "react";
import { PulseForm } from "../../PulseForm/PulseForm";
import { PopUpProps } from "../../PopUp/PopUp";
import "./ManageTask.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getCurrentProject,
  getCurrentTaskId,
  getCurrentTaskListId,
  setCurrentTaskId,
  setCurrentTaskListId,
} from "../../../store/projectSlice";
import { ITaskList, ITasks, TaskFormData, useTaskForm } from "../../../core";

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

  const initialFormData: TaskFormData = {
    title: task?.title || "",
    description: task?.description || "",
    members: task?.members || [],
    checkList: task?.checkList || [
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

  const isNewTask = mode !== "addTask";

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
    currentTaskListId,
    currentTaskId,
  )!;

  return (
    <div className={"task-pop-form"}>
      <PulseForm
        requiredInputs={requiredInputs}
        inputValues={inputValues}
        formTitle={mode === "addTask" ? `New Task` : `Edit ${task.title}`}
        onChange={e => handleTaskChange(e)}
        isNewTask={isNewTask}
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
          {mode === "addTask" ? "Add Task" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
