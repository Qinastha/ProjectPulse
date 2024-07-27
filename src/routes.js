import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { ProjectsList } from "./Pages/ProjectList/ProjectsList";
import { Tasks } from "./Pages/Tasks";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { PageNotFound } from "./Pages/PageNotFound";
import { Layout, PrivateRoute } from "./Components";
import React from "react";
import { projectLoader, userDataLoader } from "./loaders";
import { ManageProfile } from "./Pages/Profile/ManageProfile";
import { Project } from "./Pages/Project/Project";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={userDataLoader}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route
          path="projects/:id"
          loader={projectLoader}
          element={<Project />}
        />
        <Route path="tasks" element={<Tasks />} />
        <Route
          path="settings/profile"
          element={<ManageProfile mode="update" />}
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile/create" element={<ManageProfile mode="create" />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
);

export default router;
