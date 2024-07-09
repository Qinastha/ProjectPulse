import { reqUser, getUser, getIsInitial } from "./store/userSlice";
import store from "./store";

export const userLoader = async () => {
  const { dispatch, getState } = store;
  const state = getState();
  const user = getUser(state);
  const isInitial = getIsInitial(state);

  if (isInitial == true) {
    await dispatch(reqUser());
    dispatch({ type: "user/setIsInitial", payload: false });
  }

  console.log(getUser(state));
  return user;
};

