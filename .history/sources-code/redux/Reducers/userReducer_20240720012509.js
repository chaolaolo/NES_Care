import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

const userReducer = createSlice({
    name:'user',
    initialState:{
        uid:'null',
        email:'null',
        fullName:'null',
        gender:'null',
        height:'null',
        weight:'null',
        BMI:'null',
        avatar:'null',
    },
    reducers:{
        setUser:(state,action)=>{
            state.uid = action.payload.uid || 'null';
            state.email = action.payload.email || 'null';
            state.fullName = action.payload.fullName || 'null';
            state.gender = action.payload.gender || 'null';
            state.height = action.payload.height || 'null';
            state.weight = action.payload.weight || 'null';
            state.BMI = action.payload.BMI || 'null';
            state.avatar = action.payload.avatar || 'null';
        }
    }
})


export const {setUser} = useReducer.action;
export default useReducer.reducer;