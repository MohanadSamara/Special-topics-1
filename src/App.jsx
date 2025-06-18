import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import Opportunities from "./Opportunities";
import Contributions from "./Contributions";
import About from "./about us";
import SignUp from "./sign up";
import Login from "./login";
import Organization from "./Organization";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedOrgRoute from "./ProtectedOrgRoute";
import ProtectedVolunteerRoute from "./ProtectedVolunteerRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about us" element={<About />} />
        <Route path="/sign up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opportunities"
          element={
            <ProtectedRoute>
              <Opportunities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contributions"
          element={
            <ProtectedVolunteerRoute>
              <Contributions />
            </ProtectedVolunteerRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedOrgRoute>
              <Organization />
            </ProtectedOrgRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;