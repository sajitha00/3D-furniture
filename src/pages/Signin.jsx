// src/pages/Signin.jsx
import React from "react";
import "../styles/Signin.css";
import sketch from "../assets/images/chairsketch.png";
import render from "../assets/images/chair3d.png";
import arrow from "../assets/images/dashedarrow.png";
import logo from "../assets/LOGO.svg";

const Signin = () => {
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
              <h1 className="signin-title">Welcome to IDEAL <br/>Abode</h1>
              <div className="signup-link">
                <p>No Account?</p>
                <a href="#">Sign up</a>
              </div>
            </div>

            <form className="signin-form">
              <div className="form-group">
                <label htmlFor="email">Enter your username or email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Username or email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Enter your Password</label>
                <div className="password-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  {/* You can later add an eye icon for password show/hide if you want */}
                </div>
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
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
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
