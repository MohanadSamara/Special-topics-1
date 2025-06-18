import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedOrgRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!isLoggedIn || user.role !== "Organization") {
    return <Navigate to="/login" replace />;
  }
  return children;
}