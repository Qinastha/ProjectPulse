import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateProfile, getProfile, getAvatar } from "../../store/userSlice";
import axios from "axios";
import "./Profile.sass";
import { useNavigate } from "react-router-dom";
import {
  fetchCountries,
  fetchLanguages,
  fetchTimezones,
  getCountry,
  getLanguage,
  getTimezone,
} from "../../store/dataSlice";
import { DragAvatar } from "../../Components/DragAvatar";
import { FormData } from "../../core/interfaces/formData";

export const ProfileSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(getProfile);
  const avatar = useAppSelector(getAvatar);
  const countries = useAppSelector(getCountry);
  const languages = useAppSelector(getLanguage);
  const timezones = useAppSelector(getTimezone);
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState<FormData>({
    avatar: profile?.avatar || "",
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
  }, [navigate, profile]);

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
    const { name, value } = e.target;
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

  const handleSubmit = async (formData: any) => {
    if(!validateFormData) {
      return
    }
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
      if (response.data) {
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
      <h2> Please provide an information about yourself</h2>
      <form className="profileForm">
        <div>
          <label>Avatar</label>
          <DragAvatar />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            className={errors.phoneNumber ? "errorInput" : ""}
            value={formData.phoneNumber}
            onChange={e => updateFormData(e)}
          />
          {errors.phoneNumber && (
            <span className="errorText">{errors.phoneNumber}</span>
          )}
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={e => updateFormData(e)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Non-binary</option>
          </select>
        </div>
        <div>
          <label>Street</label>
          <input
            type="text"
            name="street"
            className={errors.street ? "errorInput" : ""}
            value={formData.address.street}
            onChange={e => updateFormData(e)}
          />
          {errors.street && <span className="errorText">{errors.street}</span>}
        </div>
        <div>
          <label>Street2</label>
          <input
            type="text"
            name="street2"
            className={errors.street2 ? "errorInput" : ""}
            value={formData.address.street2}
            onChange={e => updateFormData(e)}
          />
          {errors.street2 && (
            <span className="errorText">{errors.street2}</span>
          )}
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            className={errors.city ? "errorInput" : ""}
            value={formData.address.city}
            onChange={e => updateFormData(e)}
          />
          {errors.city && <span className="errorText">{errors.city}</span>}
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.address.country}
            onChange={e => updateFormData(e)}>
            <option value="">Select your country</option>
            {countries.map(country => (
              <option key={country.code} value={country.name}>
                {country.flag}
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Zip code</label>
          <input
            type="text"
            name="zipCode"
            className={errors.zipCode ? "errorInput" : ""}
            value={formData.address.zipCode}
            onChange={e => updateFormData(e)}
          />
          {errors.zipCode && (
            <span className="errorText">{errors.zipCode}</span>
          )}
        </div>
        <div>
          <label>Preffered Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={e => updateFormData(e)}>
            <option value="">Select your language</option>
            {languages.map(language => (
              <option key={language.code} value={language.name}>
                {language.flag}
                {language.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Choose your timezone</label>
          <select
            name="timeZone"
            value={formData.timeZone}
            onChange={e => updateFormData(e)}
            required>
            <option value="">Select your timezone</option>
            {timezones.map(timezone => (
              <option key={timezone.name} value={timezone.gmt}>
                {timezone.zone}
                {timezone.gmt}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => handleSubmit(formData)}
          className="submitButton">
          {" "}
          Save Changes{" "}
        </button>
      </form>
      <button type="button" onClick={handleDelete} className="deleteUserButton">
        {" "}
        Delete User{" "}
      </button>
    </div>
  );
};
