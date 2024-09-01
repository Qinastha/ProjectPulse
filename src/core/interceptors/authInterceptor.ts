import axios, {AxiosRequestHeaders} from "axios";
import {useEffect} from "react";
import {useAppDispatch} from "../../hooks";
import {setAlert} from "../../store/alertSlice";

const axiosInstance = axios.create({
    baseURL: "https://51.21.127.157:4000/api/",
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token") || "";
        const location = config.url;

        config.headers = {
            Accept: "application/json",
        } as AxiosRequestHeaders;

        if (location !== "auth/login" && location !== "auth/register") {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            } as AxiosRequestHeaders;
        }

        return config;
    },
    error => Promise.reject(error),
);

interface AxiosInterceptorProps {
    children: any;
}

function AxiosInterceptor({children}: AxiosInterceptorProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const resInterceptor = (response: any) => {
            dispatch(setAlert(response.data.alert));
            return response;
        };

        const errInterceptor = (error: any) => {
            console.log(error);
            dispatch(setAlert(error.response.data.alert));
            return Promise.reject(error);
        };

        const interceptor = axiosInstance.interceptors.response.use(
            resInterceptor,
            errInterceptor,
        );

        return () => axiosInstance.interceptors.response.eject(interceptor);
    }, []);

    return children;
}

export default axiosInstance;

export {AxiosInterceptor};
