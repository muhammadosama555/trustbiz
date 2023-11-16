import React from 'react'

function AboutUs() {
  return (
    <div className="about my-10">
        <h1 className="text-5xl text-center">About Us</h1>
        <div className="mx-20 flex gap-10 my-10 items-center justify-center">
            <div className="left rounded-xl bg-cover bg-center  overflow-hidden w-2/3 h-[600px]"
                Style="background-image: url('assets/about.jpeg');">

                <div
                    className="bg-gray-900 z-10 w-full h-full bg-opacity-40 text-white text-center items-center flex justify-around text-5xl ">
                    Our Business</div>

            </div>
            <div className="right w-1/3">
                <p className="text-gray-700 text-lg font-light">Welcome to Trust Biz, where the heartbeat of commerce syncs with the rhythm of community. Founded on the belief that every business has a unique story to tell, Trust Biz is more than a platform; it's a digital canvas for entrepreneurs, dreamers, and doers.In a world buzzing with transactions, we noticed a gap – the need for a platform that not only showcased businesses but celebrated their individuality. Trust Biz was born from the idea that behind every business name is a journey, a passion, and a promise. We envisioned a space where businesses, big or small, could thrive, connect, and contribute to the vibrant tapestry of commerce.We invite you to be a part of the Trust Biz community, where your business is not just a name on a page but a vibrant entity contributing to the mosaic of entrepreneurship. Together, let's redefine success, celebrate uniqueness, and build a legacy that extends far beyond transactions.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs