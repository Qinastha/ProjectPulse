import {
  fetchAllUsers,
  getAllUsers,
  getUser,
  getUserInitial,
  reqUser,
  setUserInitial,
} from "./store/userSlice";
import store from "./store";
import {
  fetchAllProjects,
  fetchProjectById,
  getCurrentProject,
  getProjects,
} from "./store/projectSlice";

const { dispatch, getState } = store;

export const userLoader = async () => {
  const state = getState();
  const user = getUser(state);
  const isInitial = getUserInitial(state);

  if (isInitial) {
    await dispatch(reqUser());
    dispatch(setUserInitial(false));
  }

  return user;
};

export const membersLoader = async () => {
  const token = localStorage.getItem("token");
  const state = getState();
  const allMembers = getAllUsers(state);

  if (token) {
    await dispatch(fetchAllUsers());
  }

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
  const project = getCurrentProject(state);

  return project;
};

export const projectDataLoader = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    await dispatch(fetchAllProjects());
  }

  const state = getState();
  const projects = getProjects(state);

  return projects;
};
