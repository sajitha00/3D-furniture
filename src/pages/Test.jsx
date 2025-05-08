import React, { useState } from "react";
import CanvasSetupPopup from "../components/CanvasSetupPopup/CanvasSetupPopup";

const Test = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  const handleOpen = () => setIsPopupOpen(true);
  const handleClose = () => setIsPopupOpen(false);

  const handleCreate = () => {
    console.log("Room dimensions:", { width, length });
    setIsPopupOpen(false); 
  };

  return (
    <div>
      <button onClick={handleOpen}>Popup Test</button>

      <CanvasSetupPopup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onCreate={handleCreate}
        width={width}
        setWidth={setWidth}
        length={length}
        setLength={setLength}
      />
    </div>
  );
};

export default Test;
