// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import sketch from "../assets/images/chairsketch.png";
import render from "../assets/images/chair3d.png";
import arrow from "../assets/images/dashedarrow.png";
import logo from "../assets/LOGO.svg";

// Firebase imports
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../services/firebaseConfig"; // adjust path to where you initialize Firebase

const auth = getAuth(app);
const db = getFirestore(app);

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    contactNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, contactNumber, password } = formData;

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Optionally set the displayName on the Auth user
      await updateProfile(user, { displayName: username });

      // 3. Create a Firestore document in "profiles"
      await setDoc(doc(db, "profiles", user.uid), {
        id: user.uid,
        email,
        username,
        contactNumber,
        createdAt: new Date().toISOString(),
      });

      alert("Account created! Redirecting to sign in…");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Sign up error: " + error.message);
    }
  };

  return (
    <div className="signup-page-background">
      <div className="top-left-logo">
        <img src={logo} alt="Logo" className="logo" />
        <span className="app-name">IDEAL Abode</span>
      </div>
      <div className="signup-layout">
        <img src={sketch} alt="Sketch" className="left-image" />
        <div className="signup-card">
          <img src={arrow} alt="Arrow" className="arrow-image" />
          <div className="signup-header">
            <h1 className="signup-title">Sign up</h1>
            <div className="signin-link">
              <p>Have an Account?</p>
              <Link to="/signin">Sign in</Link>
            </div>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group half">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signup-button">
              Sign up
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            <span>or</span>
            <div className="line"></div>
          </div>

          <button type="button" className="google-button">
            {/* Google Icon Placeholder */}
            Sign up with Google
          </button>
        </div>
        <img src={render} alt="Render" className="right-image" />
      </div>
    </div>
  );
};

export default Signup;
