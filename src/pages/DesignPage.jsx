// ✅ DesignPage.jsx (UPDATED WITH FLOOR COLOR & CLEANUP)

import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CirclePicker } from "react-color";
import Canvas2d from "../components/Canvas2d/Canvas2d";
import Canvas3d from "../components/Canvas3d/Canvas3d";
import logo from "../assets/LOGO.svg";
import "../styles/DesignPage.css";
import { FURNITURE_ICONS } from "../data/furnitureMetadata";

const COLOURS = [
  "#FF4136", "#FF0080", "#B10DC9", "#85144b",
  "#4154f1", "#0074D9", "#7FDBFF", "#39CCCC",
  "#3D9970", "#2ECC40", "#01FF70", "#FFDC00",
  "#FF851B", "#111111", "#AAAAAA",
];

export default function DesignPage() {
  const { state } = useLocation();
  if (!state || !state.width || !state.length) {
    return <Navigate to="/" replace />;
  }

  const { width, length, unit } = state;
  const [, setSelectedColor] = useState(null);
  const [paintTab, setPaintTab] = useState("wall");
  const [furnitures, setFurnitures] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [wallHeight, setWallHeight] = useState(2);
  const [wallColor, setWallColor] = useState("#dddddd");
  const [floorColor, setFloorColor] = useState("#eeeeee");

  const handleAddFurniture = (type, w, h, rawScale = 1) => {
    setFurnitures((f) => [
      ...f,
      {
        id: Date.now(),
        x: 1,
        y: 1,
        w,
        h,
        type,
        rotY: 0,
        rotX: 0,
        rotZ: 0,
        rawScale,
      },
    ]);
  };

  const handleDragEnd = (id, x, y, rot = null) => {
    setFurnitures((f) =>
      f.map((o) =>
        o.id === id ? { ...o, x, y, ...(rot !== null ? { rot } : {}) } : o
      )
    );
  };

  return (
    <div className="design-page">
      <header className="dp-header">
        <div className="dp-brand">
          <img src={logo} alt="Logo" />
          <span>IDEAL Abode</span>
        </div>
        <div>
          {selectedId && (
            <button
              className="dp-delete-btn"
              onClick={() => {
                setFurnitures((prev) => prev.filter((f) => f.id !== selectedId));
                setSelectedId(null);
              }}
            >
              🗑 Delete
            </button>
          )}
          <button className="dp-save-btn">Save</button>
        </div>
      </header>

      <div className="dp-body">
        <aside className="dp-sidebar">
          <section className="dp-section">
            <h3>Furniture</h3>
            <div className="dp-card-grid">
              {FURNITURE_ICONS.map(({ type, url, w, h, rawScale }) => (
                <div
                  key={type}
                  className="dp-card"
                  onClick={() => handleAddFurniture(type, w, h, rawScale)}
                >
                  <img
                    src={url}
                    alt={type}
                    className="dp-card-icon"
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>
          </section>

          {selectedId && (
            <section className="dp-section">
              <h3>Rotation</h3>
              <label>
                Rotate Y (Left/Right)
                <input
                  type="range"
                  min={-180}
                  max={180}
                  step={1}
                  value={furnitures.find(f => f.id === selectedId)?.rotY || 0}
                  onChange={(e) => {
                    const newDeg = parseFloat(e.target.value);
                    setFurnitures((prev) =>
                      prev.map((f) =>
                        f.id === selectedId ? { ...f, rotY: newDeg } : f
                      )
                    );
                  }}
                />
              </label>
            </section>
          )}

          <section className="dp-section">
            <h3>Paint</h3>
            <div className="dp-paint-tabs">
              {["wall", "floor"].map((tab) => (
                <button
                  key={tab}
                  className={paintTab === tab ? "active" : ""}
                  onClick={() => setPaintTab(tab)}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </section>

          <section className="dp-section">
            <h3>Color</h3>
            <CirclePicker
              className="dp-circle-picker"
              colors={COLOURS}
              circleSize={26}
              circleSpacing={8}
              onChangeComplete={(c) => {
                if (paintTab === "wall") setWallColor(c.hex);
                if (paintTab === "floor") setFloorColor(c.hex);
                setSelectedColor(c.hex);
              }}
            />
          </section>

          <section className="dp-section">
            <h3>Canvas Settings</h3>
            <label className="dp-toggle">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={() => setShowGrid((g) => !g)}
              />
              <span style={{ marginLeft: 6 }}>Show Grid</span>
            </label>
          </section>

          <section className="dp-section">
            <h3>Wall Height</h3>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={wallHeight}
              onChange={(e) => setWallHeight(parseFloat(e.target.value))}
            />
            <div style={{ fontSize: "0.9em", marginTop: 4 }}>
              {wallHeight} {unit}
            </div>
          </section>
        </aside>

        <main className="dp-main">
          <div className="dp-canvas2d">
            <Canvas2d
              width={width}
              length={length}
              unit={unit}
              furnitures={furnitures}
              selectedId={selectedId}
              onSelectFurniture={setSelectedId}
              onFurnitureDragEnd={handleDragEnd}
              showGrid={showGrid}
            />
          </div>
          <div className="dp-divider" />
          <div className="dp-canvas3d">
            <Canvas3d
              width={width}
              length={length}
              unit={unit}
              wallHeight={wallHeight}
              furnitures={furnitures}
              wallColor={wallColor}
              floorColor={floorColor}
            />
          </div>
        </main>
      </div>
    </div>
  );
}