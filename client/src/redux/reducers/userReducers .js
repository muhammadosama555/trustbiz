import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
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
        registerStart: (state) => {
          state.loading = true;
        },
        registerSuccess: (state,action) => {
          state.loading = false;
          state.error = false;
          state.currentUser = action.payload;
          state.isAuthenticatedUser = true;
        },
        registerFailure: (state) => {
          state.loading = false;
           state.error = true;          
        },
        loadStart: (state) => {
          state.loading = true;
          
        },
        loadSuccess: (state,action) => {
          state.loading = false;
          state.error = false;
          state.currentUser = action.payload
        },
        loadFailure: (state) => {
          state.loading = false;
           state.error = true            
        },
        logoutSuccess: (state) => {
          state.loading = false;
          state.error = false;
          state.currentUser = null;
          state.isAuthenticatedUser = false;
        },
        logoutFailure: (state) => {
          state.loading = false;
           state.error = true            
        },
        updateStart: (state) => {
          state.loading = true;
          
        },
        updateSuccess: (state,action) => {
          state.loading = false;
          state.error = false;
          state.isUpdated = action.payload.success
        },
        updateReset: (state) => {
          state.loading = false
        },
        updateFailure: (state) => {
          state.loading = false;
           state.error = true            
        },
        updatePasswordStart: (state) => {
          state.loading = true;
          
        },
        updatePasswordSuccess: (state,action) => {
          state.loading = false;
          state.error = false;
          state.isUpdated = action.payload.success
        },
        updatePasswordReset: (state) => {
          state.isUpdated = false
        },
        updatePasswordFailure: (state) => {
          state.loading = false;
           state.error = true            
        },
       
        
    }
})

export const {
              loginStart,
              loginSuccess,
              loginFailure,
              registerStart,
              registerSuccess,
              registerFailure,
              loadStart,
              loadSuccess,
              loadFailure,
              logoutSuccess,
              logoutFailure,
              updateStart,
              updateSuccess,
              updateReset,
              updateFailure,
              updatePasswordStart,
              updatePasswordSuccess,
              updatePasswordReset,
              updatePasswordFailure,
            } = userSlice.actions
export default userSlice.reducer