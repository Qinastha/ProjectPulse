import { reqUsers, getUser, getIsInitial } from "./store/userSlice";
import store from "./store";

export const userLoader = async () => {
  const { dispatch, getState } = store;
  const state = getState();
  const isInitial = getIsInitial(state);

  if (isInitial == true) {
    await dispatch(reqUsers());
    dispatch({ type: "user/setIsInitial", payload: false });
  }

  console.log(getUser(state));
  const user = getUser(state);
  return user;
};

// if(state.user.isInitial===true) {
//   await dispatch(reqUsers());
//   state.user.isInitial=false;
// }
