import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Lecture from "./pages/home/lecture";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
