import React from "react";
import { PulseForm } from "../PulseForm/PulseForm";
import { PopUpProps } from "../PopUp/PopUp";
import "./ManageTask.scss";
import { useTaskForm } from "../../core/utility/useTask";
import { TaskFormData } from "../../core/interfaces/taskFormData";

interface ManageTaskProps extends PopUpProps {
  mode: "addTask" | "editTask";
}

export const ManageTask: React.FC<ManageTaskProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const initialFormData: TaskFormData = {
    title: "",
    description: "",
    members: [],
    checkList: [
      {
        text: "",
        isCompleted: false,
      },
    ],
    deadLine: new Date(),
    taskDepartment: "developer",
    taskStatus: "to do",
  };

  const {
    taskFormData,
    requiredInputs,
    inputValues,
    handleTaskChange,
    handleTaskSubmit,
  } = useTaskForm(initialFormData, mode);

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
