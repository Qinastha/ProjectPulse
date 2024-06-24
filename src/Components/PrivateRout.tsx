import {useNavigate} from "react-router-dom";
import { useAppSelector } from "../hooks";
import { getProfile } from "../store/projectsSlice";

interface PrivateRouteProps {
    redirectTo: any;
    children: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps>=({children}) => {
    const navigate = useNavigate();
    let isAuthenticated = localStorage.getItem("token");
    const profile = useAppSelector(getProfile)
    console.log(!!profile)
    return !isAuthenticated ? navigate("/login") : !!profile ? navigate("/profile/create") : children ;
}