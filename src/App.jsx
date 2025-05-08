import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AccountCenter from "./pages/AccountCenter";
import Test from "./pages/Test";
import DesignPage from "./pages/DesignPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<AccountCenter />} />
        <Route path="/test" element={<Test />} />
        <Route path="/design" element={<DesignPage />} />
      </Routes>
      <AccountCenter />
      <Signup />
    </BrowserRouter>
  );
}

export default App;
