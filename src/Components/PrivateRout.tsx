import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { getProfile } from "../store/projectsSlice";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const profile = localStorage.getItem("profile");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isAuthenticated && !profile) {
      navigate("/profile/create");
    }
    if (isAuthenticated && profile) {
      navigate("/");
    }
  }, [isAuthenticated, profile]);

  return isAuthenticated && profile ? children : null;
};
