import React from 'react'
import AboutUs from '../components/AboutUs'
import Businesses from '../components/Businesses'
import ContactUs from '../components/ContactUs'
import Hero from '../components/Hero'



function Home() {
  return (
    <>
    <Hero/>
    <Businesses/>
    <div id='aboutUs'>
    <AboutUs/>
    </div>
    <div id='contact'>
    <ContactUs/>
    </div>
    </>
  )
}

export default Home