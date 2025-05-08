import React from "react";
import PropTypes from "prop-types";
import "./CanvasSetupPopup.css";

const CanvasSetupPopup = ({
  isOpen,
  onClose,
  onCreate,
  width,
  setWidth,
  length,
  setLength,
  unit,
  toggleUnit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">Setup 2D Canvas</h2>
        <p className="popup-subtext">( ! ) On by default</p>

        <div className="popup-input-group">
          <div className="input-block">
            <label htmlFor="room-width">Room Width</label>
            <input
              id="room-width"
              type="number"
              min="0"
              step="0.01"
              placeholder={unit}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="room-length">Room Length</label>
            <input
              id="room-length"
              type="number"
              min="0"
              step="0.01"
              placeholder={unit}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <div className="unit-toggle-block">
          <div className="unit-label">Measurement Unit</div>
          <div className="toggle-button-cover">
            <div className="button" id="button-3">
              <input
                type="checkbox"
                className="checkbox"
                onChange={toggleUnit}
                checked={unit === "m"}
              />
              <div className="knobs">{unit}</div>
              <div className="layer"></div>
            </div>
          </div>
        </div>

        <button className="popup-button" onClick={onCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

CanvasSetupPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setWidth: PropTypes.func.isRequired,
  length: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setLength: PropTypes.func.isRequired,
  unit: PropTypes.string.isRequired,
  toggleUnit: PropTypes.func.isRequired,
};

export default CanvasSetupPopup;
