import React from "react";
import {PulseForm} from "../../Components";
import "./Profile.scss";
import {useProfileForm} from "../../core";

export const ProfileCreate: React.FC = () => {
    const initialFormData = {
        avatar: "",
        phoneNumber: "",
        gender: "",
        address: {
            street: "",
            street2: "",
            city: "",
            country: "",
            zipCode: "",
        },
        language: "",
        timeZone: "",
    };

    const {
        formData,
        errors,
        requiredInputs,
        inputValues,
        updateFormData,
        handleFile,
        handleSubmit,
    } = useProfileForm(initialFormData, "create");

    return (
        <div className="profileContainer">
            <PulseForm
                requiredInputs={requiredInputs}
                inputValues={inputValues}
                formTitle={"Create Profile"}
                errors={errors}
                onChange={e => updateFormData(e)}
                handleFile={e => handleFile(e)}
            />
            <button
                type="button"
                className="submitButton"
                onClick={() => handleSubmit()}>
                {" "}
                Submit Profile{" "}
            </button>
        </div>
    );
};
