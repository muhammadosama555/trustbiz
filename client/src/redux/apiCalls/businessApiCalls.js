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
  } from "../reducers/businessReducers";


//  get all Businesses

  export const getBusinesses = async (dispatch,currentPage,keyword="",rating=0,cat="",limit=4) => {
    dispatch(getBusinessStart());
    try {
      let url = `/api/business/all?page=${currentPage}&keyword=${keyword}&rating[gte]=${rating}&limit=${limit}`
      if (cat) {
        url = `/api/business/all?page=${currentPage}&keyword=${keyword}&rating[gte]=${rating}&categories=${cat}&limit=${limit}`
      }
      const res = await axios.get(url);
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

