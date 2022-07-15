import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser:null,
    isFethching: false,
    error:false,
  },
  reducers:{
    loginStart:(state)=>{
      state.isFethching=true
    },
    loginSuccess:(state,action)=>{
      state.isFethching=false;
      state.currentUser=action.payload;
    },
    loginFailure:(state)=>{
      state.error=true;
      state.isFethching=false;
    },
  }
});

export const {loginStart,loginFailure,loginSuccess} = userSlice.actions
export default userSlice.reducer