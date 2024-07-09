import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import project from './projectSlice';
import data from "./dataSlice";

const store = configureStore({
  reducer: {
    user,
    project,
    data,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
