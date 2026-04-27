import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export function AdminRoute({ children }) {
  const { isAuthenticated, ready } = useAdminAuth();

  if (!ready) {
    return <div className="admin-loading-screen">Loading admin workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/admin/login" />;
  }

  return children;
}

