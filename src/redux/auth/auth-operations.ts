import { createAsyncThunk } from "@reduxjs/toolkit";
import {IUser} from './authSlice';
import {PrivateApi, PublicApi, token} from '../../http/http';

export const createUser = createAsyncThunk(
    "auth/createUser",
    async ({name, email, password}: IUser, thunkAPI) => {
        try {
            const res = await PublicApi.post("/users/signup", {"name": name, "email": email, "password": password});
            token.set(res.data.token)
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({email, password}: IUser, thunkAPI) => {
        try {
            const res = await PublicApi.post("/users/login", {"email": email, "password": password});
            token.set(res.data.token)
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            const res = await PrivateApi.post("/users/logout");
            token.unset()
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState()
        // @ts-ignore
        const persistedToken = state.auth.token
        if(persistedToken === null){
            return thunkAPI.rejectWithValue('')
        }
            token.set(persistedToken)
        try {
            const res = await PrivateApi.get("/users/current");
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);