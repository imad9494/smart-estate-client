import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

export const fetchProperties = createAsyncThunk(
  "properties/fetchAll",
  async () => {
    const response = await axios.get(`${API_URL}/properties`);
    return response.data;
  }
);

export const addProperty = createAsyncThunk(
  "properties/add",
  async (propertyData) => {
    const response = await axios.post(`${API_URL}/properties`, propertyData);
    return response.data;
  }
);

export const updateProperty = createAsyncThunk(
  "properties/update",
  async ({ id, propertyData }) => {
    const response = await axios.put(`${API_URL}/properties/${id}`, propertyData);
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id) => {
    await axios.delete(`${API_URL}/properties/${id}`);
    return id;
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    items: [],
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
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default propertySlice.reducer;
