import React, { useState } from "react";
import "../styles/Home.css";
import { roomsketch, roomrender, dashedarrow2, Monitor, Globe, Edit } from "../assets/images/assets";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CanvasSetupPopup from "../components/CanvasSetupPopup/CanvasSetupPopup";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [unit, setUnit] = useState("ft");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "ft" ? "m" : "ft"));
  };

  const handleCreate = () => {
    if (!user) {
      navigate("/signin", { replace: true, state: { from: "/" } });
      return;
    }

    // signed‑in → go to design page
    navigate("/design", {
      state: { width: Number(width), length: Number(length), unit },
    });

     setWidth("");
     setLength("");
     setIsPopupOpen(false);
   };


  return (
    <div className="home-page">
      <div className="home-container">
        <section className="hero-section">
          <Navbar />
          <div className="hero-content">
            <h2>Get started with your</h2>
            <h1>IDEAL Interior Design</h1>
            <p>Sketch your space in 2D. See it come to life in 3D.</p>

            <div className="features-tags">
              <span className="feature-tag"><span className="dot"></span>Realtime</span>
              <span className="feature-tag"><span className="dot"></span>Web Based</span>
              <span className="feature-tag"><span className="dot"></span>Editable</span>
            </div>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={handleOpenPopup}></button>
              <button className="btn secondary-btn">Learn more</button>
            </div>
          </div>
        </section>

        {/* Sketch Section */}
        <section className="sketch-section">
          <div className="sketch-content">
            <div className="sketch-image-container">
              <h2>Your Sketch</h2>
              <div className="dotted-line"></div>
              <img src={roomsketch} alt="2D Sketch" className="sketch-image" />
            </div>

            <div className="sketch-description">
              <h3>Sketch in a 2D canvas and save changes</h3>
              <button className="btn outline-btn">GO to 2D canvas</button>
            </div>
          </div>

          <div className="arrow-path">
            <img src={dashedarrow2} alt="Arrow" className="arrow-image" />
          </div>
        </section>

        {/* 3D View Section */}
        <section className="rendered-view-section">
          <div className="rendered-view-content">
            <div className="rendered-view-description">
              <h2>View in the 3D rendered version to visualize your IDEAL interior</h2>
            </div>

            <div className="rendered-view-image-container">
              <h2 className="rendered-view-title">3D Rendered View</h2>
              <div className="dotted-line"></div>
              <img src={roomrender} alt="3D Rendered View" className="rendered-view-image" />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <h1>Why Choose Us</h1>
          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon"><img src={Monitor} alt="Monitor Icon" /></div>
              <h3>Realtime Visualization</h3>
              <p>Instantly view your designs in 3D as you sketch in 2D.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><img src={Globe} alt="Web Icon" /></div>
              <h3>Web Based</h3>
              <p>Access your interior designs from any device, anytime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><img src={Edit} alt="Edit Icon" /></div>
              <h3>Editable</h3>
              <p>Easily adjust your 2D sketches and see them reflected in 3D instantly.</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <CanvasSetupPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onCreate={handleCreate}
        width={width}
        setWidth={setWidth}
        length={length}
        setLength={setLength}
        unit={unit}
        toggleUnit={toggleUnit}
      />
    </div>
  );
};

export default Home;
