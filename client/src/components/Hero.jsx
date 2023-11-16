import React from "react";


function Hero() {

  return (
    <div
      className="hero relative bg-cover bg-center h-[700px]"
      style={{backgroundImage: `url("assets/Home-bg.jpg")`}}
    >
      <div className="absolute top-24 left-20">
        <h1 className="text-5xl font-normal">
          {" "}
          <span className="font-bold">Trust</span>Biz
        </h1>
        <p className="text-gray-700 text-lg font-light w-2/5 py-3">
        Welcome to Trust Biz, where your business finds its digital home! 🏢✨

In the dynamic landscape of commerce, standing out is key, and Trust Biz is your passport to visibility and success. We understand that your business is more than just a venture; it's a journey built on trust, credibility, and dedication.At Trust Biz, we've created a platform that goes beyond mere listings – it's a community where businesses connect, grow, and thrive. Whether you're a local boutique, a tech startup, or a family-owned restaurant, Trust Biz provides a stage for your story to unfold.
        </p>
       
      </div>
    </div>
  );
}

export default Hero;
