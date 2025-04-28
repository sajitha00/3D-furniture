import React, { useState, useRef, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/LOGO.svg'


const Navbar = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="navbar">
      <div className="brand">
      <img src={logo} alt="Logo" className="logo" />
        <span className="app-name">IDEAL Abode</span>
      </div>

      <button
         className="profile-wrapper"
         onClick={() => setOpen(!open)}
         aria-haspopup="true"
         aria-expanded={open}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" viewBox="0 0 256 256">
          <path d="..." fill="white" />
        </svg>
      </button>


        {open && (
          <div className="dropdown-menu">
            <button>My Account</button>
            <button>Settings</button>
            <button>Logout</button>
          </div>
        )}
    </div> 
  )
}

export default Navbar

