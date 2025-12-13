import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import propertyReducer from "../slices/propertySlice";
import applicationReducer from "../slices/applicationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        properties: propertyReducer,
        applications: applicationReducer,
    },
});

export default store;
