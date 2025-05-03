import React from 'react';
import './Sidebar.css';

export default function Sidebar({ selectedTab, onTabChange }) {
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
        <button>My Plan</button>
      </nav>
      <button className="logout">Logout</button>
    </div>
  );
}
