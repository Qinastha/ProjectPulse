import React from "react";
import { getAllWidgets, setCurrentWidget } from "../../store/widgetSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./Dashboard.scss";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import { Widget } from "../../Components";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const widgets = useAppSelector(getAllWidgets);

  const triggerPopup = (widgetId: string) => {
    console.log("triggerPop");
    console.log(widgetId);
    dispatch(setPopUpMode("showWidget"));
    dispatch(togglePopUp(true));
    dispatch(setCurrentWidget(widgetId));
  };

  return (
    <div className="dashboard">
      {widgets.map(widget => (
        <div
          key={widget._id}
          className="dashboard-item"
          onClick={() => triggerPopup(widget._id)}>
          <h2>{widget.name}</h2>
          <Widget widget={widget} />
        </div>
      ))}
    </div>
  );
};
