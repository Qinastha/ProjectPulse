import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getProfile, setProfileNull, updateProfile} from "../../store/userSlice";
import axios from "axios";
import "./Profile.scss";
import {useNavigate} from "react-router-dom";
import {fetchCountries, fetchLanguages, fetchTimezones,} from "../../store/dataSlice";
import {PulseForm} from "../../Components";
import {PROFILE_REQUIRED_INPUTS, ProfileFormData} from "../../core";

export const ProfileSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const profile = useAppSelector(getProfile);
    const [errors, setErrors] = useState<any>({});

    const [formData, setFormData] = useState<ProfileFormData>({
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
    });

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

    const initializeFormData = () => {
        if (profile) {
            setFormData({
                avatar: profile.avatar || "",
                phoneNumber: profile.phoneNumber || "",
                gender: profile.gender || "",
                address: {
                    street: profile.address?.street || "",
                    street2: profile.address?.street2 || "",
                    city: profile.address?.city || "",
                    country: profile.address?.country || "",
                    zipCode: profile.address?.zipCode || "",
                },
                language: profile.language || "",
                timeZone: profile.timeZone || "",
            });
        }
    };

    useEffect(() => {
        if (!profile) {
            navigate("/register");
        } else {
            initializeFormData();
            dispatch(fetchCountries());
            dispatch(fetchLanguages());
            dispatch(fetchTimezones());
        }
    }, [navigate, dispatch, profile]);

    const validateFormData = () => {
        let formIsValid = true;
        const newErrors: any = {};

        const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
        const addressRegex = /^[^\W_](.*[^\W_])?$/;
        const zipCodeRegex = /^\d{1,10}$/;

        if (!phoneNumberRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number format.";
            formIsValid = false;
        }

        if (
            !addressRegex.test(formData.address.street) ||
            formData.address.street.length === 0
        ) {
            newErrors.street =
                "Street address cannot start with symbols or be empty.";
            formIsValid = false;
        }

        if (!addressRegex.test(formData.address.street2)) {
            newErrors.street2 = "Street2 address cannot start with symbols.";
            formIsValid = false;
        }

        if (
            !addressRegex.test(formData.address.city) ||
            formData.address.city.length === 0
        ) {
            newErrors.city = "City cannot start with symbols or be empty.";
            formIsValid = false;
        }

        if (!zipCodeRegex.test(formData.address.zipCode)) {
            newErrors.zipCode =
                "Zip code must be numeric and no more than 10 digits.";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const updateFormData = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const {name, value} = e.target;
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
                ? {...prevData.address, [name]: value}
                : value,
        }));
    };

    const handleFile = async (file: string) => {
        console.log(file);
        if (!file) {
            return;
        }
        const response = await axios.post(
            "http://localhost:4000/api/profile/uploadAvatar",
            {avatar: file},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            },
        );
        if (response.data) {
            dispatch(updateProfile(response.data.value));
            setFormData({...formData, avatar: response.data.value});
        } else {
            alert("Failed to update avatar");
        }
    };

    const handleSubmit = async () => {
        if (!validateFormData()) {
            return;
        }
        console.log(formData);
        try {
            const response = await axios.put(
                "http://localhost:4000/api/profile/update",
                {
                    avatar: formData.avatar,
                    phoneNumber: formData.phoneNumber,
                    gender: formData.gender,
                    address: {
                        street: formData.address.street,
                        street2: formData.address.street2,
                        city: formData.address.city,
                        country: formData.address.country,
                        zipCode: formData.address.zipCode,
                    },
                    language: formData.language,
                    timeZone: formData.timeZone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(response.data);
            if (response.data.value) {
                dispatch(updateProfile(response.data.value));
                alert("Profile updated successfully");
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error during updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:4000/api/user/delete",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );
            console.log(response);
            if (response) {
                localStorage.removeItem("token");
                dispatch(setProfileNull())
                navigate("/register");
                alert("Profile deleted successfully");
            } else {
                alert("Failed to delete profile");
            }
        } catch (error) {
            console.error("Error during deleting profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

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
