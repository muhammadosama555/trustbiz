import axios from "axios"
import {
    getBusinessStart,
    getBusinessSuccess,
    getBusinessFailure,
    getbusinessDetailsStart,
    getbusinessDetailsSuccess,
    getbusinessDetailsFailure,
    postbusinessDetailsStart,
    postbusinessDetailsSuccess,
    postbusinessDetailsFailure,
    deleteBusiness,
    updateBusinessStart,
    updateBusinessSuccess,
    updateBusinessFailure,
  } from "../reducers/businessReducers";


//  get all Businesses

  export const getBusinesses = async (dispatch) => {
    dispatch(getBusinessStart());
    try {
      const res = await axios.get("/api/business/all?limit=9999999");
      dispatch(getBusinessSuccess(res.data));
    } catch (error) {
      dispatch(getBusinessFailure());
    }
  };

  //  delete single business

export const DeleteBusiness = async (dispatch,id) => {
    try {
      const res = await axios.delete(`/api/business/${id}`)
      dispatch(deleteBusiness((id)))
    } catch (error) {
      console.log(error)
  
    }
  } 

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

  //  update business data 

export const updateBusiness = async (dispatch,businessData,id) => {
    dispatch(updateBusinessStart());
    try {
      console.log(businessData);
      const res = await axios.put(`/api/business/${id}`,businessData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch(updateBusinessSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(updateBusinessFailure());
    }
  };

  //  post Businesses 

  export const postBusinesses = async (dispatch,businessData) => {
    dispatch(postbusinessDetailsStart());
    try {
      console.log(businessData);
      const res = await axios.post("/api/business/new",businessData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch(postbusinessDetailsSuccess(res.data));
    } catch (error) {
      dispatch(postbusinessDetailsFailure());
    }
  };


