import axios from "axios"
import {
    getBusinessStart,
    getBusinessSuccess,
    getBusinessFailure,
    getbusinessDetailsStart,
    getbusinessDetailsSuccess,
    getbusinessDetailsFailure,
  } from "../reducers/businessReducers";


//  get all Businesses

  export const getBusinesses = async (dispatch) => {
    dispatch(getBusinessStart());
    try {
      const res = await axios.get("/api/business/all");
      dispatch(getBusinessSuccess(res.data));
    } catch (error) {
      dispatch(getBusinessFailure());
    }
  };

//  get Businesses Details

  export const getBusinessesDetails = async (dispatch,id) => {
    dispatch(getbusinessDetailsStart());
    try {
      const res = await axios.get(`/api/business/${id}`);
      dispatch(getbusinessDetailsSuccess(res.data));
    } catch (error) {
      dispatch(getbusinessDetailsFailure());
    }
  };

