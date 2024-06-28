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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
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
