import React from "react";
import Sidebar from '../components/Account/Sidebar';
import AccountDetails from '../components/Account/AccountDetails';
import '../styles/AccountPage.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";



export default function AccountCenter() {
    return (
      <div className="account-wrapper">
        <Navbar />
        <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#121212" }}>
          <div className="account-page">
            <Sidebar />
            <AccountDetails />
          </div>
        </div>
        <Footer />
      </div>
    );
  }