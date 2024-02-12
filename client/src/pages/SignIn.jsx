import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../apiCalls/userApiCalls';


function SignIn() {

  const emailInputElement = useRef();
  const passwordInputElement = useRef();

  const {
    mutate: userMutate,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };
    userMutate(data);
  };



  return (
    <>
    
      <div className="sign-in h-[900px] ">
      <div
        className="relative bg-center bg-cover h-full"
        Style="background-image: url('assets/signIn.jpg');"
      >
        <div className="w-full h-full bg-black bg-opacity-50"></div>
        <div className="sign-in from flex flex-col gap-5 absolute z-10 text-white w-1/4 bg-gray-400 bg-opacity-20 rounded-2xl right-32 top-40 p-10">
          <div className="flex justify-between mt-5">
            <div>
              <h1 className="text-xl">
                Welcome to <span className="font-bold">Trust</span>Biz
              </h1>
              <h1 className="text-4xl pt-5 font-bold">Sign in</h1>
            </div>
            <div>
              <h2>No Account ?</h2>
              <Link
                className="text-green-400 hover:text-green-500"
                to="/signup"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div className="sign-in flex items-center gap-7 pt-10">
            <div className="w-72 relative bg-[#E9F1FF] bg-opacity-80  px-6 py-3 rounded-md flex gap-4 items-center hover:cursor-pointer">
              <img className=" w-5 h-5" src="assets/google.png" alt="" />
              <h1 className="text-[#4285F4]">Sign in with Google</h1>
            </div>
            <div className="flex gap-3">
              <div className="px-[13px] py-[8px] rounded-lg bg-white hover:bg-slate-50 hover:cursor-pointer">
                <i className=" text-blue-600 text-2xl fa-brands fa-facebook"></i>
              </div>
              <div className="px-[13px] py-[8px] rounded-lg bg-white hover:bg-slate-50 hover:cursor-pointer">
                <div>
                  <i className="text-2xl text-black fa-brands fa-twitter"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className=" flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 ">
                  <label className="text-xl pl-1" for="email">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 text-black placeholder:text-gray-300 rounded-md border outline-none bg-gray-50"
                    type="text"
                    defaultValue=""
                    name="email"
                    ref={emailInputElement}
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label className="text-xl pl-1" for="password">
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-2 text-black placeholder:text-gray-300 rounded-md border outline-none bg-gray-50"
                    type="password"
                    id="password"
                    defaultValue=""
                    name="password"
                    ref={passwordInputElement}
                  />
                </div>
              </div>
              <Link to='/forgetPassword'>
              <button className="text-blue-400 hover:text-blue-500 flex justify-end px-2">
                Forgot Password
              </button>
              </Link>
            </div>
          </div>
        
          <div className="flex justify-end pt-3 pb-10">
            <button className="text-base text-center  font-normal nav-link btn text-black bg-opacity-100 z-20 absolute px-6 py-2 rounded-lg  hover:drop-shadow-sm" onClick={handleSubmit}>
              {isUserLoading ? "Singning In" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
      </>
   
  );
}

export default SignIn;
