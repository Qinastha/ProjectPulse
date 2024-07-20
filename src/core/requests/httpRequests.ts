import axiosInstance from "../interceptors/authInterceptor";
// import {AlertProps} from "../../store/alertSlice";

// const handleAlert = (response: any, showAlert: (params: AlertProps) => void) => {
//     const {alert} = response?.alert;
//     if (alert) {
//         showAlert({
//             message: alert.message,
//             alertType: alert.alertType,
//             showUser: alert.showUser,
//         });
//     }
// };

// showAlert: (params: AlertProps) => void
export const getData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    // handleAlert(response, showAlert);
    return response.data;
  } catch (error) {
    // handleAlert(error, showAlert);
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    // handleAlert(response, showAlert);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const putData = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteData = async (url: string) => {
  try {
    await axiosInstance.delete(url);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
