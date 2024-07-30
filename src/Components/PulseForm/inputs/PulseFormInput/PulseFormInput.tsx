import React from "react";
import { RequiredInput } from "../../../../core";
import "./PulseFormInput.scss";

export interface PulseFormInputProps {
  inputData: RequiredInput;
  inputValue: any;
  className?: string;
  onChange: (e: any) => void;
}

export const PulseFormInput: React.FC<PulseFormInputProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const { type, name, required, autoComplete, min, max } = inputData;
  if (type === "date") {
    inputValue = inputValue && new Date(inputValue).toISOString().split("T")[0];
  }
  return (
    <input
      type={type}
      name={name}
      className={`pulse-form-input`}
      required={required}
      value={inputValue}
      onChange={e => onChange(e)}
      autoComplete={autoComplete}
      min={min}
      max={max}
    />
  );
};
