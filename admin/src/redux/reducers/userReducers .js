import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users: [],
        userDetails: [],
        currentUser: null,
        loading: false,
        error: false,
        isAuthenticatedUser:false,
        isUpdated: false,
    },
    reducers: {
        loginStart: (state) => {
          state.loading = true;
        },
        loginSuccess: (state,action) => {
          state.loading = false;
          state.error = false;
          state.currentUser = action.payload;
          state.isAuthenticatedUser = true;
        },
        loginFailure: (state) => {
          state.loading = false;
           state.error = true;          
        },
        getUsersStart: (state) => {
          state.loading = true;
          
        },
        getUsersSuccess: (state,action) => {
          state.loading = false;
          state.users = action.payload
        },
        getUsersFailure: (state) => {
          state.loading = false
          state.error = true
        },
        deleteUser: (state,action) => {
          state.users.users = state.users.users.filter(user => user._id !== action.payload);         
        },
        getUserDetailsStart: (state) => {
          state.loading = true;
          
        },
        getUserDetailsSuccess: (state,action) => {
          state.loading = false;
          state.userDetails = action.payload
        },
        getUserDetailsFailure: (state) => {
          state.loading = false
          state.error = true
        },             
        
    }
})

export const {
              loginStart,
              loginSuccess,
              loginFailure,
              getUsersStart,
              getUsersSuccess,
              getUsersFailure,
              deleteUser,
              getUserDetailsStart,
              getUserDetailsSuccess,
              getUserDetailsFailure,
            } = userSlice.actions
export default userSlice.reducer