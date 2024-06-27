import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRole } from "../core/types/userRole.type";
import { UserPosition } from "../core/types/userPosition";
import axios from "axios";
import { IProfile } from "../core/interfaces/IProfile";

interface IUser {
  email: string;
  password: string;
  role: UserRole | null;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: Date;
  position: UserPosition | null;
  profile: IProfile | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastActiveAt: Date | null;
}

const initialState: IUser = {
  email: "",
  password: "",
  role: null,
  profile: null,
  firstName: "",
  lastName: "",
  userName: "",
  dateOfBirth: new Date(),
  position: null,
  createdAt: null,
  updatedAt: null,
  lastActiveAt: null,
};

export const reqUsers = createAsyncThunk(
  "users/reqUsers",
  async (payload, thunkAPI) => {
    const response = await axios.get("http://localhost:4000/api/user/");
    return response.data.value as IUser;
  },
);

export const user=createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    selectors: {
        getUser: (state) => state,
        getProfile: (state) => state.profile,
    },
    extraReducers: (builder) => {
        builder
            .addCase(reqUsers.fulfilled, (state, action: PayloadAction<IUser>) => {
                state=action.payload;
            });
    }
});

export const { getUser, getProfile } = user.selectors;

export default user.reducer;
