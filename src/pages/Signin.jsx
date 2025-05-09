// src/pages/Signin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signin.css";
import sketch from "../assets/images/chairsketch.png";
import render from "../assets/images/chair3d.png";
import arrow from "../assets/images/dashedarrow.png";
import logo from "../assets/LOGO.svg";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig"; // your Firebase config

const Signin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL || "", // If profile image is set
      }));
  
      alert("Signed in successfully!");
      navigate("/");
    } catch (error) {
      alert("Sign in failed: " + error.message);
    }
  };
  
  

  return (
    <div className="signin-page-background">
      <div className="top-left-logo">
        <img src={logo} alt="Logo" className="logo" />
        <span className="app-name">IDEAL Abode</span>
      </div>
      <div className="signin-layout">
        <img src={sketch} alt="Sketch" className="left-image" />
        <div className="signin-card">
          <img src={arrow} alt="Arrow" className="arrow-image" />
          <div className="signin-header">
            <h1 className="signin-title">
              Welcome to IDEAL <br />
              Abode
            </h1>
            <div className="signup-link">
              <p>No Account?</p>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <div className="forgot-password">
                <a href="#">Forgot Password</a>
              </div>
            </div>

            <button type="submit" className="signin-button">
              Sign in
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            <span>Or</span>
            <div className="line"></div>
          </div>

          <button type="button" className="google-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path fill="#FFC107" d="..." />
              <path fill="#FF3D00" d="..." />
              <path fill="#4CAF50" d="..." />
              <path fill="#1976D2" d="..." />
            </svg>
            Sign in with Google
          </button>
        </div>
        <img src={render} alt="Render" className="right-image" />
      </div>
    </div>
  );
};

export default Signin;
