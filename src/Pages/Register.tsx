import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

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
      <h2>Register a new User</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <select
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
            <option value="project manager">Project Manager</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="tester">Tester</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <button className="goToLogin" onClick={(): void => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
};

export { Register };
