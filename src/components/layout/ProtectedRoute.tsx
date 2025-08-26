import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { JSX } from "react";

export default function ProtectedRoute({ children, role }: { children: JSX.Element; role?: string }) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}-dashboard`} replace />;

  return children;
}
