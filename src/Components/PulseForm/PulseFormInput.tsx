import { RequiredInput } from "../../core/interfaces/requireInput";
import { DragFile } from "../DragAvatar/DragAvatar";

interface PulsefFormInput {
  inputData: RequiredInput;
  inputValue: any;
  errors: any;
  onChange: (e: any) => void;
  handleFile?: (e: string) => void;
}

export const PulseFormInput: React.FC<PulsefFormInput> = ({
  inputData,
  inputValue,
  errors,
  onChange,
  handleFile,
}) => {
  const { type, name, className, required, autoComplete, label, options } =
    inputData;
  return (
    <div>
      <label>{label}</label>
      {type === "select" ? (
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
      ) : type === "file" ? (
        <DragFile
          data={inputValue}
          handleFile={(e: string) => handleFile!(e)}
        />
      ) : type === "date" ? (
        <input
          type={type}
          name={name}
          className={className}
          value={inputValue}
          onChange={e => onChange(e)}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          className={className}
          required={required}
          value={inputValue}
          onChange={e => onChange(e)}
          autoComplete={autoComplete}
        />
      )}
      {errors[name] && <span className="errorText">{errors[name]}</span>}
    </div>
  );
};
