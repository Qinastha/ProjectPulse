import { DragFile } from "../DragAvatar/DragAvatar";
import React from "react";
import { RequiredInput } from "../../core";
import { PulseFormInput } from "./inputs/PulseFormInput";
import { PulseFormSelect } from "./inputs/PulseFormSelect";
import { PulseFormSearch } from "./inputs/PulseFormSearch";

interface PulseFormItemProp {
  inputData: RequiredInput;
  inputValue: any;
  errors: any;
  onChange: (e: any) => void;
  handleFile?: (e: string) => void;
  className?: string;
}

export const PulseFormItem: React.FC<PulseFormItemProp> = ({
  inputData,
  inputValue,
  errors,
  onChange,
  handleFile,
  className,
}) => {
  const { type, name, label } = inputData;
  return (
    <div className={className}>
      <label>{label}</label>
      {type === "select" ? (
        <PulseFormSelect
          inputData={inputData}
          inputValue={inputValue}
          onChange={e => onChange(e)}
        />
      ) : type === "file" ? (
        <DragFile
          data={inputValue}
          handleFile={(e: string) => handleFile!(e)}
        />
      ) : name === "selectedMembers" ? (
        <PulseFormSearch
          inputData={inputData}
          inputValue={inputValue}
          onChange={e => onChange(e)}
        />
      ) : (
        <PulseFormInput
          inputData={inputData}
          inputValue={inputValue}
          onChange={e => onChange(e)}
        />
      )}
      {errors
        ? errors[name] && <span className="errorText">{errors[name]}</span>
        : null}
    </div>
  );
};
