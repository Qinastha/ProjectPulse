import {IProject, IMember} from './../core/interfaces/IProject';
import {createAsyncThunk, createSlice, PayloadAction, ReducerCreators} from "@reduxjs/toolkit";
import axios from "axios";

export interface IProjectState {
    projects: IProject[];
    members: IMember[];
    isNewProjectOpen: boolean|null;
    isUpdateProjectOpen: boolean|null;
    status: "idle"|"loading"|"resolved"|"rejected";
}

const initialState: IProjectState={
    projects: [],
    members: [],
    isNewProjectOpen: null,
    isUpdateProjectOpen: null,
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
            return response.data.value as IProject;
        } catch(error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    },
);

export const fetchAllMembers=createAsyncThunk(
    "users/fetchAllUsers",
    async (_, thunkAPI) => {
        const response=await axios.get("http://localhost:4000/api/user/all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        return response.data.value as IMember[];
    },
);

export const projectDelete=createAsyncThunk(
    'project/deleteProject',
    async (_id: string, thunkAPI) => {
        try {
            const response=await axios.delete(`http://localhost:4000/api/project/delete/${_id}`, {
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
        setNewProjectOpen: create.reducer((state, action: PayloadAction<boolean>) => {
            return {...state, isNewProjectOpen: action.payload};
        }),
        setUpdateProjectOpen: create.reducer((state, action: PayloadAction<boolean>) => {
            return {...state, isUpdateProjectOpen: action.payload};
        }),
        updateProjectData: create.reducer((state, action: PayloadAction<IProject>) => {
            return {...state, projects: state.projects.map((project) => project._id===action.payload._id? action.payload:project)};
        })
    }),
    selectors: {
        getProjectState: (state) => state,
        getProjects: (state) => state.projects,
        getNewProjectOpen: (state) => state.isNewProjectOpen,
        getUpdateProjectOpen: (state) => state.isUpdateProjectOpen,
        getProjectData: (state, id: string) => state.projects.find((project) => project._id===id),
        getProjectStatus: (state) => state.status,
        getAllMembers: (state) => state.members,
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
            (state, action: PayloadAction<IProject>) => {
                return {...state, projects: [action.payload], status: "resolved"};
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
                return {...state, users: action.payload, status: "resolved"};
            });
        builder.addCase(fetchAllMembers.rejected, state => {
            state.status="rejected";
        });
    },
});

export const {setNewProjectOpen, setUpdateProjectOpen, updateProjectData}=project.actions;

export const {getProjectState, getNewProjectOpen, getUpdateProjectOpen, getProjectData, getProjectStatus, getProjects, getAllMembers}=project.selectors;

export default project.reducer;