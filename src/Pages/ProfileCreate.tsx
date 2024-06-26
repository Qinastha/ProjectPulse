import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {reqUsers} from "../store/projectsSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getUser} from "../store/projectsSlice";
import './ProfileCreate.css'

export const ProfileCreate: React.FC=() => {
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const [user, setUser]=useState(useAppSelector(getUser));
    const [formData, setFormData]=useState({
        avatar: "",
        phoneNumber: "",
        gender: "",
        address: {
            street: "",
            street2: "",
            city: "",
            country: "",
            zipCode: ""
        },
        language: "",
        timeZone: "",
    });

    useEffect(() => {
        const token=localStorage.getItem("token");
        if(!token) {
            navigate("/login");
        }
        dispatch(reqUsers);
    }, [dispatch, navigate]);

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
        const token=localStorage.getItem('token');
        try {
            const response=await axios.post('http://localhost:4000/api/profile/new', {
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
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response);

        } catch(error) {
            console.error("Error during updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="profileContainer">
            {/* <div><pre>{JSON.stringify(user, null, 2)}</pre>
            </div> */}
            <h2> Please provide an information about yourself</h2>
            <form onSubmit={(e) => handleSubmit(e, formData)}>
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