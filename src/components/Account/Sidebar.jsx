// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";   
import useAuth from "../../hooks/useAuth";              
import "./Sidebar.css";

export default function Sidebar({ selectedTab, onTabChange }) {
  const navigate = useNavigate();
  const { user } = useAuth();        

  /* ------------------------------------------------------------------ */
  /*  Handle logout                                                     */
  /* ------------------------------------------------------------------ */
  const handleLogout = async () => {
    try {
      await signOut(auth);                 
      localStorage.removeItem("user");     
      navigate("/", { replace: true });  
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
