import React from 'react'
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>IDEAL Abode</h2>
      <nav>
        <button className="active">My Account</button>
        <button>My Designs</button>
        <button>My Plan</button>
      </nav>
      <button className="logout">Logout</button>
    </div>
  );
}
