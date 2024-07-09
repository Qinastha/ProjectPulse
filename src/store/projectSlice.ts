import {IProject, IMember} from './../core/interfaces/IProject';
import {createAsyncThunk, createSlice, PayloadAction, ReducerCreators} from "@reduxjs/toolkit";
import axios from "axios";

export interface IProjectState {
    projects: IProject[];
    isInitial: boolean;
    status: "idle"|"loading"|"resolved"|"rejected";
}

const initialState: IProjectState={
    projects: [],
    isInitial: true,
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
                return response.data as IProject[];
            }
        } catch(error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },
);

export const project=createSlice({
    name: 'project',
    initialState,
    reducers: (create: ReducerCreators<IProjectState>) => ({
        setProjectInitial: create.reducer((state, action: PayloadAction<boolean>) => {
            return {...state, isInitial: action.payload};
        }),
    }),
    selectors: {
        getProjectState: (state) => state,
        getProjects: (state) => state.projects,
        getProjectInitial: (state) => state.isInitial,
        getProjectStatus: (state) => state.status,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProjects.pending, (state) => {
            state.status='loading';
        });
        builder.addCase(fetchAllProjects.fulfilled, (state, action: PayloadAction<IProject[]|undefined>) => {
            if(action.payload) {
                state.projects=action.payload;
                state.status='resolved';
            } else {
                state.status='rejected';
            }
        });
        builder.addCase(fetchAllProjects.rejected, (state) => {
            state.status='rejected';
        });
    }
});

export const {setProjectInitial}=project.actions;

export const {getProjectState, getProjectInitial, getProjectStatus, getProjects}=project.selectors;

export default project.reducer;