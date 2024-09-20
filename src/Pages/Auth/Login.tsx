import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import { getProfile } from "../../store/userSlice";
import { LOGIN_REQUIRED_INPUTS, postData, RegisterFormData } from "../../core";
import { useAppSelector } from "../../hooks";
import { useTheme } from "../../core/contexts/ThemeContext";
import { PulseForm } from "@Qinastha/pulse_library";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme()!;
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
    const { name, value } = e.target;
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
      const response = await postData("/auth/login", loginFormData);
      if (response?.value) {
        localStorage.setItem("token", response.value);
        navigate("/");
      } else {
        navigate("/*");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="authPageWrapper">
      <div className={`loginContainer ${theme}`}>
        <PulseForm
          requiredInputs={requiredInputs}
          inputValues={inputValues}
          formTitle={"Login"}
          errors={errors}
          onChange={(e: any) => updateLoginFormData(e)}
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
      </div>
    </div>
  );
};

export { Login };
