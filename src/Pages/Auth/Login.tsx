import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Google } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import { Apple } from "@mui/icons-material";
import { useAppSelector } from "../../hooks";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
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
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>
          Or if you dont have an account then you can{" "}
          <span
            className="registerLink"
            onClick={(): void => navigate("/register")}>
            move to registration page
          </span>
        </p>
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
        <button className="loginButton" type="submit">
          Login
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

export { Login };
