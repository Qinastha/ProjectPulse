import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getCurrentWidget, setCurrentWidget } from "../../../store/widgetSlice";
import React, { useEffect } from "react";
import { PopUpProps } from "../../PopUp/PopUp";
import "./WidgetPreview.scss";
import Widget from "../Widget";
import { useTranslation } from "react-i18next";

interface WidgetPreviewProps extends PopUpProps {
  mode: "showWidget";
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  handleClosePopUp,
  mode,
}) => {
  const { t } = useTranslation();
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
      <div className="widgetPreview__container-header">
        <h2>{widget.name}</h2>
        <button
          className="widgetPreview__container-header-button"
          onClick={handleClosePopUp}>
          X
        </button>
        <h4>{widget.description}</h4>
      </div>
      <Widget widget={widget} mode={mode} />
    </div>
  );
};
