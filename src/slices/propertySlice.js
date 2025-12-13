import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";



export const fetchProperties = createAsyncThunk(
    "properties/fetchProperties",
    async (search = "", { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getProperties?search=${search}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fetch failed");
        }
    }
);

export const addProperty = createAsyncThunk(
    "properties/addProperty",
    async (propertyData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/addProperty`, propertyData);
            return response.data.property;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Add property failed");
        }
    }
);

export const fetchMyProperties = createAsyncThunk(
    "properties/fetchMyProperties",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/getMyProperties/${email}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateProperty = createAsyncThunk(
    "properties/updateProperty",
    async ({ id, propertyData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/updateProperty/${id}`, propertyData);
            return response.data.property;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);

export const deleteProperty = createAsyncThunk(
    "properties/deleteProperty",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/deleteProperty/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Delete failed");
        }
    }
);

const propertySlice = createSlice({
    name: "properties",
    initialState: {
        list: [],
        myList: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addProperty.fulfilled, (state, action) => {
                state.list.unshift(action.payload); // Add new property to top
            })
            .addCase(fetchMyProperties.fulfilled, (state, action) => {
                state.myList = action.payload;
            })
            .addCase(updateProperty.fulfilled, (state, action) => {
                const index = state.list.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p._id !== action.payload);
            });
    },
});

export default propertySlice.reducer;
