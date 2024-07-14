import {reqUser, getUser, getUserInitial, setUserInitial} from "./store/userSlice";
import store from "./store";
import { fetchAllMembers, getAllMembers, getIsInitialProject, setIsInitialProject } from "./store/projectSlice";

const {dispatch, getState}=store;

const userLoader=async () => {
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

const membersLoader = async () => {
  const state = getState();
  const allMembers = getAllMembers(state);
  const isInitial = getIsInitialProject(state);

  if(isInitial) {
    await dispatch(fetchAllMembers());
    dispatch(setIsInitialProject(false));
  }
  console.log(getAllMembers(state));
  return allMembers;
}

export const userDataloader = async () => {
  const [user, members] = await Promise.all([
    userLoader(),
    membersLoader(),
  ]);
  return { user, members };
}