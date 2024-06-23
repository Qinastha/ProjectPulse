import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Components/Layout";
import { Dashboard } from './Pages/Dashboard';
import { Projects } from "./Pages/Projects";
import { Tasks } from "./Pages/Tasks";
import { TimeLog } from "./Pages/TimeLog";
import { ResourceMgnt } from './Pages/ResourceMgnt';
import { Users } from './Pages/Users';
import { ProjectTemplate } from './Pages/ProjectTemplate';
import { Settings } from './Pages/Settings';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={ <Layout /> }>
        <Route index element={ <Dashboard /> } />
        <Route path='projects' element={ <Projects /> } />
        <Route path='tasks' element={ <Tasks /> } />
        <Route path='logs' element={ <TimeLog /> } />
        <Route path='resources' element={ <ResourceMgnt /> } />
        <Route path='users' element={ <Users /> } />
        <Route path='templates' element={ <ProjectTemplate /> } />
        <Route path='settings' element={ <Settings /> } />
        <Route path='login' element={ <Login /> } />
        <Route path='registration' element={ <Register /> } />
    </Route>
));

export default router;