import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import Home from "./pages/home";
import Lecture from "./pages/home/lecture";
import RequireAuth from "./pages/protected";
import Authentication from "./pages/Login";
import Signup from "./pages/SignUp";
import NothingFoundBackground from "./pages/NotFound";
import Participants from "./pages/Participants";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<Authentication />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/lecture" element={
          <RequireAuth>
            <Lecture />
          </RequireAuth>
        } />
        <Route path="*" element={<NothingFoundBackground />} />
      </Routes>
    </Router>
  );
}
