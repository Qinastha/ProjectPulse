import { configureStore } from "@reduxjs/toolkit";
import user from "./projectsSlice";

const store = configureStore({
  reducer: {
    user,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
