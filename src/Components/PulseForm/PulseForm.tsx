import { PulseFormItem } from "./PulseFormItem";
import React from "react";
import { RequiredInput } from "../../core";

interface PulseFormProps {
  requiredInputs: RequiredInput[];
  inputValues: any[];
  formTitle: string;
  errors?: string[];
  onChange: (e: any) => void;
  handleFile?: (e: string) => void;
  formClassName?: string;
  inputClassName?: string;
}

export const PulseForm: React.FC<PulseFormProps> = ({
  requiredInputs,
  inputValues,
  formTitle,
  errors,
  onChange,
  handleFile,
  formClassName,
  inputClassName,
}) => {
  return (
    <div className={formClassName}>
      <h2>{formTitle}</h2>
      <form>
        {requiredInputs.map((inputData: any, index: number) => (
          <PulseFormItem
            key={index}
            inputData={inputData}
            inputValue={inputValues[index]}
            errors={errors}
            className={inputClassName}
            onChange={e => onChange(e)}
            handleFile={e => handleFile!(e)}
          />
        ))}
      </form>
    </div>
  );
};
