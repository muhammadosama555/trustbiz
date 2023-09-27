import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "businessSlice",
  initialState: {
    businessData: [],
    businessDetails: [],
    loading: false,
    error: false,
    isPosted: false,
    isUpdated: false,
  },
  reducers: {
    //GET ALL
    getBusinessStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBusinessSuccess: (state, action) => {
      state.loading = false;
      state.businessData = action.payload;
    },
    getBusinessFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteBusiness: (state,action) => {
      state.businessData.business = state.businessData.business.filter(business => business._id !== action.payload);         
    },
    getbusinessDetailsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getbusinessDetailsSuccess: (state, action) => {
      state.loading = false;
      state.businessDetails = action.payload;
    },
    getbusinessDetailsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    postbusinessDetailsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    postbusinessDetailsSuccess: (state, action) => {
      state.loading = false;
      state.isPosted = true;
    },
    postbusinessDetailsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    isPostedReset: (state) => {
      state.isPosted = false
    },
    updateBusinessStart: (state) => {
      state.loading = true;
    },
    updateBusinessSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.isUpdated = true
    },
    updateBusinessReset: (state) => {
      state.isUpdated = false
    },
    updateBusinessFailure: (state) => {
      state.loading = false;
       state.error = true            
    },
  }
});

export const {
 getBusinessStart,
 getBusinessSuccess,
 getBusinessFailure,
 deleteBusiness,
 getbusinessDetailsStart,
 getbusinessDetailsSuccess,
 getbusinessDetailsFailure,
 postbusinessDetailsStart,
 postbusinessDetailsSuccess,
 postbusinessDetailsFailure,
 isPostedReset,
 updateBusinessStart,
 updateBusinessSuccess,
 updateBusinessFailure,
 updateBusinessReset,
} = businessSlice.actions;

export default businessSlice.reducer;