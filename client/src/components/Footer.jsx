import React from 'react'
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex flex-col justify-center h-[480px] text-white"
    style={{background: `linear-gradient(262.22deg, #779DCA -4.78%, #192A3D 98.21%)`}}>

    <div className="footerContent flex items-center justify-between mx-56 h-64 border-t border-b border-slate-400 ">
        <div className="logo flex items-center gap-2">
            <img className="h-24 w-24" src="assets/main-logo.png" alt=""/>
            <h1 className="text-4xl font-normal"> <span className="font-bold">Trust</span>Biz</h1>
        </div>
        <div className="right-side space-y-3 text-slate-200">
            <div className="flex gap-5 items-center">
                <i className=" cursor-pointer hover:text-white fa-solid fa-location-dot"></i>
                <h1>345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</h1>
            </div>
            <div className="flex gap-14">
                <div className="flex gap-4 items-center">
                    <i className=" cursor-pointer hover:text-white fa-solid fa-phone"></i>
                    <h1>(123) 456-7890</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <i className=" cursor-pointer hover:text-white fa-solid fa-print"></i>
                    <h1>(123) 456-7890</h1>
                </div>
            </div>
            <div className="flex gap-7 items-center pt-10 text-slate-300">
                <h1>Social Media</h1>
                <div className="flex gap-5">
                    <i className="cursor-pointer hover:text-white fa-brands fa-facebook"></i>
                    <i className="cursor-pointer hover:text-white fa-brands fa-twitter"></i>
                    <i className="cursor-pointer hover:text-white fa-brands fa-linkedin-in"></i>
                    <i className="cursor-pointer hover:text-white fa-brands fa-youtube"></i>
                    <i className="cursor-pointer hover:text-white fa-brands fa-instagram"></i>
                    <i className="cursor-pointer hover:text-white fa-brands fa-google-plus-g"></i>
                    <i className="cursor-pointer hover:text-white fa-brands fa-pinterest"></i>
                    <i className="cursor-pointer hover:text-white fa-solid fa-wifi"></i>
                </div>
            </div>
        </div>
    </div>
    <div className="last-line flex justify-between mx-56 pt-4">
        <div className="links flex gap-4 font-light text-slate-300 ">
            <Link className="hover:text-white" to="/search">Search Businesses</Link>
            <Link className="hover:text-white" to="/list">List a Business</Link>
            <Link className="hover:text-white" to="/profile">Profile</Link>
            <Link className="hover:text-white" to="/signin">Sign in</Link>
            <Link className="hover:text-white" to="/signup">Sign up</Link>
        </div>
        <div className="text-slate-300">Copyright © 2018 • Lift Media Inc.</div>
    </div>


</footer>
  )
}

export default Footer