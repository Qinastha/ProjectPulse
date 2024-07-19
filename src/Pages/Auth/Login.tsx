import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Auth.scss";
import {Apple, GitHub, Google} from "@mui/icons-material";
import {getProfile} from "../../store/userSlice";
import {PulseForm} from "../../Components";
import {LOGIN_REQUIRED_INPUTS, RegisterFormData} from "../../core";
import {useAppSelector} from "../../hooks";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const profile = useAppSelector(getProfile);
    const [errors, setErrors] = useState<any>({});

    const [loginFormData, setLoginFormData] = useState<Partial<RegisterFormData>>(
        {
            email: "",
            password: "",
        },
    );

    const requiredInputs = LOGIN_REQUIRED_INPUTS;
    const inputValues = [loginFormData.email, loginFormData.password];

    useEffect(() => {
        if (localStorage.getItem("token") && profile) {
            navigate("/");
        }
    }, []);

    const validateForm = () => {
        let formIsValid = true;
        const newErrors: any = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginFormData.email!)) {
            newErrors.email = "Invalid email address.";
            formIsValid = false;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,16}$/;
        if (!passwordRegex.test(loginFormData.password!)) {
            newErrors.password =
                "Password must contain at least one capital letter and one number, and be at least 8 characters long.";
            formIsValid = false;
        }
        setErrors(newErrors);
        return formIsValid;
    };

    const updateLoginFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginFormData((prevState: Partial<RegisterFormData>) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:4000/api/auth/login",
                {
                    email: loginFormData.email,
                    password: loginFormData.password,
                },
            );

            if (response?.data?.value) {
                localStorage.setItem("token", response.data.value);
                alert("Login successful");
                navigate("/");
            } else {
                navigate("/*");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="loginContainer">
            <PulseForm
                requiredInputs={requiredInputs}
                inputValues={inputValues}
                formTitle={"Login to your account"}
                errors={errors}
                onChange={e => updateLoginFormData(e)}
            />

            <p>
                If you already have an account then{" "}
                <span
                    className="registerLink"
                    onClick={(): void => navigate("/register")}>
          move to registration page
        </span>
            </p>

            <button
                className="loginButton"
                type="button"
                onClick={() => handleLogin()}>
                Login
            </button>

            <div className="authSocialButtons">
                <span className="orText">or</span>
                <div className="socialIcons">
                    <a href="#">
                        <Google style={{fontSize: 40}}/>
                    </a>
                    <a href="#">
                        <GitHub style={{fontSize: 40}}/>
                    </a>
                    <a href="#">
                        <Apple style={{fontSize: 40}}/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export {Login};
