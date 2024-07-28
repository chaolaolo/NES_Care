import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {
        user: {
            // uid: 'null',
            email: '',
            fullName: '',
            gender: '',
            height: '',
            weight: '',
            bmi: '',
            avatar: '',
            dateOfBirth: '',
            advice: '',
            BMIstatus: '',
            role: '',
        },
        steps: { steps: 0 }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // state.email = action.payload.email || 'null';
            // state.fullName = action.payload.fullName || 'null';
            // state.gender = action.payload.gender || 'null';
            // state.height = action.payload.height || 'null';
            // state.weight = action.payload.weight || 'null';
            // state.bmi = action.payload.bmi || 'null';
            // state.avatar = action.payload.avatar || 'null';
        }
    }
})

export const stepReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_STEPS':
        return { ...state, steps: action.payload };
      default:
        return state;
    }
  };

export const { setUser } = userReducer.actions;
export default userReducer.reducer;