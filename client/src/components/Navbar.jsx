import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Loader from "../components/Loader";
import { useGetUserDetails, useLogout } from '../apiCalls/userApiCalls';



function Navbar() {

  const {currentUser} = useSelector(state=>state.userSlice)
  const userId = currentUser?.data._id

  const { mutate: logoutMutate, isLoading: isLogoutLoading } = useLogout();
 
  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)

 

  const handleLogout = () => {
    logoutMutate();
  };

  const fallbackImage = '/assets/avatar.jpg';

  return (
    <div className="navbar mx-10 my-3">
        <nav className="flex items-center justify-between">
                <Link to="/" className="logo flex items-center">
                <img className="h-12 w-12" src="../assets/main-logo.png" alt=""/>
                <h1 className="text-2xl font-normal"> <span className="font-bold">Trust</span>Biz</h1>
                </Link>
            <div className="nav-links">
                <ul className="flex space-x-5 items-center">
                <li className="text-lg font-normal nav-link"><Link to='/search'>Search</Link></li>
               
                <li className="text-lg font-normal nav-link"><a href='/#about'>About</a></li>
        
                  {currentUser ? (
                  <>
                  <li className="text-lg font-normal nav-link"><Link to='/list'>List</Link></li>
                  
                  <li className="">
                
                    <Link to={'/profile'}>
                    <div className="Profile">
                      <div
                        className="w-8 h-8 bg-slate-300 rounded-full"
                        style={{
                          backgroundImage: `url("${userDetails?.data.user?.imgUrl}"), url("${fallbackImage}")`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </div>
                    </Link>
               
          </li>
                      
                    <li onClick={handleLogout} className="text-base text-center font-normal nav-link bg-slate-200 px-5 py-2 rounded-lg btn hover:drop-shadow-sm" ><Link
                            to="/logout">Logout</Link></li>
                  </>
                  ) : (
                    <>
                    <li className="text-base text-center font-normal nav-link bg-slate-200 px-5 py-2 rounded-lg btn hover:drop-shadow-sm"><Link
                            to="/signup">Sign up</Link></li>
                    <li className="text-base text-center font-normal nav-link bg-slate-200 px-5 py-2 rounded-lg btn hover:drop-shadow-sm"><Link
                            to="/signin">Sign in</Link></li>
                    </>
                  )
                }
                    
                    
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar