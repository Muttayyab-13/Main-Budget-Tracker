import React from "react";
import "../SignIn/SignIn.css";
import Logo from "./images/mainpic.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../Components/ContainedButtons.js";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailUser = userData.Email;
    return emailUser === email;
  };

  const validatePassword = (password) => {
    const passwordUser = userData.Password;
    return passwordUser === password;
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      // console.log(userData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailIsValid = validateEmail(formData.Email);
    const passwordIsValid = validatePassword(formData.Password);

    if (!emailIsValid || !passwordIsValid) {
      setErrors({
        Email: !emailIsValid ? "Invalid email address." : "",
        Password: !passwordIsValid ? "Incorrect Password." : "",
      });
      return;
    }

    navigate("/MainPage");

    console.log(formData);

    setFormData({
      Email: "",
      Password: "",
    });
    setErrors({});
  };

  return (
    <div className="body">
      <div className="frame">
        <div className="pic-container">
          <h2>Are you enjoying your journey with us !</h2>
          <img src={Logo} alt="main-picture" />
        </div>
        <div className="form">
          <div className="header">
            <h2>SignIn</h2>
            <Link to="/">
              <h4 className="newAccount">
                Do not have an account ! Create One
              </h4>
            </Link>
          </div>
          <div className="input">
            <input
              type="email"
              placeholder="Email*"
              name="Email"
              onChange={handleChange}
              value={formData.Email}
            />
            {errors.Email && <span className="error">{errors.Email}</span>}
            <input
              type="password"
              placeholder="Password*"
              name="Password"
              onChange={handleChange}
              value={formData.Password}
            />
            {errors.Password && (
              <span className="error">{errors.Password}</span>
            )}
          </div>
          <div className="Login ">
            <div>
              <Button Name="LogIn" onClick={handleSubmit} />
            </div>
            <div className="forgot-pw">Forgot Password ? </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
