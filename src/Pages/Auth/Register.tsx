import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import {
  postData,
  REGISTER_REQUIRED_INPUTS,
  RegisterFormData,
} from "../../core";
import { useTheme } from "../../core/contexts/ThemeContext";
import { PulseForm } from "@Qinastha/pulse_library";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme()!;
  const [errors, setErrors] = useState<any>({});

  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: new Date().toISOString(),
    position: "",
  });

  const requiredInputs = REGISTER_REQUIRED_INPUTS;
  const inputValues = [
    registerFormData.email,
    registerFormData.password,
    registerFormData.firstName,
    registerFormData.lastName,
    registerFormData.userName,
    registerFormData.dateOfBirth,
    registerFormData.position,
  ];

  useEffect((): void => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const validateForm = () => {
    let formIsValid = true;
    const newErrors: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerFormData.email)) {
      newErrors.email = "Invalid email address.";
      formIsValid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,16}$/;
    if (!passwordRegex.test(registerFormData.password)) {
      newErrors.password =
        "Password must contain at least one capital letter and one number, and be at least 8 characters long.";
      formIsValid = false;
    }

    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    if (
      !nameRegex.test(registerFormData.firstName) ||
      registerFormData.firstName.length === 0
    ) {
      newErrors.firstName =
        "First name must start with a capital letter and contain only letters.";
      formIsValid = false;
    }
    if (
      !nameRegex.test(registerFormData.lastName) ||
      registerFormData.lastName.length === 0
    ) {
      newErrors.lastName =
        "Last name must start with a capital letter and contain only letters.";
      formIsValid = false;
    }

    const usernameRegex = /^[^\W_](.*[^\W_])?$/;
    if (
      !usernameRegex.test(registerFormData.userName) ||
      registerFormData.userName.length === 0
    ) {
      newErrors.userName = "Username cannot start with symbols or be empty.";
      formIsValid = false;
    }

    const today = new Date();
    const selectedDate = new Date(registerFormData.dateOfBirth);
    if (selectedDate > today) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future.";
      formIsValid = false;
    }
    const minDate = new Date("1900-01-01");
    if (selectedDate < minDate) {
      newErrors.dateOfBirth = "Date of birth cannot be before 1900.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const updateRegisterFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState: RegisterFormData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await postData("/auth/register", {
        ...registerFormData,
        role: "user",
      });
      if (response.value) {
        localStorage.setItem("token", response.value);
        navigate("/");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="authPageWrapper">
      <div className={`registerContainer ${theme}`}>
        <PulseForm
          requiredInputs={requiredInputs}
          inputValues={inputValues}
          formTitle={"Register"}
          errors={errors}
          onChange={e => updateRegisterFormData(e)}
        />

        <p>
          If you already have an account then{" "}
          <span className="loginLink" onClick={(): void => navigate("/login")}>
            visit this page
          </span>
        </p>

        <button
          className="registerButton"
          type="button"
          onClick={() => handleRegister()}>
          Register
        </button>
      </div>
    </div>
  );
};

export { Register };
