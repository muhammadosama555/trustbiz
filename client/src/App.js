import React from 'react'
import {Routes,Route} from "react-router-dom";
import "./App.css";
import List from './pages/List.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from './pages/Search.jsx';
import BusinessDetails from './pages/BusinessDetails';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {

  // it alternative to the useContext hooks in react / consumer from context API
  

  return (
   <>
   <Navbar/>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/businessdetails/:id' element={<BusinessDetails/>}/>
   <Route path='/search' element={<Search/>}/>
   <Route path='/list' element={<List/>}/>
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/signin' element={<SignIn/>}/>
   </Routes>
   <Footer/>
   </>
  )
}

export default App
