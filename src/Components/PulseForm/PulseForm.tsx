import { PulseFormInput } from "./PulseFormInput";
import React from "react";
import { RequiredInput } from "../../core";

interface PulseFormProps {
  requiredInputs: RequiredInput[];
  inputValues: any[];
  formTitle: string;
  errors: string[];
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
    <div className="formContainer">
      <h2>{formTitle}</h2>
      <form>
        {requiredInputs.map((inputData: any, index: number) => (
          <PulseFormInput
            key={index}
            inputData={inputData}
            inputValue={inputValues[index]}
            errors={errors}
            onChange={e => onChange(e)}
            handleFile={e => handleFile!(e)}
          />
        ))}
      </form>
    </div>
  );
};
