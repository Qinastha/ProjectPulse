import { CurrentProjectList, RequiredInput } from "../../core";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { setCurrentProjectList } from "../../store/projectSlice";
import { PulseForm } from "../PulseForm/PulseForm";
import { PopUpProps } from "../PopUp/PopUp";
import "./ManageList.scss";

export const ManageList: React.FC<PopUpProps> = ({ handleClosePopUp }) => {
  const dispatch = useAppDispatch();

  const [listFormData, setListFormDta] = useState<Partial<CurrentProjectList>>({
    listName: "",
  });

  const inputValue = [listFormData.listName];

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListFormDta({ ...listFormData, listName: e.target.value });
  };

  const handleListAdd = () => {
    if (listFormData.listName) {
      dispatch(setCurrentProjectList(listFormData.listName));
      handleClosePopUp();
    } else {
      console.error("List name is required");
    }
  };

  // const handleListSubmit = async () => {
  //     try {
  //         const response = await postData(url, listFormData)
  //         if (response?.value) {
  //             console.log(response)
  //         }
  //     } catch (error) {
  //         console.error("Error during posting new project:", error)
  //     }
  // }

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

  return (
    <div className="list-pop-form">
      <PulseForm
        requiredInputs={requiredInput}
        inputValues={inputValue}
        formTitle={"Add new List"}
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
          onClick={() => handleListAdd()}
          className="list-pop-form__button list-pop-form__button--submit">
          Add List
        </button>
      </div>
    </div>
  );
};
