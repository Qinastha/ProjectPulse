import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ReducerCreators,
} from "@reduxjs/toolkit";
import {
  CurrentProject,
  deleteData,
  getData,
  IMember,
  IProject,
} from "../core";

export interface IProjectState {
  projects: IProject[];
  members: IMember[];
  currentProject: CurrentProject | null;
  status: "idle" | "loading" | "resolved" | "rejected";
  isInitial: boolean;
}

const initialState: IProjectState = {
  projects: [],
  members: [],
  currentProject: null,
  status: "idle",
  isInitial: true,
};

export const fetchAllProjects = createAsyncThunk(
  "project/fetchAllProjects",
  async () => {
    try {
      const response = await getData("project/all");
      if (response?.value) {
        return response.value as IProject[];
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (_id: string) => {
    try {
      const response = await getData(`project/${_id}`);
      return response.value as CurrentProject;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },
);

export const fetchAllMembers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await getData("user/all");
      return response.value as IMember[];
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  },
);

export const projectDelete = createAsyncThunk(
  "project/deleteProject",
  async (_id: string) => {
    try {
      await deleteData(`project/delete/${_id}`);
      return _id;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },
);

export const deleteProjectTaskList = createAsyncThunk(
  "project/deleteProjectTaskList",
  async (_id: string) => {
    try {
      await deleteData(`project/${_id}/taskList/${_id}`);
      return _id;
    } catch (error) {
      console.error("Error deleting task list:", error);
      throw error;
    }
  },
);

export const project = createSlice({
  name: "project",
  initialState,
  reducers: (create: ReducerCreators<IProjectState>) => ({
    setIsInitialProject: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        return { ...state, isInitial: action.payload };
      },
    ),
    setCurrentProject: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        const project = state.projects.find(
          project => project._id === action.payload,
        );
        if (project) {
          state.currentProject = project as CurrentProject;
        }
      },
    ),
    setProject: create.reducer(
      (state, action: PayloadAction<CurrentProject>) => {
        state.currentProject = action.payload as CurrentProject;
      },
    ),
    setCurrentProjectNull: create.reducer(state => {
      state.currentProject = null;
    }),
    setCurrentTaskListId: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        if (state.currentProject) {
          state.currentProject.currentTaskListId = action.payload;
        }
      },
    ),
  }),
  selectors: {
    getProjectState: state => state,
    getProjects: state => state.projects,
    getIsInitialProject: state => state.isInitial,
    getProjectStatus: state => state.status,
    getAllMembers: state => state.members,
    getCurrentProject: state => state.currentProject,
    getCurrentTaskListId: state => state.currentProject?.currentTaskListId,
  },
  extraReducers: builder => {
    builder.addCase(fetchAllProjects.pending, state => {
      state.status = "loading";
    });
    builder.addCase(
      fetchAllProjects.fulfilled,
      (state, action: PayloadAction<IProject[] | undefined>) => {
        if (action.payload) {
          return { ...state, projects: action.payload, status: "resolved" };
        } else {
          state.status = "rejected";
        }
      },
    );
    builder.addCase(fetchAllProjects.rejected, state => {
      state.status = "rejected";
    });

    builder.addCase(fetchProjectById.pending, state => {
      state.status = "loading";
    });
    builder.addCase(
      fetchProjectById.fulfilled,
      (state, action: PayloadAction<CurrentProject>) => {
        return { ...state, currentProject: action.payload, status: "resolved" };
      },
    );
    builder.addCase(fetchProjectById.rejected, state => {
      state.status = "rejected";
    });

    builder.addCase(fetchAllMembers.pending, state => {
      state.status = "loading";
    });
    builder.addCase(
      fetchAllMembers.fulfilled,
      (state, action: PayloadAction<IMember[]>) => {
        return { ...state, members: action.payload, status: "resolved" };
      },
    );
    builder.addCase(fetchAllMembers.rejected, state => {
      state.status = "rejected";
    });

    builder.addCase(
      projectDelete.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(
          project => project._id !== action.payload,
        );
      },
    );

    builder.addCase(
      deleteProjectTaskList.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.currentProject!.taskLists =
          state.currentProject!.taskLists.filter(
            taskList => taskList._id !== action.payload,
          );
      },
    );
  },
});

export const {
  setCurrentProject,
  setProject,
  setIsInitialProject,
  setCurrentProjectNull,
  setCurrentTaskListId,
} = project.actions;

export const {
  getProjectState,
  getProjectStatus,
  getProjects,
  getAllMembers,
  getCurrentProject,
  getIsInitialProject,
  getCurrentTaskListId,
} = project.selectors;

export default project.reducer;
