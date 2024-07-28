import { configureStore } from "@reduxjs/toolkit";
import userReducer, { stepReducer } from "../Reducers/userReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        stepReducer
    }
})