import {reqUser, getUser, getUserInitial, setUserInitial} from "./store/userSlice";
import store from "./store";
import {fetchAllProjects, getProjects, getProjectInitial, setProjectInitial} from "./store/projectSlice";

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

export const projectLoader=async () => {
  const state=getState();
  const projects=getProjects(state);
  const isInitial=getProjectInitial(state);
  if(isInitial==true) {
    await dispatch(fetchAllProjects());
    dispatch(setProjectInitial(false));
  }
  console.log(getProjects(state));
  return projects;
};
