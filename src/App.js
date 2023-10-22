import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DistanceCalculator from "./components/DistanceCalculator";
import EntertainmentPage from "./components/EntertainmentPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DistanceCalculator />} />
        <Route path="/Entertainment" element={<EntertainmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
