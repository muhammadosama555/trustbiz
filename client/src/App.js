import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from "./hooks/ScrollToTop";
import "./App.css";
//import List from './pages/List.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from './pages/Search.jsx';
import BusinessDetails from './pages/BusinessDetails';
 import Profile from './pages/Profile';
 import SignIn from './pages/SignIn';
 import SignUp from './pages/SignUp';
import List from './pages/List';
import EditBusiness from './pages/EditBusiness';

const queryClient = new QueryClient()

const App = () => {

  
  return (
   <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
   <Navbar/>
   <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/businessdetails/:businessId' element={<BusinessDetails/>}/>
   <Route path='/search' element={<Search/>}/>
   <Route path='/list' element={<List/>}/>
   <Route path='/editBusiness/:businessId' element={<EditBusiness/>}/>
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/signup' element={<SignUp/>}/>
   <Route path='/signin' element={<SignIn/>}/>
   </Routes>
   <Footer/>
   {/* <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        /> */}
      </BrowserRouter>
     <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
   </>
  )
}

export default App
