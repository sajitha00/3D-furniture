import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
