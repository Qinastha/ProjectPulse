import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import { Apple, GitHub, Google } from "@mui/icons-material";
import { PulseForm } from "../../Components";
import { REGISTER_REQUIRED_INPUTS, RegisterFormData } from "../../core";

const Register: React.FC = () => {
  const navigate = useNavigate();
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
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          email: registerFormData.email,
          password: registerFormData.password,
          firstName: registerFormData.firstName,
          lastName: registerFormData.lastName,
          userName: registerFormData.userName,
          dateOfBirth: registerFormData.dateOfBirth,
          position: registerFormData.position,
          role: "user",
        },
      );
      console.log(response);
      if (response.data?.value) {
        localStorage.setItem("token", response.data.value);
        alert("Registration successful");
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="registerContainer">
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

      <div className="authSocialButtons">
        <span className="orText">or</span>
        <div className="socialIcons">
          <a href="#">
            <Google style={{ fontSize: 40 }} />
          </a>
          <a href="#">
            <GitHub style={{ fontSize: 40 }} />
          </a>
          <a href="#">
            <Apple style={{ fontSize: 40 }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export { Register };

//   <h1>Register a new User</h1>

//   <form onSubmit={handleRegister} autoComplete="off" noValidate>
//     <div>
//       <label>Email:</label>
//       <input
//         type="email"
//         name="email"
//         className={errors.email ? "errorInput" : ""}
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         required
//       />
//       {errors.email && <span className="errorText">{errors.email}</span>}
//     </div>
//     <div>
//       <label>Password:</label>
//       <input
//         type="password"
//         name="password"
//         className={errors.password ? "errorInput" : ""}
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         required
//       />
//       {errors.password && (
//         <span className="errorText">{errors.password}</span>
//       )}
//     </div>
//     <div>
//       <label>First Name:</label>
//       <input
//         type="text"
//         name="firstName"
//         className={errors.firstName ? "errorInput" : ""}
//         value={firstName}
//         onChange={e => setFirstName(e.target.value)}
//         required
//       />
//       {errors.firstName && (
//         <span className="errorText">{errors.firstName}</span>
//       )}
//     </div>
//     <div>
//       <label>Last Name:</label>
//       <input
//         type="text"
//         name="lastName"
//         className={errors.lastName ? "errorInput" : ""}
//         value={lastName}
//         onChange={e => setLastName(e.target.value)}
//         required
//       />
//       {errors.lastName && (
//         <span className="errorText">{errors.lastName}</span>
//       )}
//     </div>
//     <div>
//       <label>Username:</label>
//       <input
//         type="text"
//         name="userName"
//         className={errors.userName ? "errorInput" : ""}
//         value={userName}
//         onChange={e => setUserName(e.target.value)}
//         required
//       />
//       {errors.userName && (
//         <span className="errorText">{errors.userName}</span>
//       )}
//     </div>
//     <div>
//       <label>Date of Birth:</label>
//       <input
//         type="date"
//         name="dateOfBirth"
//         className={errors.dateOfBirth ? "errorInput" : ""}
//         onChange={e => setDateOfBirth(e.target.value)}
//         required
//       />
//       {errors.dateOfBirth && (
//         <span className="errorText">{errors.dateOfBirth}</span>
//       )}
//     </div>
//     <div>
//       <label>Position:</label>
//       <select
//         name="position"
//         value={position}
//         onChange={e =>
//           setPosition(
//             e.target.value as
//               | "project manager"
//               | "developer"
//               | "designer"
//               | "tester",
//           )
//         }
//         required>
//         <option value="">Select</option>
//         <option value="project manager">Project Manager</option>
//         <option value="developer">Developer</option>
//         <option value="designer">Designer</option>
//         <option value="tester">Tester</option>
//       </select>
//     </div>

// </div>
