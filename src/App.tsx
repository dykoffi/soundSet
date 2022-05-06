import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import Home from "./pages/home";
import Lecture from "./pages/home/lecture";
import RequireAuth from "./pages/protected";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/lecture" element={
          <RequireAuth>
            <Lecture />
          </RequireAuth>
        } />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}
