import {RequiredInput} from "../../core/interfaces/requireInput";
import {DragAvatar} from "../DragAvatar/DragAvatar";

interface PulsefFormInput {
    inputData: RequiredInput;
    inputValue: any;
    errors: any;
    onChange: (e: any) => void;
    handleFile?: (e: any) => void;
}

export const PulseFormInput:React.FC<PulsefFormInput>=({inputData, inputValue, errors, onChange, handleFile,}) => {
    const {type, name, className, required, autoComplete, label, options, }=inputData;
    return (
        <div>
            <label>{label}</label>
            {type==="select"?
                <select
                    name={name}
                    value={inputValue}
                    onChange={onChange}
                    required={required}>
                    <option value="">Select one</option>
                    {options?.map((option: any, index:number) => (
                        <option key={index} value={option.name}>
                            {option.value} 
                            {option.flag? " "+option.flag : "" }
                        </option>
                    ))}
                </select>:type==="file"? <DragAvatar projectAvatar={inputValue} handleAddLogo={handleFile} />:
                    <input
                        type={type}
                        name={name}
                        className={className}
                        required={required}
                        value={inputValue}
                        onChange={onChange}
                        autoComplete={autoComplete} />
            }
            {errors[name] && (
            <span className="errorText">{errors[name]}</span>
          )}
        </div>
    );
};