import {IProject, IMember, CurrentProject} from './../core/interfaces/IProject';
import {createAsyncThunk, createSlice, PayloadAction, ReducerCreators} from "@reduxjs/toolkit";
import axios from "axios";

export interface IProjectState {
    projects: IProject[];
    members: IMember[];
    currentProject: CurrentProject|null;
    projectOpen: boolean|null;
    isNewProject: boolean|null;
    isUpdateProject: boolean|null;
    status: "idle"|"loading"|"resolved"|"rejected";
}

const initialState: IProjectState={
    projects: [],
    members: [],
    currentProject: null,
    projectOpen: null,
    isNewProject: null,
    isUpdateProject: null,
    status: 'idle',
};

export const fetchAllProjects=createAsyncThunk(
    'project/fetchAllProjects',
    async (_, thunkAPI) => {
        try {
            const response=await axios.get("http://localhost:4000/api/project/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            if(response.data) {
                console.log(response.data);
                return response.data.value as IProject[];
            }
        } catch(error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },
);

export const fetchProjectById=createAsyncThunk(
    'project/fetchProjectById',
    async (_id: string, thunkAPI) => {
        try {
            const response=await axios.get(`http://localhost:4000/api/project/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            return response.data.value as CurrentProject;
        } catch(error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    },
);

export const fetchAllMembers=createAsyncThunk(
    "users/fetchAllUsers",
    async (_, thunkAPI) => {
        try {
            const response=await axios.get("http://localhost:4000/api/user/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            return response.data.value as IMember[];
        }
        catch(error) {
            console.error('Error fetching members:', error);
            throw error;
        }
    });

export const projectDelete=createAsyncThunk(
    'project/deleteProject',
    async (_id: string, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:4000/api/project/delete/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            return _id;
        } catch(error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    },
);

export const project=createSlice({
    name: 'project',
    initialState,
    reducers: (create: ReducerCreators<IProjectState>) => ({
        setProjectOpen: create.reducer((state, action: PayloadAction<boolean|null>) => {
            return {...state, projectOpen: action.payload};
        }),
        setIsNewProject: create.reducer((state, action: PayloadAction<boolean|null>) => {
            return {...state, isNewProject: action.payload};
        }),
        setIsUpdateProject: create.reducer((state, action: PayloadAction<boolean|null>) => {
            return {...state, isUpdateProject: action.payload};
        }),
        setProjectAvatar: create.reducer((state, action: PayloadAction<string>) => {
            return {...state, projectAvatar: action.payload};
        }),
        setCurrentProject: (state, action: PayloadAction<string>) => {
            const project=state.projects.find(project => project._id===action.payload);
            if(project) {
                state.currentProject=project as CurrentProject;
            }
        },
    }),
    selectors: {
        getProjectState: (state) => state,
        getProjects: (state) => state.projects,
        getProjectOpen: (state) => state.projectOpen,
        getIsNewProject: (state) => state.isNewProject,
        getIsUpdateProject: (state) => state.isUpdateProject,
        //getprojectavatar???
        getProjectStatus: (state) => state.status,
        getAllMembers: (state) => state.members,
        getCurrentProject: (state) => state.currentProject,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProjects.pending, (state) => {
            state.status='loading';
        });
        builder.addCase(fetchAllProjects.fulfilled, (state, action: PayloadAction<IProject[]|undefined>) => {
            if(action.payload) {
                return {...state, projects: action.payload, status: "resolved"};
            } else {
                state.status='rejected';
            }
        });
        builder.addCase(fetchAllProjects.rejected, (state) => {
            state.status='rejected';
        });

        builder.addCase(projectDelete.fulfilled, (state, action: PayloadAction<string>) => {
            state.projects=state.projects.filter((project) => project._id!==action.payload);
        });

        builder.addCase(fetchProjectById.pending, state => {
            state.status="loading";
        });
        builder.addCase(
            fetchProjectById.fulfilled,
            (state, action: PayloadAction<CurrentProject>) => {
                return {...state, currentProject: action.payload, status: "resolved"};
            });
        builder.addCase(fetchProjectById.rejected, state => {
            state.status="rejected";
        });

        builder.addCase(fetchAllMembers.pending, state => {
            state.status="loading";
        });
        builder.addCase(
            fetchAllMembers.fulfilled,
            (state, action: PayloadAction<IMember[]>) => {
                return {...state, members: action.payload, status: "resolved"};
            });
        builder.addCase(fetchAllMembers.rejected, state => {
            state.status="rejected";
        });
    },
});

export const {setProjectOpen, setIsUpdateProject, setCurrentProject, setIsNewProject}=project.actions;

export const {getProjectState, getProjectOpen, getIsUpdateProject, getProjectStatus, getProjects, getAllMembers, getCurrentProject, getIsNewProject}=project.selectors;

export default project.reducer;