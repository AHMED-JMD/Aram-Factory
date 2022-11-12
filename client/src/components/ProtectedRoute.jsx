import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let status = localStorage.getItem("token");

  if (!status) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  };

  export default ProtectedRoute;