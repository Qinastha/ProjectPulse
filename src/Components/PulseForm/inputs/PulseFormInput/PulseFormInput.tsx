import React from "react";
import { RequiredInput } from "../../../../core";
import "./PulseFormInput.scss";

export interface PulseFormInputProps {
  inputData: RequiredInput;
  inputValue: any;
  onChange: (e: any) => void;
}

export const PulseFormInput: React.FC<PulseFormInputProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const { type, name, required, autoComplete } = inputData;
  if (type === "date") {
    inputValue = inputValue && new Date(inputValue).toISOString().split("T")[0];
  }
  return (
    <input
      type={type}
      name={name}
      className="pulse-form-input"
      required={required}
      value={inputValue}
      onChange={e => onChange(e)}
      autoComplete={autoComplete}
    />
  );
};
