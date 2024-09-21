import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getCurrentWidget, setCurrentWidget } from "../../../store/widgetSlice";
import React, { useEffect } from "react";
import { PopUpProps } from "../../PopUp/PopUp";
import "./WidgetPreview.scss";
import Widget from "../Widget";

interface WidgetPreviewProps extends PopUpProps {
  mode: "showWidget";
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const dispatch = useAppDispatch();
  const widget = useAppSelector(getCurrentWidget);

  // Close widget preview when the current widget is changed or when the component unmounts.
  useEffect(() => {
    return () => {
      dispatch(setCurrentWidget(null));
    };
  }, [dispatch, widget]);

  return (
    <div className="widgetPreview__container">
      <h2>{widget.name}</h2>
      <h4>{widget.description}</h4>
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
