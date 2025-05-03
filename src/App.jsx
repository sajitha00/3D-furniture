import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes> */}
      <Signup />
      <Signin />
    </BrowserRouter>
  );
}

export default App;
