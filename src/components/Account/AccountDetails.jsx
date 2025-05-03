import React from 'react'
import './AccountDetails.css';
import profileImg from '../../assets/images/Profile.png'; 

export default function AccountDetails() {
  return (
    <div className="account-container">
      <h1><span>Account</span> Center</h1>
      <div className="content-box">
        <div className="profile">
          <img src={profileImg} alt="User Profile" />
        </div>
        <div className="details-grid">
          <section>
            <h3>Personal Details</h3>
            <p><strong>Name:</strong> Isuru Jayawardana</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Date of Birth:</strong> January 13th, 2002</p>
            <p><strong>Nationality:</strong> Sri Lankan</p>
          </section>
          <section>
            <h3>Address</h3>
            <p><strong>Address Line:</strong> No 35 Jimmy Ebi Street</p>
            <p><strong>City:</strong> Homagama</p>
            <p><strong>Province/State:</strong> Colombo</p>
            <p><strong>Country:</strong> Sri Lanka</p>
          </section>
          <section>
            <h3>Contact Details</h3>
            <p><strong>Phone Number:</strong> +94 348 67 656</p>
            <p><strong>Email:</strong> jmir@IDEAL.com</p>
          </section>
        </div>
        <button className="edit-button">Edit</button>
      </div>
    </div>
  );
}
