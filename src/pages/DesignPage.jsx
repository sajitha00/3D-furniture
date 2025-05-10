import React, { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { CirclePicker } from "react-color";
import Canvas2d from "../components/Canvas2d/Canvas2d";
import Canvas3d from "../components/Canvas3d/Canvas3d";
import logo from "../assets/LOGO.svg";
import "../styles/DesignPage.css";
import { FURNITURE_ICONS } from "../data/furnitureMetadata";
import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const COLOURS = [
  "#FF4136", "#FF0080", "#B10DC9", "#85144b",
  "#4154f1", "#0074D9", "#7FDBFF", "#39CCCC",
  "#3D9970", "#2ECC40", "#01FF70", "#FFDC00",
  "#FF851B", "#111111", "#AAAAAA",
];

const TEXTURE_FILES = [
  "oakwood.png",
  "polishedwood.png",
  "darkbrick.png",
  "lightbrick.png",
  "wallpaper.png",
  "cement.png",
  "beigecement.png",
  "rocks.png",
  "sprucewood.png",
  "whitebricks.png",
  "checkred.png",
  "darkoak.png",
  "whitetiles.png",
  "cementpillar.png"
];


export default function DesignPage() {
  const location = useLocation();
  const designData = location.state;
  const nav = useNavigate();

  if (!designData || !designData.width || !designData.length) {
    return <Navigate to="/" replace />;
  }

  const [selectedId, setSelectedId] = useState(null);
  const [width, setWidth] = useState(designData?.width || 10);
  const [length, setLength] = useState(designData?.length || 10);
  const [unit, setUnit] = useState(designData?.unit || "m");
  const [wallHeight, setWallHeight] = useState(designData?.wallHeight || 2);
  const [wallColor, setWallColor] = useState(designData?.wallColor || "#dddddd");
  const [floorColor, setFloorColor] = useState(designData?.floorColor || "#eeeeee");
  const [furnitures, setFurnitures] = useState(designData?.furnitures || []);
  const [wallTexture, setWallTexture] = useState(null);
  const [floorTexture, setFloorTexture] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [paintTab, setPaintTab] = useState("wall");
  const [showGrid, setShowGrid] = useState(true);

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
        scaleFix: 1,
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

  const saveDesign = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.uid) {
      alert("You must be signed in to save a design.");
      return;
    }

    const designData = {
      width,
      length,
      unit,
      wallHeight,
      wallColor,
      floorColor,
      furnitures,
      createdAt: new Date().toISOString(),
      userId: user.uid,
      userEmail: user.email,
    };

    try {
      await addDoc(collection(db, "designs"), designData);
      alert("Design saved successfully!");
    } catch (err) {
      alert("Failed to save design: " + err.message);
    }
  };

  return (
    <div className="design-page">
      <header className="dp-header">
        <div className="dp-brand" onClick={() => nav("/")}>
          <img src={logo} alt="Logo" />
          <span>IDEAL Abode</span>
        </div>
        <div>
          {selectedId && (
            <button
              className="dp-delete-btn"
              onClick={() => {
                setFurnitures((prev) =>
                  prev.filter((f) => f.id !== selectedId)
                );
                setSelectedId(null);
              }}
            >
              🗑 Delete
            </button>
          )}
          <button className="dp-save-btn" onClick={saveDesign}>
            Save
          </button>
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
                  <img src={url} alt={type} className="dp-card-icon" width={32} height={32} />
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
                  value={furnitures.find((f) => f.id === selectedId)?.rotY || 0}
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

          {selectedId && (
            <section className="dp-section">
              <h3>Scale</h3>
              <label>
                Resize (0.5× to 2×)
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.01}
                  value={furnitures.find((f) => f.id === selectedId)?.scaleFix || 1}
                  onChange={(e) => {
                    const newScale = parseFloat(e.target.value);
                    setFurnitures((prev) =>
                      prev.map((f) =>
                        f.id === selectedId ? { ...f, scaleFix: newScale } : f
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
                if (paintTab === "wall") {
                  setWallColor(c.hex);
                  setWallTexture(null); 
                }
                if (paintTab === "floor") {
                  setFloorColor(c.hex);
                  setFloorTexture(null); 
                }
                setSelectedColor(c.hex);
              }}

            />
          </section>

          <section className="dp-section">
            <h3>Textures</h3>
            <div className="dp-texture-grid">
              {TEXTURE_FILES.map((file) => (
                <img
                  key={file}
                  src={`/textures/${file}`}
                  alt={file}
                  className="dp-texture-thumb"
                  onClick={() => {
                    if (paintTab === "wall") setWallTexture(`/textures/${file}`);
                    if (paintTab === "floor") setFloorTexture(`/textures/${file}`);
                  }}
                />
              ))}
            </div>
            <button
              className="dp-clear-texture-btn"
              onClick={() => {
                if (paintTab === "wall") setWallTexture(null);
                if (paintTab === "floor") setFloorTexture(null);
              }}
            >
              Clear Texture
            </button>
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
              wallTexture={wallTexture}
              floorTexture={floorTexture}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
