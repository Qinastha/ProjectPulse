import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getProfile, updateProfile} from "../../store/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import "./Profile.scss";
import {fetchCountries, fetchLanguages, fetchTimezones,} from "../../store/dataSlice";
import {PulseForm} from "../../Components";
import {PROFILE_REQUIRED_INPUTS, ProfileFormData} from "../../core";

export const ProfileCreate: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = localStorage.getItem("token");
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
    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            dispatch(fetchCountries());
            dispatch(fetchLanguages());
            dispatch(fetchTimezones());
        }
    }, [dispatch, token]);

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
        try {
            const response = await axios.post(
                "http://localhost:4000/api/profile/new",
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
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );
            if (response.data?.value) {
                dispatch(updateProfile(response.data.value));
                console.log(response.data.value);
                navigate("/");
            }
        } catch (error) {
            console.error("Error during updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

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
