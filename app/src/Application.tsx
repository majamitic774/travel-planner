import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<p>Travel Planner</p>} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
