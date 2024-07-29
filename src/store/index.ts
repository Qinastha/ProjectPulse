import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import project from "./projectSlice";
import popUp from "./popUpSlice";
import alert from "./alertSlice";
import widget from "./widgetSlice";

const store = configureStore({
  reducer: {
    user,
    project,
    popUp,
    alert,
    widget,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
