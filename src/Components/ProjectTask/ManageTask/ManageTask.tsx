import React, { useEffect } from "react";
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
import { PulseForm } from "@Qinastha/pulse_library";
import { useTranslation } from "react-i18next";

interface ManageTaskProps extends PopUpProps {
  mode: "addTask" | "editTask";
}

export const ManageTask: React.FC<ManageTaskProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { _id, taskLists, members } = useAppSelector(getCurrentProject)!;
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

  // Clear current task and task list when unmounting
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

  const isFormValid = () => {
    return Object.values(taskFormData).every(
      value =>
        value !== null && value !== undefined && value.toString().trim() !== "",
    );
  };

  return (
    <div className="task-pop-form">
      <PulseForm
        requiredInputs={requiredInputs}
        inputValues={inputValues}
        formTitle={
          mode === "addTask"
            ? t("manageTask.newTask")
            : `${t("manageTask.editTask")} ${task.title}`
        }
        isNewTask={isNewTask}
        allMembers={members}
        onChange={e => handleTaskChange(e)}
      />
      <div className="task-pop-form__actions">
        <button
          type="button"
          className="task-pop-form__button task-pop-form__button--cancel"
          onClick={() => handleClosePopUp()}>
          {" "}
          {t("button.cancel")}
        </button>
        <button
          type="button"
          disabled={!isFormValid()}
          onClick={() => {
            handleClosePopUp();
            handleTaskSubmit();
          }}
          className="task-pop-form__button task-pop-form__button--submit">
          {mode === "addTask" ? t("manageTask.create") : t("manageTask.update")}
        </button>
      </div>
    </div>
  );
};
