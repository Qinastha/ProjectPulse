import React, { lazy, Suspense, useEffect } from "react";
import {
  fetchAllWidgets,
  getAllWidgets,
  setCurrentWidget,
} from "../../store/widgetSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./Dashboard.scss";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import { FallbackLoader } from "../../Components";
import { getUserWidgets } from "../../store/userSlice";
import { IWidget } from "../../core/interfaces/IWidget";

const Widget = lazy(() => import("../../Components/Widget/Widget"));

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const userWidgets = useAppSelector(getUserWidgets)!;
  const widgets = useAppSelector(getAllWidgets);

  useEffect(() => {
    const fetchData = {
      widgetRoutes: userWidgets,
      projectId: "66a9298bdd6e278bc9992e40",
    };
    dispatch(fetchAllWidgets(fetchData));
  }, []);

  const triggerPopup = (widgetId: string) => {
    dispatch(setPopUpMode("showWidget"));
    dispatch(togglePopUp(true));
    dispatch(setCurrentWidget(widgetId));
  };

  return (
    <div className="dashboard">
      {widgets.map((widget: IWidget, index: number) => (
        <div
          key={index}
          className="dashboard-item"
          onClick={() => triggerPopup(widget.name)}>
          <h2>{widget.name}</h2>
          <Suspense fallback={<FallbackLoader />}>
            <Widget widget={widget} />
          </Suspense>
        </div>
      ))}
    </div>
  );
};
