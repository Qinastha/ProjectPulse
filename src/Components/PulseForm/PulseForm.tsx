import { PulseFormItem } from "./PulseFormItem/PulseFormItem";
import React from "react";
import { RequiredInput } from "../../core";
import "./PulseForm.scss";

interface PulseFormProps {
  requiredInputs: RequiredInput[];
  inputValues: any[];
  formTitle: string;
  errors?: string[];
  isNewTask?: boolean;
  onChange: (e: any) => void;
  handleFile?: (e: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PulseForm: React.FC<PulseFormProps> = ({
  requiredInputs,
  inputValues,
  formTitle,
  errors,
  isNewTask = false,
  onChange,
  handleFile,
  onSubmit,
}) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="pulse-form">
      <h2>{formTitle}</h2>
      <form onSubmit={handleFormSubmit}>
        {requiredInputs.map((inputData: any, index: number) => (
          <PulseFormItem
            key={index}
            inputData={inputData}
            inputValue={inputValues[index]}
            errors={errors}
            isNewTask={isNewTask}
            className="pulse-form-fields"
            onChange={e => onChange(e)}
            handleFile={e => handleFile!(e)}
          />
        ))}
      </form>
    </div>
  );
};
