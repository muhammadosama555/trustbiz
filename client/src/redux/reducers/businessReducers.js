import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "businessSlice",
  initialState: {
    businessData: [],
    businessDetails: [],
    loading: false,
    error: false,
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
  }
});

export const {
 getBusinessStart,
 getBusinessSuccess,
 getBusinessFailure,
 getbusinessDetailsStart,
 getbusinessDetailsSuccess,
 getbusinessDetailsFailure,
} = businessSlice.actions;

export default businessSlice.reducer;