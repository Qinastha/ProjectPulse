import { RequiredInput } from "../../../../core";
import React from "react";
import "./PulseFormChecklist.scss";

interface PulseFormSChecklistProps {
  inputData: RequiredInput;
  inputValue: any;
  isNewTask: boolean;
  onChange: (e: any) => void;
}

export const PulseFormChecklist: React.FC<PulseFormSChecklistProps> = ({
  inputData,
  inputValue,
  isNewTask = false,
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

  const onChangeCompleteList = (e: any, index: number) => {
    const checklistValue = inputValue.map((item: any, i: number) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item,
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
          <div key={index} className="checklistInput__item">
            <input
              type={type}
              name={name}
              value={checkListItem.text}
              onChange={e => onChangeChecklist(e, index)}
            />
            {isNewTask && (
              <input
                className="checklistInput__checkbox"
                type="checkbox"
                name={name}
                checked={checkListItem.isCompleted}
                onChange={e => onChangeCompleteList(e, index)}
              />
            )}
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
