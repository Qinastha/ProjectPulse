import React, { useState } from "react";
import { PulseForm } from "../PulseForm/PulseForm";
import { PopUpProps } from "../PopUp/PopUp";
import { ITasks } from "../../core";
import { TASK_REQUIRED_INPUTS } from "../../core/constants/taskInputs.constants";
import { useAppDispatch } from "../../hooks";
import "./ManageTask.scss";

export const ManageTask: React.FC<PopUpProps> = ({ handleClosePopUp }) => {
  const [taskFormData, setTaskFormData] = useState<ITasks>({
    taskName: "",
    taskDescription: "",
    taskPriority: "",
    taskStatus: "",
  });

  const dispatch = useAppDispatch();

  const requiredInputs = TASK_REQUIRED_INPUTS;
  const inputValues = [
    taskFormData.taskName,
    taskFormData.taskDescription,
    taskFormData.taskPriority,
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

  // const handleAddTask = (taskFormData: ITasks) => {
  //     dispatch(setCurrentProjectTasks(taskFormData))
  // }

  // const handleTaskSubmit = async () => {
  //     try {
  //         const response = await postData(url, popUpFormData)
  //         if (response?.value) {
  //             console.log(response)
  //         }
  //     } catch (error) {
  //         console.error("Error during posting new project:", error)
  //     }
  // }

  return (
    <div className={"task-pop-form"}>
      <PulseForm
        requiredInputs={requiredInputs}
        inputValues={inputValues}
        formTitle={"New Task List"}
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
            // handleTaskSubmit();
            // handleAddTask(taskFormData);
            handleClosePopUp();
          }}
          className="task-pop-form__button task-pop-form__button--submit">
          Add Task List
        </button>
      </div>
    </div>
  );
};
