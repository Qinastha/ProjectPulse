import { postData, putData, RequiredInput } from "../../core";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PulseForm } from "../PulseForm/PulseForm";
import { PopUpProps } from "../PopUp/PopUp";
import "./ManageList.scss";
import {
  getCurrentProject,
  setCurrentTaskListId,
  setProject,
} from "../../store/projectSlice";

interface ManageListProps extends PopUpProps {
  mode: "addList" | "editList";
}

export const ManageList: React.FC<ManageListProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const { taskLists, currentTaskListId, _id } =
    useAppSelector(getCurrentProject)!;

  const [taskListName, setTaskListName] = useState<string>("");

  useEffect(() => {
    if (currentTaskListId) {
      const list = taskLists?.find(
        (list: any) => list._id === currentTaskListId,
      );
      if (list) {
        setTaskListName(list.taskListName);
      }
    }
  }, []);

  const inputValue = [taskListName];

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskListName(e.target.value);
  };

  const handleListSubmit = async () => {
    try {
      const method = mode === "addList" ? postData : putData;
      const url =
        mode === "addList"
          ? `project/${_id}/taskList/new`
          : `project/${_id}/taskList/${currentTaskListId}`;
      const data =
        mode === "addList" ? { taskListName, taskLists } : { taskListName };
      const response = await method(url, data);
      if (response?.value) {
        console.log(response);
        dispatch(setProject(response.value));
        handleClosePopUp();
      }
    } catch (error) {
      console.error("Error during posting new project:", error);
    }
  };

  const requiredInput: RequiredInput[] = [
    {
      type: "text",
      name: "listName",
      required: true,
      className: "form-control",
      label: "List name",
      autoComplete: "off",
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(setCurrentTaskListId(null));
    };
  }, [dispatch, mode]);

  return (
    <div className="list-pop-form">
      <PulseForm
        requiredInputs={requiredInput}
        inputValues={inputValue}
        formTitle={mode === "addList" ? "Add new List" : "Edit List"}
        onChange={handleListChange}
      />
      <div className="list-pop-form__actions">
        <button
          type="button"
          onClick={handleClosePopUp}
          className="list-pop-form__button list-pop-form__button--cancel">
          Cancel
        </button>

        <button
          type="button"
          onClick={handleListSubmit}
          className="list-pop-form__button list-pop-form__button--submit">
          {mode === "addList" ? "Add List" : "Edit List"}
        </button>
      </div>
    </div>
  );
};
