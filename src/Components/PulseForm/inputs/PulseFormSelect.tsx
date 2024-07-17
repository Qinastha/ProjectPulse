import React from "react";
import { RequiredInput } from "../../../core";

interface PulseFormSelectProps {
  inputData: RequiredInput;
  inputValue: any;
  onChange: (e: any) => void;
}

export const PulseFormSelect: React.FC<PulseFormSelectProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const { name, required, options } = inputData;
  return (
    <select name={name} onChange={onChange} required={required}>
      <option value="">Select one</option>
      {options?.map((option: any, index: number) => (
        <option
          key={index}
          value={option.value}
          selected={option.value === inputValue}>
          {option.value}
          {option.flag ? " " + option.flag : ""}
        </option>
      ))}
    </select>
  );
};
