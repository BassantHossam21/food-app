import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, allowedRoles }) {
  let { logindData } = useContext(AuthContext);

  // Check if user is logged in
  if (!localStorage.getItem("token") && !logindData) {
    return <Navigate to="/" />;
  }

  // If allowedRoles is provided, check user's role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(logindData?.userGroup)) {
      toast.error(
        "Access Denied - You don't have permission to access this page"
      );
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
