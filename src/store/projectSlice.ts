import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ReducerCreators,
} from "@reduxjs/toolkit";
import { deleteData, getData, IProject } from "../core";

export interface IProjectState {
  allProjects: IProject[];
  project: IProject | null;
  currentTaskId: string | null;
  currentTaskListId: string | null;
  status: "idle" | "loading" | "resolved" | "rejected";
}

const initialState: IProjectState = {
  allProjects: [],
  project: null,
  currentTaskId: null,
  currentTaskListId: null,
  status: "idle",
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
      return response.value as IProject;
    } catch (error) {
      console.error("Error fetching project:", error);
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

export const deleteProjectTask = createAsyncThunk(
  "project/deleteProjectTask",
  async ({
    _id,
    listId,
    taskId,
  }: {
    _id: string;
    listId: string;
    taskId: string;
  }) => {
    try {
      await deleteData(`project/${_id}/taskList/${listId}/task/${taskId}`);
      return { listId, taskId };
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
    setCurrentProject: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        const project = state.allProjects.find(
          project => project._id === action.payload,
        );
        if (project) {
          state.project = project as IProject;
        }
      },
    ),
    setProject: create.reducer((state, action: PayloadAction<IProject>) => {
      state.project = action.payload as IProject;
    }),
    setCurrentProjectNull: create.reducer(state => {
      state.project = null;
    }),
    setCurrentTaskListId: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        state.currentTaskListId = action.payload;
      },
    ),
    setCurrentTaskId: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        state.currentTaskId = action.payload;
      },
    ),
  }),
  selectors: {
    getProjects: state => state.allProjects,
    getProjectStatus: state => state.status,
    getCurrentProject: state => state.project,
    getCurrentTaskListId: state => state.currentTaskListId,
    getCurrentTaskId: state => state.currentTaskId,
    getAllProjectsIds: state => state.allProjects.map(project => project._id),
  },
  extraReducers: builder => {
    builder.addCase(fetchAllProjects.pending, state => {
      state.status = "loading";
    });
    builder.addCase(
      fetchAllProjects.fulfilled,
      (state, action: PayloadAction<IProject[] | undefined>) => {
        if (action.payload) {
          return { ...state, allProjects: action.payload, status: "resolved" };
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
      (state, action: PayloadAction<IProject>) => {
        state.project = action.payload;
        state.status = "resolved";
      },
    );
    builder.addCase(fetchProjectById.rejected, state => {
      state.status = "rejected";
    });

    builder.addCase(
      projectDelete.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.allProjects = state.allProjects.filter(
          project => project._id !== action.payload,
        );
      },
    );

    builder.addCase(
      deleteProjectTaskList.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.project!.taskLists = state.project!.taskLists!.filter(
          taskList => taskList._id !== action.payload,
        );
      },
    );

    builder.addCase(
      deleteProjectTask.fulfilled,
      (
        state,
        action: PayloadAction<{
          listId: string;
          taskId: string;
        }>,
      ) => {
        const { listId, taskId } = action.payload;
        const currentTaskList = state.project!.taskLists!.find(
          list => list._id === listId,
        );
        if (currentTaskList) {
          currentTaskList.tasks = currentTaskList!.tasks!.filter(
            task => task._id !== taskId,
          );
        }
      },
    );
  },
});

export const {
  setCurrentProject,
  setProject,
  setCurrentProjectNull,
  setCurrentTaskListId,
  setCurrentTaskId,
} = project.actions;

export const {
  getProjectStatus,
  getProjects,
  getCurrentProject,
  getCurrentTaskListId,
  getCurrentTaskId,
  getAllProjectsIds,
} = project.selectors;

export default project.reducer;
