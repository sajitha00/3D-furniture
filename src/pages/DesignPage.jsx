import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CirclePicker } from "react-color";
import Canvas2d from "../components/Canvas2d/Canvas2d";
import Canvas3d from "../components/Canvas3d/Canvas3d";
import logo from "../assets/LOGO.svg";
import "../styles/DesignPage.css";

const COLOURS = [
  "#FF4136",
  "#FF0080",
  "#B10DC9",
  "#85144b",
  "#4154f1",
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#111111",
  "#AAAAAA",
];

const FURNITURE_ICONS = [
  {
    type: "chair",
    url: "https://img.icons8.com/ios/32/chair.png",
    w: 1,
    h: 1,
    scaleFix: 0.012,
    yFix: 0, // or tweak later if model floats
    rotFix: 0,
  },
  {
    type: "couch",
    url: "https://img.icons8.com/ios-filled/32/sofa.png",
    w: 2,
    h: 1,
    scaleFix: 0.007,
    yFix: 0,
    rotFix: -Math.PI / 2,
  },
  {
    type: "beddouble",
    url: "https://img.icons8.com/ios-filled/50/double-bed.png",
    w: 2,
    h: 1.5,
    scaleFix: 0.01,
    yFix: 0,
    rotFix: 0,
  },
];


export default function DesignPage() {
  const { state } = useLocation();
  if (!state || !state.width || !state.length) {
    return <Navigate to="/" replace />;
  }
  const { width, length, unit } = state;

  // paint & colour
  const [, setSelectedColor] = useState(null);
  const [paintTab, setPaintTab] = useState("wall");

  // furniture list
  const [furnitures, setFurnitures] = useState([]);
  // which one is selected
  const [selectedId, setSelectedId] = useState(null);

  const handleAddFurniture = (type, w, h, rawScale) => {
    setFurnitures((f) => [
      ...f,
      { id: Date.now(), x: 10, y: 10, w, h, type, rot: 0, rawScale },
    ]);
  };

  const handleDragEnd = (id, x, y, rot = null) => {
    setFurnitures((f) =>
      f.map((o) =>
        o.id === id ? { ...o, x, y, ...(rot !== null ? { rot } : {}) } : o
      )
    );
  };

  // rotate +90°
  const rotateSelected = () => {
    if (!selectedId) return;
    const f = furnitures.find((o) => o.id === selectedId);
    handleDragEnd(selectedId, f.x, f.y, (f.rot + Math.PI / 2) % (2 * Math.PI));
  };

  const [showGrid, setShowGrid] = useState(true);
  const [wallHeight, setWallHeight] = useState(2);

  return (
    <div className="design-page">
      <header className="dp-header">
        <div className="dp-brand">
          <img src={logo} alt="Logo" />
          <span>IDEAL Abode</span>
        </div>
        <div>
          <button onClick={rotateSelected} disabled={!selectedId}>
            Rotate ↻
          </button>
          <button className="dp-save-btn">Save</button>
        </div>
      </header>

      <div className="dp-body">
        <aside className="dp-sidebar">
          {/* Furniture Section */}
          <section className="dp-section">
            <h3>Furniture</h3>
            <div className="dp-card-grid">
              {FURNITURE_ICONS.map(({ type, url, w, h }) => (
                <div
                  key={type}
                  className="dp-card"
                  onClick={() => handleAddFurniture(type, w, h)}
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

          {/* Paint Section */}
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
            <div className="dp-card-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="dp-card placeholder" />
              ))}
            </div>
          </section>

          {/* Color Section */}
          <section className="dp-section">
            <h3>Color</h3>
            <CirclePicker
              className="dp-circle-picker"
              colors={COLOURS}
              circleSize={26}
              circleSpacing={8}
              onChangeComplete={(c) => setSelectedColor(c.hex)}
            />
          </section>

          {/* Canvas Settings */}
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

          {/* Wall Height */}
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
            />
          </div>
        </main>
      </div>
    </div>
  );
}
