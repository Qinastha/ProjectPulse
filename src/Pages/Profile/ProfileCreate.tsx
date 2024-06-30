import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getProfile, updateProfile } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./Profile.css";
import {
  fetchCountries,
  fetchLanguages,
  fetchTimezones,
  getCountry,
  getLanguage,
  getTimezone,
} from "../../store/dataSlice";
import {DragAvatar} from "../../Components/DragAvatar";
import { FormData } from "../../core/interfaces/formData";

export const ProfileCreate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(getCountry);
  const languages = useAppSelector(getLanguage);
  const timezones = useAppSelector(getTimezone);
  const profile = useAppSelector(getProfile)
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState<FormData>({
    avatar: profile?.avatar ?? "",
    phoneNumber: '',
    gender: '',
    address: {
      street:'',
      street2:  '',
      city: '',
      country:  '',
      zipCode:  '',
    },
    language: '',
    timeZone:  '',
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchCountries());
      dispatch(fetchLanguages());
      dispatch(fetchTimezones());
    }
  }, [dispatch, token]);

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAddress = ['street', 'street2', 'city', 'country', 'zipCode'].includes(name);

    setFormData((prevData) => ({
      ...prevData,
      [isAddress ? 'address' : name]: isAddress
        ? { ...prevData.address, [name]: value }
        : value,
    }));
  };  

  const handleSubmit = async (e: React.FormEvent, formData: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/profile/new",
        {
          avatar: profile?.avatar,
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
      <h2> Please provide an information about yourself</h2>
      <form onSubmit={e => handleSubmit(e, formData)}>
        <div>
          <label>Avatar</label>
          <DragAvatar />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={e => updateFormData(e)}
            required
          />
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={e => updateFormData(e)}>
            <option value="">Select one</option>
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
            value={formData.address.street}
            onChange={updateFormData}
            required
          />
        </div>
        <div>
          <label>Street2</label>
          <input
            type="text"
            name="street2"
            value={formData.address.street2}
            onChange={e => updateFormData(e)}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={e => updateFormData(e)}
            required
          />
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.address.country}
            onChange={e => updateFormData(e)}
            required>
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
            value={formData.address.zipCode}
            onChange={e => updateFormData(e)}
            required
          />
        </div>
        <div>
          <label>Preffered Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={e => updateFormData(e)}
            required>
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
        <button type="submit" className="submitButton">
          {" "}
          Save Changes{" "}
        </button>
      </form>
    </div>
  );
};
