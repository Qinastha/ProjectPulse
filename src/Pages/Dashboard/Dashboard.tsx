import React, {lazy, Suspense, useEffect} from "react";
import {fetchAllWidgets, getAllWidgets, setCurrentWidget,} from "../../store/widgetSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import "./Dashboard.scss";
import {setPopUpMode, togglePopUp} from "../../store/popUpSlice";
import {getUserWidgets} from "../../store/userSlice";
import {IWidget} from "../../core/interfaces/IWidget";
import {FallbackLoader} from "../../core";

const Widget = lazy(() => import("../../Components/Widget/Widget"));

export const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const userWidgets = useAppSelector(getUserWidgets)!;
    const widgets = useAppSelector(getAllWidgets);


    useEffect(() => {
        const fetchData = {
            widgetRoutes: userWidgets,
            projectId: "66bf647703fd492812fa9458",
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
                    <Suspense fallback={<FallbackLoader/>}>
                        <Widget widget={widget}/>
                    </Suspense>
                </div>
            ))}
        </div>
    );
};
