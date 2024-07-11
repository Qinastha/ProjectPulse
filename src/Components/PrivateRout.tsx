import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { getProfile } from "../store/userSlice";
import { ReactElement, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const profile = useAppSelector(getProfile);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isAuthenticated && !profile) {
      navigate("/profile/create");
    }
    // if (isAuthenticated && profile) {
    //   navigate("/");
    // }
  }, [isAuthenticated, profile]);

  return isAuthenticated && profile ? children : null;
};
