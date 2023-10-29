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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          vero ipsam tempora delectus obcaecati ex quis magni voluptate
          eligendi. Dignissimos sit et ut maiores. Possimus nisi illo sit neque
          quibusdam Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          ducimus alias odio corporis voluptatem doloribus nostrum culpa
          quibusdam sequi beatae. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Voluptatem, sed! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sint voluptatem, dolorum doloribus
          impedit adipisci natus?
        </p>
       
      </div>
    </div>
  );
}

export default Hero;
