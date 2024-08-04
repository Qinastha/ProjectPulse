import {
  fetchAllUsers,
  getAllUsers,
  getUser,
  getUserInitial,
  reqUser,
  setUserInitial,
} from "./store/userSlice";
import store from "./store";
import { fetchProjectById, getCurrentProject } from "./store/projectSlice";

const { dispatch, getState } = store;

const userLoader = async () => {
  const state = getState();
  const user = getUser(state);
  const isInitial = getUserInitial(state);

  if (isInitial) {
    await dispatch(reqUser());
    dispatch(setUserInitial(false));
  }

  return user;
};

const membersLoader = async () => {
  const state = getState();
  const allMembers = getAllUsers(state);

  await dispatch(fetchAllUsers());

  return allMembers;
};

export const userDataLoader = async () => {
  const [user, members] = await Promise.all([userLoader(), membersLoader()]);
  return { user, members };
};

export const projectLoader = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  if (id) {
    await dispatch(fetchProjectById(id));
  }

  const state = getState();
  const project = getCurrentProject(state)!;
  console.log("project loaded");
  console.log(project);

  return project;
};
