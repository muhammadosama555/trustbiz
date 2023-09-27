import axios from "axios";
import { 
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
} from "../reducers/userReducers ";


//  user to login

export const login = async (dispatch,user) => {
    dispatch(loginStart())
    try {
      const res = await axios.post("/api/auth/login",user)
      dispatch(loginSuccess((res.data)))
    } catch (error) {
      dispatch(loginFailure())
    }
  }

//  get all users

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
      const res = await axios.get("/api/auth/users")
      dispatch(getUsersSuccess((res.data)))
    } catch (error) {
      console.log(error)
      dispatch(getUsersFailure())
    }
  } 

  //  delete single user

export const DeleteUser = async (dispatch,id) => {
    try {
      const res = await axios.delete(`/api/auth/${id}`)
      dispatch(deleteUser((id)))
    } catch (error) {
      console.log(error)
  
    }
  } 

  //  get user details

export const getUserDetails = async (dispatch,id) => {
    dispatch(getUserDetailsStart())
    try {
      const res = await axios.get(`/api/auth/user/${id}`)
      dispatch(getUserDetailsSuccess((res.data)))
    } catch (error) {
      console.log(error)
      dispatch(getUserDetailsFailure())
    }
  } 

  