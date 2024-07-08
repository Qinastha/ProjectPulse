import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Auth.scss";
import {Google} from "@mui/icons-material";
import {GitHub} from "@mui/icons-material";
import {Apple} from "@mui/icons-material";

const Register: React.FC=() => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [userName, setUserName]=useState("");
  const [dateOfBirth, setDateOfBirth]=useState(new Date().toISOString());
  const [position, setPosition]=useState("");
  const [errors, setErrors]=useState<any>({});

  const navigate=useNavigate();

  useEffect((): void => {
    if(localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const validateForm=() => {
    let formIsValid=true;
    const newErrors: any={};

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      newErrors.email="Invalid email address.";
      formIsValid=false;
    }

    const passwordRegex=/^(?=.*[A-Z])(?=.*\d).{8,16}$/;
    if(!passwordRegex.test(password)) {
      newErrors.password=
        "Password must contain at least one capital letter and one number, and be at least 8 characters long.";
      formIsValid=false;
    }

    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    if (!nameRegex.test(firstName) || firstName.length === 0) {
      newErrors.firstName = "First name must start with a capital letter and contain only letters.";
      formIsValid = false;
    }
    if (!nameRegex.test(lastName) || lastName.length === 0) {
      newErrors.lastName = "Last name must start with a capital letter and contain only letters.";
      formIsValid = false;
    }

    // Username validation: length > 0, no symbols at start
    const usernameRegex = /^[^\W_](.*[^\W_])?$/;
    if (!usernameRegex.test(userName) || userName.length === 0) {
      newErrors.userName = "Username cannot start with symbols or be empty.";
      formIsValid = false;
    }

    const today=new Date();
    const selectedDate=new Date(dateOfBirth);
    if(selectedDate>today) {
      newErrors.dateOfBirth="Date of birth cannot be in the future.";
      formIsValid=false;
    }
    const minDate=new Date("1900-01-01");
    if(selectedDate<minDate) {
      newErrors.dateOfBirth="Date of birth cannot be before 1900.";
      formIsValid=false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleRegister=async (e: React.FormEvent) => {
    e.preventDefault();
    if(!validateForm()) return;
    try {
      const response=await axios.post(
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
      if(response.data?.value) {
        localStorage.setItem("token", response.data.value);
        alert("Registration successful");
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch(error) {
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
      <form onSubmit={handleRegister} autoComplete="off" noValidate>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={errors.email? "errorInput":""}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {errors.email&&<span className="errorText">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={errors.password? "errorInput":""}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {errors.password&&<span className="errorText">{errors.password}</span>}
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            className={errors.firstName? "errorInput":""}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          {errors.firstName&&<span className="errorText">{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            className={errors.lastName? "errorInput":""}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          {errors.lastName&&<span className="errorText">{errors.lastName}</span>}
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            className={errors.userName? "errorInput":""}
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />
          {errors.userName&&<span className="errorText">{errors.userName}</span>}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            className={errors.dateOfBirth? "errorInput":""}
            onChange={e => setDateOfBirth(e.target.value)}
            required
          />
          {errors.dateOfBirth&&<span className="errorText">{errors.dateOfBirth}</span>}
        </div>
        <div>
          <label>Position:</label>
          <select
            name="position"
            value={position}
            onChange={e =>
              setPosition(
                e.target.value as
                |"project manager"
                |"developer"
                |"designer"
                |"tester",
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
            <Google style={{fontSize: 40}} />
          </a>
          <a href="#">
            <GitHub style={{fontSize: 40}} />
          </a>
          <a href="#">
            <Apple style={{fontSize: 40}} />
          </a>
        </div>
      </div>
    </div>
  );
};

export {Register};
