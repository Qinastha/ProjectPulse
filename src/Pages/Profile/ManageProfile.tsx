import React from "react";
import { getProfile } from "../../store/userSlice";
import { PulseForm } from "../../Components";
import "./ManageProfile.scss";
import { useAppSelector } from "../../hooks";
import { useProfileForm } from "../../core";
import { useTheme } from "../../core/contexts/ThemeContext";

export const ManageProfile: React.FC<{ mode: "create" | "update" }> = ({
  mode,
}) => {
  const profile = useAppSelector(getProfile);
  const { theme } = useTheme()!;

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
  } = useProfileForm(initialFormData, mode);

  return (
    <div className={`profileContainer ${theme}`}>
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

      {profile?.timeZone && (
        <button
          type="button"
          onClick={handleDelete}
          className="deleteUserButton">
          {" "}
          Delete User{" "}
        </button>
      )}
    </div>
  );
};
