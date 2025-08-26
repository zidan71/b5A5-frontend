/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useApp";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[]; // allowed roles, e.g. ["admin"]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const auth = useAppSelector((state: any) => state.auth);

  // Not logged in → redirect
  if (!auth?.token || !auth?.user) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed → redirect home
  if (roles && !roles.includes(auth.user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
