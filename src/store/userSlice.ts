import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ReducerCreators,
} from "@reduxjs/toolkit";
import { getData, IProfile, IUser } from "../core";

export interface IUserState {
  user: IUser;
  allUsers: IUser[];
  status: "idle" | "loading" | "resolved" | "rejected";
  isInitial: boolean;
}

const initialState: IUserState = {
  user: {
    email: "",
    password: "",
    role: null,
    profile: null,
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: new Date().toISOString(),
    position: null,
    createdAt: null,
    updatedAt: null,
    lastActiveAt: null,
  },
  allUsers: [],
  status: "idle",
  isInitial: true,
};

export const reqUser = createAsyncThunk("users/reqUser", async () => {
  const response = await getData("user/");
  return response.value as IUser;
});

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await getData("user/all");
      return response.value as IUser[];
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  },
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: (create: ReducerCreators<IUserState>) => ({
    updateProfile: create.reducer((state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }),
    setUserInitial: create.reducer((state, action: PayloadAction<boolean>) => {
      return { ...state, isInitial: action.payload };
    }),
    setAvatar: create.reducer((state, action: PayloadAction<string>) => {
      if (state.user?.profile?.avatar) {
        state.user.profile.avatar = action.payload;
      } else {
        state.user.profile = { avatar: action.payload } as IProfile;
      }
    }),
    setStateNull: create.reducer(state => {
      return { ...initialState };
    }),
  }),
  selectors: {
    getUser: state => state.user,
    getProfile: state => state.user.profile,
    getUserInitial: state => state.isInitial,
    getAvatar: state => state.user.profile?.avatar,
    getAllUsers: state => state.allUsers,
  },
  extraReducers: builder => {
    builder.addCase(reqUser.pending, state => {
      state.status = "loading";
    });
    builder.addCase(
      reqUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.status = "resolved";
        state.isInitial = false;
      },
    );
    builder.addCase(reqUser.rejected, state => {
      state.status = "rejected";
    });

    builder.addCase(
      fetchAllUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        return { ...state, allUsers: action.payload, status: "resolved" };
      },
    );
  },
});

export const { getUser, getProfile, getUserInitial, getAllUsers } =
  user.selectors;

export const { updateProfile, setUserInitial, setStateNull } = user.actions;

export default user.reducer;
