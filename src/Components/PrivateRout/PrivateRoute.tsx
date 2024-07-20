import { useNavigate } from "react-router-dom";

import React, { ReactElement, useEffect } from "react";
import { getProfile } from "../../store/userSlice";
import { useAppSelector } from "../../hooks";

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const profile = useAppSelector(getProfile);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isAuthenticated && !profile) {
      navigate("/profile/create");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, profile]);

  return isAuthenticated && profile ? children : null;
};
