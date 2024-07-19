import {configureStore} from "@reduxjs/toolkit";
import user from "./userSlice";
import project from "./projectSlice";

const store = configureStore({
    reducer: {
        user,
        project,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
