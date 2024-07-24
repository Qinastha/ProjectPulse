import React from "react";
import { RequiredInput } from "../../../../core";
import "./PulseFormInput.scss";

export interface PulseFormInputProps {
  inputData: RequiredInput;
  inputValue: any;
  onChange: (e: any) => void;
  className?: string;
}

export const PulseFormInput: React.FC<PulseFormInputProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const { type, name, required, autoComplete, min, max } = inputData;
  return (
    <input
      type={type}
      name={name}
      className="pulse-form-input"
      required={required}
      value={inputValue}
      onChange={e => onChange(e)}
      autoComplete={autoComplete}
      min={min}
      max={max}
    />
  );
};
