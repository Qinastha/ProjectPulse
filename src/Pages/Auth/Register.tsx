import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Google } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import { Apple } from "@mui/icons-material";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString());
  const [position, setPosition] = useState("");

  const navigate = useNavigate();

  useEffect((): void => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [validations, setValidations] = useState({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    userName: true,
  });

  const validateForm = () => {
    const newValidations = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: /^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/.test(password),
      firstName: /^[a-zA-Z]{1,50}$/.test(firstName),
      lastName: /^[a-zA-Z]{1,50}$/.test(lastName),
      userName: /^[a-zA-Z0-9]{1,50}$/.test(userName),
    };
    setValidations(newValidations);
    return Object.values(newValidations).every(Boolean);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          email,
          password,
          firstName,
          lastName,
          userName,
          dateOfBirth,
          position,
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
      <h1>Register a new User</h1>
      <p>
        If you already have an account then{" "}
        <span className="loginLink" onClick={(): void => navigate("/login")}>
          visit this page
        </span>
      </p>
      <form onSubmit={handleRegister} autoComplete="off">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={!validations.email ? "errorInput" : ""}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {!validations.email && (
            <span className="errorText">
              Please enter a valid email address
            </span>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={!validations.email ? "errorInput" : ""}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {!validations.password && (
            <span className="errorText">
              Password must contain at least 1 uppercase letter, 1 number, and
              be at least 8 characters long
            </span>
          )}
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            className={!validations.email ? "errorInput" : ""}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          {!validations.firstName && (
            <span className="errorText">Please enter a valid first name</span>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            className={!validations.email ? "errorInput" : ""}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          {!validations.lastName && (
            <span className="errorText">Please enter a valid last name</span>
          )}
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            className={!validations.email ? "errorInput" : ""}
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
          {!validations.userName && (
            <span className="errorText">
              Username must contain only letters and numbers, and be 1-50
              characters long
            </span>
          )}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            min={new Date(1900, 0, 1).toISOString().split("T")[0]}
            max={new Date().toISOString().split("T")[0]}
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <select
            name="position"
            value={position}
            onChange={e =>
              setPosition(
                e.target.value as
                  | "project manager"
                  | "developer"
                  | "designer"
                  | "tester",
              )
            }
            required>
            <option value="">Select</option>
            <option value="project manager">Project Manager</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="tester">Tester</option>
          </select>
        </div>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
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
