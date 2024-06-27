import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { getProfile } from "../store/projectsSlice";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  let isAuthenticated = localStorage.getItem("token");
  const profile = useAppSelector(getProfile);

    useEffect(() => {
        if(!isAuthenticated) {
            navigate("/login");
        }
        if(isAuthenticated&&!profile) {
            navigate("/profile/create");
        }
        else {
            navigate("/");
        }

    }, [isAuthenticated, profile]);

  return isAuthenticated && profile ? children : null;
};
