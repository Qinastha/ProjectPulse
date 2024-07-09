import {IProfile} from "../core/interfaces/IProfile";
import {
  PayloadAction,
  ReducerCreators,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {UserRole} from "../core/types/userRole.type";
import {UserPosition} from "../core/types/userPosition";
import axios from "axios";

export interface IUser {
  email: string;
  password: string;
  role: UserRole|null;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: Date|string;
  position: UserPosition|null;
  profile: IProfile|null;
  createdAt: Date|null;
  updatedAt: Date|null;
  lastActiveAt: Date|null;
  status: "idle"|"loading"|"resolved"|"rejected";
  isInitial: boolean;
}

const initialState: IUser={
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
  status: "idle",
  isInitial: true,
};

export const reqUser=createAsyncThunk(
  "users/reqUser",
  async (_, thunkAPI) => {
    const response=await axios.get("http://localhost:4000/api/user/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data.value as IUser;
  },
);

export const user=createSlice({
  name: "user",
  initialState,
  reducers: (create: ReducerCreators<IUser>) => ({
    updateProfile: create.reducer(
      (state, action: PayloadAction<Partial<IProfile>>) => {
        return {...state, ...action.payload};
      },
    ),
    setUserInitial: create.reducer((state, action: PayloadAction<boolean>) => {
      return {...state, isInitial: action.payload};
    }),
    setAvatar: create.reducer((state, action: PayloadAction<string>) => {
      if(state.profile) {
        state.profile.avatar=action.payload;
      } else {
        state.profile={avatar: action.payload} as IProfile;
      }
    }),
  }),
  selectors: {
    getUser: state => state,
    getProfile: state => state.profile,
    getUserInitial: state => state.isInitial,
    getAvatar: state => state.profile?.avatar,
  },
  extraReducers: builder => {
    builder.addCase(reqUser.pending, state => {
      state.status="loading";
    });
    builder.addCase(
      reqUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {...state, ...action.payload, status: "resolved"};
      },
    );
    builder.addCase(reqUser.rejected, state => {
      state.status="rejected";
    });
  },
});

export const {getUser, getProfile, getUserInitial, getAvatar}=user.selectors;

export const {updateProfile, setUserInitial, setAvatar}=user.actions;

export default user.reducer;
