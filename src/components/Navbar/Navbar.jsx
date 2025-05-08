import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/LOGO.svg'
import { useNavigate } from 'react-router-dom';
import  useAuth  from '../../hooks/useAuth';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef      = useRef(null);
  const nav              = useNavigate();
  const { user, loading } = useAuth();     // <- signed‑in user (null if not)

  /* ───────── close dropdown when clicking outside ───────── */
  useEffect(() => {
    const outside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  /* ───────── helpers ───────── */
  const go = (pathIfAuth) => {
    setOpen(false);               // close dropdown
    if (loading) return;          // still checking auth – do nothing
    if (!user) {
      nav("/signin", { replace: true, state: { from: pathIfAuth } });
    } else {
      nav(pathIfAuth);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* brand */}
        <div className="navbar-logo" onClick={() => nav("/")}>
          <img src={logo} alt="IDEAL Abode Logo" className="logo-image" />
          <span className="logo-text">IDEAL Abode</span>
        </div>

        {/* profile / dropdown */}
        <div className="navbar-profile" ref={dropdownRef}>
          <button className="profile-icon" onClick={() => setOpen(!open)}>
            {/* (same SVG icon as before) */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="currentColor" className="user-icon">
              <path fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd" />
            </svg>
          </button>

          {open && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => go("/account")}>My Account</li>
                <li onClick={() => go("/account")}>My Projects</li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;