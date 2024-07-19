import React from "react";
import {getProfile} from "../../store/userSlice";
import {PulseForm} from "../../Components";
import "./Profile.scss";
import {useProfileForm} from "../../core";
import {useAppSelector} from "../../hooks";

export const ProfileSettings: React.FC = () => {
    const profile = useAppSelector(getProfile);

    const initialFormData = {
        avatar: profile?.avatar || "",
        phoneNumber: profile?.phoneNumber || "",
        gender: profile?.gender || "",
        address: {
            street: profile?.address?.street || "",
            street2: profile?.address?.street2 || "",
            city: profile?.address?.city || "",
            country: profile?.address?.country || "",
            zipCode: profile?.address?.zipCode || "",
        },
        language: profile?.language || "",
        timeZone: profile?.timeZone || "",
    };

    const {
        formData,
        errors,
        requiredInputs,
        inputValues,
        updateFormData,
        handleFile,
        handleSubmit,
        handleDelete,
    } = useProfileForm(initialFormData, "update");

    return (
        <div className="profileContainer">
            <PulseForm
                requiredInputs={requiredInputs}
                inputValues={inputValues}
                formTitle={"Please provide an information about yourself"}
                errors={errors}
                onChange={e => updateFormData(e)}
                handleFile={e => handleFile(e)}
            />
            <button
                type="button"
                onClick={() => handleSubmit()}
                className="submitButton">
                {" "}
                Save Changes{" "}
            </button>

            <button type="button" onClick={handleDelete} className="deleteUserButton">
                {" "}
                Delete User{" "}
            </button>
        </div>
    );
};
