// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";   // ← your existing config
import useAuth from "../../hooks/useAuth";              // default import
import "./Sidebar.css";

export default function Sidebar({ selectedTab, onTabChange }) {
  const navigate = useNavigate();
  const { user } = useAuth();        // if you ever want to show user info

  /* ------------------------------------------------------------------ */
  /*  Handle logout                                                     */
  /* ------------------------------------------------------------------ */
  const handleLogout = async () => {
    try {
      await signOut(auth);                 // 1) tell Firebase
      localStorage.removeItem("user");     // 2) clean cached copy (optional)
      navigate("/", { replace: true });  // 3) send them to login
    } catch (err) {
      console.error("Sign‑out failed", err);
      alert("Could not sign out, please try again");
    }
  };

  return (
    <div className="sidebar">
      <h2>IDEAL Abode</h2>

      <nav>
        <button
          className={selectedTab === "account" ? "active" : ""}
          onClick={() => onTabChange("account")}
        >
          My Account
        </button>

        <button
          className={selectedTab === "designs" ? "active" : ""}
          onClick={() => onTabChange("designs")}
        >
          My Designs
        </button>

        <button
          className={selectedTab === "plan" ? "active" : ""}
          onClick={() => onTabChange("plan")}
        >
          My Plan
        </button>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
