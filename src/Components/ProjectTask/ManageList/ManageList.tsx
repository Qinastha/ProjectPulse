import { postData, putData, RequiredInput } from "../../../core";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { PopUpProps } from "../../PopUp/PopUp";
import "./ManageList.scss";
import {
  getCurrentProject,
  getCurrentTaskListId,
  setCurrentTaskListId,
  setProject,
} from "../../../store/projectSlice";
import { PulseForm } from "@Qinastha/pulse_library";
import { useTranslation } from "react-i18next";

interface ManageListProps extends PopUpProps {
  mode: "addList" | "editList";
}

export const ManageList: React.FC<ManageListProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { taskLists, _id } = useAppSelector(getCurrentProject)!;
  const currentTaskListId = useAppSelector(getCurrentTaskListId)!;

  const [taskListName, setTaskListName] = useState<string>("");

  // Fetch task list details when current task list changes
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
      label: t("manageList.listName"),
      autoComplete: "off",
    },
  ];

  // Reset current task list id when mode changes to "addList" or "editList"
  // to avoid adding or editing a task list from the wrong task list page.
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
        formTitle={
          mode === "addList"
            ? t("manageList.addList")
            : t("manageList.editList")
        }
        onChange={handleListChange}
      />
      <div className="list-pop-form__actions">
        <button
          type="button"
          onClick={handleClosePopUp}
          className="list-pop-form__button list-pop-form__button--cancel">
          {t("button.cancel")}
        </button>

        <button
          type="button"
          onClick={handleListSubmit}
          className="list-pop-form__button list-pop-form__button--submit">
          {mode === "addList" ? t("button.submit") : t("button.update")}
        </button>
      </div>
    </div>
  );
};
