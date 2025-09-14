import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);

  // Check context or fallback to localStorage
  const effectiveToken = token || localStorage.getItem("token");

  if (!effectiveToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
