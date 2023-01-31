import axios from "axios";
import { persistor } from "../store";
import { 
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
    updateFailure,
    updatePasswordStart,
    updatePasswordSuccess,
    updatePasswordFailure,
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
  
 //  logout the user

 export const logout = async (dispatch) => {
    try {
      await axios.get("/api/auth/logout")
      dispatch(logoutSuccess())
      persistor.purge();
    } catch (error) {
      dispatch(logoutFailure())
    }
  } 

  // user to get register

  export const register = async (dispatch,userData) => {
    dispatch(registerStart())
    try {
      console.log(userData)
      const res = await axios.post("/api/auth/register",userData)
      dispatch(registerSuccess((res.data)))
    } catch (error) {
      dispatch(registerFailure())
    }
  }
