import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Dashboard } from "./Pages/Dashboard";
import { Projects } from "./Pages/Projects";
import { Tasks } from "./Pages/Tasks";
import { TimeLog } from "./Pages/TimeLog";
import { ResourceMgnt } from "./Pages/ResourceMgnt";
import { Users } from "./Pages/Users";
import { ProjectTemplate } from "./Pages/ProjectTemplate";
import { AppSetings } from "./Pages/AppSetings";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { PrivateRoute } from "./Components/PrivateRout";
import { PageNotFound } from "./Pages/PageNotFound";
import { ProfileCreate } from "./Pages/Profile/ProfileCreate";
import { ProfileSettings } from "./Pages/Profile/ProfileSettings";
import { userLoader } from "./loaders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={userLoader}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="logs" element={<TimeLog />} />
        <Route path="resources" element={<ResourceMgnt />} />
        <Route path="users" element={<Users />} />
        <Route path="templates" element={<ProjectTemplate />} />
        <Route path="settings/app" element={<AppSetings />} />
        <Route path="settings/profile" element={<ProfileSettings />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile/create" element={<ProfileCreate />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
);

export default router;
