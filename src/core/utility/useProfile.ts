import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROFILE_REQUIRED_INPUTS } from "../constants/profileInputs.constant";
import { ProfileFormData } from "../interfaces/profileFormData";
import { useAppDispatch } from "../../hooks";
import { setStateNull, updateProfile } from "../../store/userSlice";
import { deleteData, postData, putData } from "../requests/httpRequests";
import { useTranslation } from "react-i18next";

export const useProfileForm = (
  initialData: ProfileFormData,
  mode: "create" | "update",
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<ProfileFormData>(initialData);

  const requiredInputs = PROFILE_REQUIRED_INPUTS;
  const inputValues = [
    formData.avatar,
    formData.phoneNumber,
    formData.gender,
    formData.address.street,
    formData.address.street2,
    formData.address.city,
    formData.address.country,
    formData.address.zipCode,
    formData.language,
    formData.timeZone,
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [dispatch, token]);

  const validateFormData = () => {
    let formIsValid = true;
    const newErrors: any = {};

    const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
    const addressRegex = /^[^\W_](.*[^\W_])?$/;
    const zipCodeRegex = /^\d{1,10}$/;

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t("error.phoneNumber");
      formIsValid = false;
    }

    if (
      !addressRegex.test(formData.address.street) ||
      formData.address.street.length === 0
    ) {
      newErrors.street = t("error.street");
      formIsValid = false;
    }

    if (!addressRegex.test(formData.address.street2)) {
      newErrors.street2 = t("error.street2");
      formIsValid = false;
    }

    if (
      !addressRegex.test(formData.address.city) ||
      formData.address.city.length === 0
    ) {
      newErrors.city = t("error.city");
      formIsValid = false;
    }

    if (!zipCodeRegex.test(formData.address.zipCode)) {
      newErrors.zipCode = t("error.zipCode");
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const updateFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let { name, value } = e.target;
    if (name === "gender") {
      value = value.split(".")[1];
    }
    const isAddress = [
      "street",
      "street2",
      "city",
      "country",
      "zipCode",
    ].includes(name);

    setFormData(prevData => ({
      ...prevData,
      [isAddress ? "address" : name]: isAddress
        ? { ...prevData.address, [name]: value }
        : value,
    }));
  };

  const handleFile = async (file: string) => {
    if (!file) return;
    const response = await postData("core/uploadImage", { avatar: file });
    if (response?.value) {
      setFormData({ ...formData, avatar: response.value });
    }
  };

  const handleSubmit = async () => {
    if (!validateFormData()) return;
    try {
      const url = mode === "create" ? "profile/new" : "profile/update";
      const method = mode === "create" ? postData : putData;
      const response = await method(url, formData);

      if (response?.value) {
        dispatch(updateProfile(response.value));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during profile submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData("user/delete");
      localStorage.removeItem("token");
      dispatch(setStateNull());
      navigate("/register");
    } catch (error) {
      console.error("Error during deleting profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return {
    formData,
    errors,
    requiredInputs,
    inputValues,
    updateFormData,
    handleFile,
    handleSubmit,
    handleDelete,
  };
};
