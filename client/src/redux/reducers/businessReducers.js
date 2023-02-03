import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "businessSlice",
  initialState: {
    businessData: [],
    businessDetails: [],
    loading: false,
    error: false,
    isUpdated: false
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
      state.isUpdated = false;
    },
    postbusinessDetailsSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },
    postbusinessDetailsFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.isUpdated = false;
    },
    updateReset: (state) => {
      state.isUpdated = false
    },
  }
});

export const {
 getBusinessStart,
 getBusinessSuccess,
 getBusinessFailure,
 getbusinessDetailsStart,
 getbusinessDetailsSuccess,
 getbusinessDetailsFailure,
 postbusinessDetailsStart,
 postbusinessDetailsSuccess,
 postbusinessDetailsFailure,
 updateReset,
} = businessSlice.actions;

export default businessSlice.reducer;