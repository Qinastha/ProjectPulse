import "./PulseFormItem.scss";
import React from "react";
import { RequiredInput } from "../../../core";
import { DragFile } from "../../DragAvatar/DragAvatar";
import { PulseFormInput } from "../inputs/PulseFormInput/PulseFormInput";
import { PulseFormSelect } from "../inputs/PulseFormSelect/PulseFormSelect";
import { PulseFormSearch } from "../inputs/ProjectPulseFormSearch/PulseFormSearch";

interface PulseFormItemProp {
  inputData: RequiredInput;
  inputValue: any;
  errors: any;
  className?: string;
  onChange: (e: any) => void;
  handleFile?: (e: string) => void;
}

export const PulseFormItem: React.FC<PulseFormItemProp> = ({
  inputData,
  inputValue,
  errors,
  className,
  onChange,
  handleFile,
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
      ) : name === "members" ? (
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
