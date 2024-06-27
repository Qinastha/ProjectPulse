import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {reqUsers} from "../store/projectsSlice";
import {getProfile} from "../store/projectsSlice";
import axios from "axios";
import {IProfile} from "../core/interfaces/iProfile";

export const ProfileSettings: React.FC=() => {
    const dispatch=useAppDispatch();
    const profile=useAppSelector(getProfile);
    const [formData, setFormData]=useState<IProfile>({
        avatar: profile?.avatar||"",
        phoneNumber: profile?.phoneNumber||"",
        gender: profile?.gender||"",
        address: {
            street: profile?.address?.street||"",
            street2: profile?.address?.street2||"",
            city: profile?.address?.city||"",
            country: profile?.address?.country||"",
            zipCode: profile?.address?.zipCode||""
        },
        language: profile?.language||"",
        timeZone: profile?.timeZone||""
    });

    useEffect((): void => {
        dispatch(reqUsers);
        if(profile) {
            setFormData(profile);
        }
    }, [dispatch, profile]);

    const updateFormData=(e: any, isAddress: boolean=false) => {
        let {name, value}=e.target;
        const addressName=name;
        name=[isAddress? "address":name];
        value=isAddress? {...formData.address, [addressName]: value}:value;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit=async (e: React.FormEvent, formData: any) => {
        e.preventDefault();
        try {
            const response=await axios.put('http://localhost:4000/api/profile/update', formData);
            console.log(response);
        }
        catch(error) {
            console.error("Error during updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="ProfileContainer">
            <h2> Please provide an information about yourself</h2>
            <form onSubmit={() => handleSubmit}>
                <div>
                    <label>
                        Avatar
                    </label>
                    <input
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        onChange={(e) => updateFormData(e)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData(e)}
                        required
                    />
                </div>

                <div>
                    <label>
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => updateFormData(e)}
                        required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Non-binary</option>
                    </select>
                </div>
                <div>
                    <label>
                        Street
                    </label>
                    <input
                        type="text"
                        name="street"
                        value={formData.address.street}
                        onChange={(e) => updateFormData(e, true)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Street2
                    </label>
                    <input
                        type="text"
                        name="street2"
                        value={formData.address.street2}
                        onChange={(e) => updateFormData(e, true)}
                        required
                    />
                </div>
                <div>
                    <label>
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={(e) => updateFormData(e, true)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.address.country}
                        onChange={(e) => updateFormData(e, true)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Zip code
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.address.zipCode}
                        onChange={(e) => updateFormData(e, true)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Language
                    </label>
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={(e) => updateFormData(e)}
                        required
                    />
                </div>
                <div>
                    <label>
                        Time zone
                    </label>
                    <input
                        type="text"
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={(e) => updateFormData(e)}
                        required
                    />
                </div>
                <button type="submit"> Save Changes </button>
            </form>

        </div>
    );
};