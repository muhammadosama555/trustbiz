import React from 'react'
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar mx-10 my-3">
        <nav className="flex items-center justify-between">
                <Link to="/" className="logo flex items-center">
                <img className="h-12 w-12" src="assets/main-logo.png" alt=""/>
                <h1 classNameName="text-2xl font-normal"> <span className="font-bold">Trust</span>Biz</h1>
                </Link>
            <div className="nav-links">
                <ul className="flex space-x-5 items-center">
                    <li className="text-lg font-normal nav-link"><Link to='/search'>Search</Link></li>
                    <li className="text-lg font-normal nav-link"><Link to='/list'>List</Link></li>
                    <li className="text-lg font-normal nav-link"><Link to="/profile">Profile</Link></li>
                    <li className="text-base text-center  font-normal nav-link bg-slate-200 px-5 py-2 rounded-lg btn hover:drop-shadow-sm"><Link
                            to="/signup">Sign up</Link></li>
                    <li className="text-base text-center  font-normal nav-link bg-slate-200 px-5 py-2 rounded-lg btn hover:drop-shadow-sm"><Link
                            to="/signin">Sign in</Link></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar