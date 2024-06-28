import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateProfile, getProfile } from "../../store/projectsSlice";
import axios from "axios";
import { IProfile } from "../../core/interfaces/IProfile";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export const ProfileSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(getProfile);

  type Country =
    | "United States"
    | "Canada"
    | "United Kingdom"
    | "Australia"
    | "Japan"
    | "Ukraine"
    | "Germany"
    | "Spain"
    | "Poland"
    | "Portugal"
    | "France";
  type Language =
    | "English"
    | "Spanish"
    | "French"
    | "German"
    | "Japanese"
    | "Polish"
    | "Portuguese"
    | "Ukrainian"
    | "Russian";

  const countries: Country[] = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Japan",
    "Ukraine",
    "Germany",
    "Spain",
    "Poland",
    "Portugal",
    "France",
  ];
  const languages: Language[] = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Polish",
    "Portuguese",
    "Ukrainian",
    "Russian",
  ];

  const [formData, setFormData] = useState<IProfile>({
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
  });

  useEffect((): void => {
    if (!profile) {
      navigate("/register");
    } else {
      setFormData(profile);
    }
  }, [profile]);

  const updateFormData = (e: any, isAddress: boolean = false) => {
    let { name, value } = e.target;
    const addressName = name;
    name = [isAddress ? "address" : name];
    value = isAddress ? { ...formData.address, [addressName]: value } : value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent, formData: any) => {
    e.preventDefault();
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
      );
      console.log(response);
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

  return (
    <div className="profileContainer">
      <h2> Please provide an information about yourself</h2>
      <form onSubmit={() => handleSubmit}>
        <div>
          <label>Avatar</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={e => updateFormData(e)}
            required
          />
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
            onChange={e => updateFormData(e)}
            required>
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
            value={formData.address.street}
            onChange={e => updateFormData(e, true)}
            required
          />
        </div>
        <div>
          <label>Street2</label>
          <input
            type="text"
            name="street2"
            value={formData.address.street2}
            onChange={e => updateFormData(e, true)}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={e => updateFormData(e, true)}
            required
          />
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.address.country}
            onChange={e => updateFormData(e, true)}
            required>
            <option value="">Select one</option>
            {countries.sort().map((country, index) => (
              <option key={index} value={country}>
                {country}
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
            onChange={e => updateFormData(e, true)}
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
            <option value="">Select one</option>
            {languages.sort().map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Time zone</label>
          <input
            type="text"
            name="timeZone"
            value={formData.timeZone}
            onChange={e => updateFormData(e)}
            required
          />
        </div>
        <button type="submit"> Save Changes </button>
      </form>
    </div>
  );
};
