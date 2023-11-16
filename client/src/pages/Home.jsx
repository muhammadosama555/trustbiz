import React from 'react'
import AboutUs from '../components/AboutUs'
import Businesses from '../components/Businesses'
import Hero from '../components/Hero'



function Home() {
  return (
    <>
    <Hero/>
    <Businesses/>
    <div id="about">
    <AboutUs/>
    </div>
    </>
  )
}

export default Home