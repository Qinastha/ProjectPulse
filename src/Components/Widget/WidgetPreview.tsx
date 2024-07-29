import { Widget } from "./Widget";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCurrentWidget, setCurrentWidget } from "../../store/widgetSlice";
import React, { useEffect } from "react";
import { PopUpProps } from "../PopUp/PopUp";
import "./WidgetPreview.scss";

export interface WidgetPreviewProps extends PopUpProps {
  mode: "showWidget";
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const widget = useAppSelector(getCurrentWidget);

  useEffect(() => {
    return () => {
      dispatch(setCurrentWidget(null));
    };
  }, [dispatch, widget]);

  return (
    <div className="widgetPreview__container">
      <h2>{widget.name}</h2>
      <Widget widget={widget} mode={mode} />
      <div className="widgetPreview__container--actions">
        <button
          className="widgetPreview__container--actions--button"
          onClick={handleClosePopUp}>
          Close
        </button>
      </div>
    </div>
  );
};
