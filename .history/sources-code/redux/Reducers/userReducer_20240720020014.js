import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {
        // user: {
            uid: 'null',
            email: 'null',
            fullName: 'null',
            gender: 'null',
            height: 'null',
            weight: 'null',
            bmi: 'null',
            avatar: 'null',
        // }
    },
    reducers: {
        setUser: (state, action) => {
            // state.user=action.payload;
            state.email = action.payload.email || 'null';
            state.fullName = action.payload.fullName || 'null';
            state.gender = action.payload.gender || 'null';
            state.height = action.payload.height || 'null';
            state.weight = action.payload.weight || 'null';
            state.bmi = action.payload.bmi || 'null';
            state.avatar = action.payload.avatar || 'null';
        }
    }
})


export const { setUser } = userReducer.action;
export default userReducer.reducer;