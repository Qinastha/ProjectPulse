import {reqUser, getUser, getUserInitial, setUserInitial} from "./store/userSlice";
import store from "./store";

const {dispatch, getState}=store;

export const userLoader=async () => {
  const state=getState();
  const user=getUser(state);
  const isInitial=getUserInitial(state);

  if(isInitial==true) {
    await dispatch(reqUser());
    dispatch(setUserInitial(false));
  }

  console.log(getUser(state));
  return user;
};
