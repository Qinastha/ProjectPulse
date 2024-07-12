import {reqUser, getUser, getUserInitial, setUserInitial} from "./store/userSlice";
import store from "./store";
import { fetchAllMembers, getAllMembers } from "./store/projectSlice";

const {dispatch, getState}=store;

export const userLoader=async () => {
  const state=getState();
  const user=getUser(state);
  const isInitial=getUserInitial(state);

  if(isInitial) {
    await dispatch(reqUser());
    dispatch(setUserInitial(false));
  }

  console.log(getUser(state));
  return user;
};

export const membersLoader = async () => {
  const state = getState();
  const allMembers = getAllMembers(state);

  if(!allMembers) {
    await dispatch(fetchAllMembers());
  }
  console.log(getAllMembers(state));
  return allMembers;
}