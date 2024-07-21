import {useAppDispatch} from "../../hooks";
import {AlertProps, setAlert} from "../../store/alertSlice";

export const useAlert = () => {
    const dispatch = useAppDispatch();

    const showAlert = (alert: AlertProps) => {
        dispatch(setAlert(alert));
    };

    return {showAlert};
};