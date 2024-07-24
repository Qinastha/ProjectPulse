import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertProps {
  message: string | null;
  alertType: "success" | "error" | "warning" | "info" | null;
  showUser: boolean;
}

const initialState: AlertProps = {
  message: null,
  alertType: null,
  showUser: false,
};

const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertProps>) => {
      return { ...state, ...action.payload };
    },
    hideAlert: state => {
      return { ...state, message: null, alertType: null, showUser: false };
    },
  },
  selectors: {
    getAlert: state => state,
  },
});

export const { setAlert, hideAlert } = alert.actions;

export const { getAlert } = alert.selectors;

export default alert.reducer;
