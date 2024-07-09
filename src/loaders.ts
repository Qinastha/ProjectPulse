import {reqUser, getUser, getUserInitial} from "./store/userSlice";
import store from "./store";
import {fetchAllProjects, getProjects, getProjectInitial} from "./store/projectSlice";

const {dispatch, getState}=store;
const state=getState();

export const userLoader=async () => {
  const user=getUser(state);
  const isInitial=getUserInitial(state);

  if(isInitial==true) {
    await dispatch(reqUser());
    dispatch({type: "user/setUserInitial", payload: false});
  }

  console.log(getUser(state));
  return user;
};

export const projectLoader=async () => {
  const projects=getProjects(state);
  const isInitial=getProjectInitial(state);
  if(isInitial==true) {
    await dispatch(fetchAllProjects());
    dispatch({type: "project/setProjectInitial", payload: false});
  }
  console.log(getProjects(state));
  return projects;
};
