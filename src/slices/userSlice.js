import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/userLogin", credentials);
            if (response.data.loginStatus === false) {
                return rejectWithValue(response.data.serverMsg);
            }
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/userRegister", userData);
            if (response.data.flag === false) {
                return rejectWithValue(response.data.serverMsg);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
)

const initialState = {
    user: null,
    isAuthenticated: false,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
    registerStatus: "idle",
    registerError: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.status = "idle";
            state.error = null;
        },
        clearErrors: (state) => {
            state.error = null;
            state.registerError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.registerStatus = 'loading';
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.registerStatus = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.registerError = action.payload;
            });
    },
});

export const { logout, clearErrors } = userSlice.actions;
export default userSlice.reducer;