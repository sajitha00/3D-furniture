// src/pages/Signin.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signin.css";
import sketch from "../assets/images/chairsketch.png";
import render from "../assets/images/chair3d.png";
import arrow from "../assets/images/dashedarrow.png";
import logo from "../assets/LOGO.svg";
import { supabase } from "../services/supabaseClient";

const Signin = () => {
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = loginData;

    let email = identifier;

    if (!identifier.includes("@")) {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("username", identifier)
        .single();

      if (error || !data) {
        alert("Invalid username or email.");
        return;
      }

      email = data.email;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      alert("Sign in failed: " + signInError.message);
    } else {
      alert("Signed in successfully!");
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
              <label htmlFor="identifier">Username or email address</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                placeholder="Username or email"
                value={loginData.identifier}
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
