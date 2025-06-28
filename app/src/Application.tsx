import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

const Application: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<p>Travel Planner</p>} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Application;
