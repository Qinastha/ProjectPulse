import axios, {AxiosRequestHeaders} from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/",
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || '';

        config.headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;

        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosInstance