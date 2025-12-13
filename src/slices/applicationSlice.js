import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

export const applyForProperty = createAsyncThunk(
    "applications/apply",
    async (applicationData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/applyProperty`, applicationData);
            return response.data.application;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Application failed");
        }
    }
);

export const fetchMyApplications = createAsyncThunk(
    "applications/fetchMine",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getMyApplications/${email}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchAllApplications = createAsyncThunk(
    "applications/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getAllApplications`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateApplicationStatus = createAsyncThunk(
    "applications/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/updateApplicationStatus/${id}`, { status });
            return response.data.application;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        myApplications: [],
        allApplications: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(applyForProperty.fulfilled, (state, action) => {
                state.myApplications.push(action.payload);
            })
            .addCase(fetchMyApplications.fulfilled, (state, action) => {
                state.myApplications = action.payload;
            })
            .addCase(fetchAllApplications.fulfilled, (state, action) => {
                state.allApplications = action.payload;
            })
            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                const index = state.allApplications.findIndex(a => a._id === action.payload._id);
                if (index !== -1) {
                    state.allApplications[index] = action.payload;
                }
            });
    },
});

export default applicationSlice.reducer;
