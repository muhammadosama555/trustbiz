import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/apiCalls/userApiCalls";





const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  


  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
          <div className="login flex justify-center mt-20 mb-10">
            <div className="bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md w-[360px] sm:w-[450px] md:w-[500px] lg:w-[500px] xl:w-[500px]">
              <form onSubmit={submitHandler}>
                <h1 className="text-4xl font-semibold pb-5">Login</h1>
                <div className="flex flex-col gap-5 mb-3">
                  <div className="flex flex-col">
                    <label className="text-xl pb-2" htmlFor="email_field">
                      Username
                    </label>
                    <input
                      type="username"
                      id="txt-username"
                      className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                      placeholder="Enter your username"
                      defaultValue=""
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-xl pb-2"htmlFor="password_field">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password_field"
                      className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                      placeholder="Password"
                      defaultValue=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Link to="/password/forgot"  className="flex justify-end mb-4 hover:text-red-color">
                  Forgot Password?
                </Link>

                <div className="flex justify-center mt-5 pb-3">
                  <button
                    className="text-white font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
                    id="login_button"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
    </>
  );
};

export default Login;
