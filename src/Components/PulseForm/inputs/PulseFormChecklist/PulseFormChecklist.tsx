import { RequiredInput } from "../../../../core";
import React from "react";
import "./PulseFormChecklist.scss";

interface PulseFormSChecklistProps {
  inputData: RequiredInput;
  inputValue: any;
  onChange: (e: any) => void;
}

export const PulseFormChecklist: React.FC<PulseFormSChecklistProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const { type, name } = inputData;

  const onChangeChecklist = (e: any, index: number) => {
    e.preventDefault();
    const checklistValue = inputValue.map((item: any, i: number) =>
      i === index
        ? {
            ...item,
            text: e.target.value,
          }
        : item,
    );
    onChange({ target: { name, value: checklistValue } });
  };

  const addChecklistItem = (e: any) => {
    e.preventDefault();
    const checklistValue = [...inputValue, { text: "", isCompleted: false }];
    onChange({ target: { name, value: checklistValue } });
  };

  const deleteChecklistItem = (e: any, index: number) => {
    e.preventDefault();
    const checklistValue = inputValue.filter(
      (_: any, i: number) => i !== index,
    );
    onChange({ target: { name, value: checklistValue } });
  };

  return (
    <div className="checklistInput">
      {inputValue.map((checkListItem: any, index: number) => {
        return (
          <div key={index}>
            <input
              type={type}
              name={name}
              onChange={e => onChangeChecklist(e, index)}
            />
            <button
              className="deleteChecklist--button"
              onClick={e => deleteChecklistItem(e, index)}>
              &#x232B;
            </button>
          </div>
        );
      })}
      <button
        className="addChecklistItem--button"
        onClick={e => addChecklistItem(e)}>
        Add Item
      </button>
    </div>
  );
};
