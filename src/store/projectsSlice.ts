import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserRole} from "../core/types/userRole.type";
import {IProfile} from "../core/interfaces/IProfile";
import axios from 'axios';

interface IUser {
    email: string;
    password: string;
    role: UserRole|null;
    profile: IProfile|null;
    createdAt: Date|null;
    updatedAt: Date|null;
    lastActiveAt: Date|null;
}
const initialState: IUser={
    email: "",
    password: "",
    role: null,
    profile: null,
    createdAt: null,
    updatedAt: null,
    lastActiveAt: null,
};

export const reqUsers=createAsyncThunk(
     'users/reqUsers',
    async (payload, thunkAPI)=> {
        const response=await axios.get('/api/users');
        return response.data;
    });

export const user=createSlice({
    name: 'user',
    initialState,
    reducers: {},
    selectors: {
        getProfile: (state) => state.profile
    },
    extraReducers: (builder) =>{
        builder
        .addCase(reqUsers.fulfilled, (state, action: PayloadAction<IUser>) => {
            state=action.payload;
        });
    }
});

export const {getProfile}=user.selectors;

export default user.reducer;
