import React, { useState } from 'react';
import './MyDesigns.css';
import sampleImg from '../../assets/images/chair3d.png';

export default function MyDesigns() {
  const [selected, setSelected] = useState([]);
  const designs = Array.from({ length: 12 }, (_, i) => `Design 0${(i % 9) + 1}`);

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="designs-container">
      <div className="designs-header">
        <h2>Recent Designs</h2>
        <div className="designs-controls">
          <span>Sort : Date</span>
          <span>View : Grid</span>
          <span>Select</span>
          <button className="new-button">New</button>
        </div>
      </div>
      <div className="designs-grid">
        {designs.map((name, index) => (
          <div className="design-card" key={index}>
            <input
              type="checkbox"
              checked={selected.includes(index)}
              onChange={() => handleSelect(index)}
              aria-label={`Select ${name}`}
            />
            <img src={sampleImg} alt={`Design ${index}`} />
            <p className="design-name">{name}</p>
            <span className="edit-icon" aria-label="Edit design" role="button">✏️</span>
          </div>
        ))}
      </div>
    </div>
  );
}