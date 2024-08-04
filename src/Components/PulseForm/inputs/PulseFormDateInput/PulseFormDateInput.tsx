import React from "react";
import { PulseFormInputProps } from "../PulseFormInput/PulseFormInput";
import "./PulseFormDateInput.scss";

export const PulseFormDateInput: React.FC<PulseFormInputProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const { type, name, required, autoComplete, min, max } = inputData;

  inputValue = inputValue && new Date(inputValue).toISOString().split("T")[0];

  return (
    <div className="pulse-form-date-wrapper">
      <input
        type={type}
        name={name}
        className="pulse-form-date"
        value={inputValue}
        onChange={e => onChange(e)}
        autoComplete={autoComplete}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
};
