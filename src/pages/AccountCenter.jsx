import React, { useState } from "react";
import Sidebar from '../components/Account/Sidebar';
import AccountDetails from '../components/Account/AccountDetails';
import MyDesigns from '../components/MyDesigns/MyDesigns';
import '../styles/AccountPage.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function AccountCenter() {
  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <div className="account-wrapper">
      <Navbar />
      <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#121212" }}>
        <div className="account-page">
          <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
          {selectedTab === "account" && <AccountDetails />}
          {selectedTab === "designs" && <MyDesigns />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
