import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import "./MyDesigns.css";
import sampleImg from "../../assets/images/chair3d.png";
import CanvasSetupPopup from "../../components/CanvasSetupPopup/CanvasSetupPopup";

export default function MyDesigns() {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const q = query(
        collection(db, "designs"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const loaded = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDesigns(loaded);
    };

    fetchDesigns();
  }, []);

  const handleEdit = (design) => {
    navigate("/design", { state: design }); // passes saved design to DesignPage
  };

  const handleDelete = async (designId) => {
    if (window.confirm("Delete this design?")) {
      await deleteDoc(doc(db, "designs", designId));
      setDesigns((prev) => prev.filter((d) => d.id !== designId));
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [unit, setUnit] = useState("ft");

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "ft" ? "m" : "ft"));
  };

  const handleCreate = () => {
    navigate("/design", {
      state: {
        width: Number(width),
        length: Number(length),
        unit,
      },
    });
    setIsPopupOpen(false);
    setWidth("");
    setLength("");
  };

  return (
    <div className="designs-container">
      <div className="designs-header">
        <h2>Recent Designs</h2>
        <div className="designs-controls">
          <span>Sort : Date</span>
          <span>View : Grid</span>
          <span>Select</span>
          <button className="new-button" onClick={handleOpenPopup}>
            New
          </button>
        </div>
      </div>
      <div className="designs-grid">
        {designs.map((design, index) => (
          <div className="design-card" key={design.id}>
            <input
              type="checkbox"
              checked={selected.includes(index)}
              onChange={() =>
                setSelected((prev) =>
                  prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
                )
              }
              aria-label={`Select Design ${index + 1}`}
            />
            <img src={sampleImg} alt={`Design ${index + 1}`} />
            <p className="design-name">Design {index + 1}</p>
            <div className="design-actions">
              <button onClick={() => handleEdit(design)} title="Edit">
                <img
                  src="https://img.icons8.com/material-rounded/24/FFFFFF/edit--v1.png"
                  alt="Edit"
                  width={24}
                  height={24}
                />
              </button>
              <button onClick={() => handleDelete(design.id)} title="Delete">
                <img
                  src="https://img.icons8.com/material-rounded/24/fa314a/filled-trash.png"
                  alt="Delete"
                  width={24}
                  height={24}
                  
                />
              </button>
            </div>
          </div>
        ))}
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
}
