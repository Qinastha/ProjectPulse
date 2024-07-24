import { PulseFormItem } from "./PulseFormItem/PulseFormItem";
import React from "react";
import { RequiredInput } from "../../core";
import "./PulseForm.scss";

interface PulseFormProps {
  requiredInputs: RequiredInput[];
  inputValues: any[];
  formTitle: string;
  errors?: string[];
  onChange: (e: any) => void;
  handleFile?: (e: string) => void;
}

export const PulseForm: React.FC<PulseFormProps> = ({
  requiredInputs,
  inputValues,
  formTitle,
  errors,
  onChange,
  handleFile,
}) => {
  return (
    <div className="pulse-form">
      <h2>{formTitle}</h2>
      <form>
        {requiredInputs.map((inputData: any, index: number) => (
          <PulseFormItem
            key={index}
            inputData={inputData}
            inputValue={inputValues[index]}
            errors={errors}
            className="pulse-form-fields"
            onChange={e => onChange(e)}
            handleFile={e => handleFile!(e)}
          />
        ))}
      </form>
    </div>
  );
};
