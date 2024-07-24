import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks";
import { getAlert, hideAlert } from "../../../store/alertSlice";
import "./Alert.scss";

export const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { message, alertType, showUser } = useAppSelector(getAlert);

  useEffect(() => {
    if (showUser) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showUser, dispatch]);

  return (
    <>
      {showUser && (
        <div
          className={`alert alert-${alertType} ${showUser ? "alert-show" : "alert-hide"}`}>
          {message}
        </div>
      )}
    </>
  );
};
