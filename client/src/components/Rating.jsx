import React from "react";

function Rating(props) {
    
  return (
    <div className={`rating text-${props.ratingSize}`}>
      <i className=" text-yellow-400 fa-solid fa-star"></i>
      <i className=" text-yellow-400 fa-solid fa-star"></i>
      <i className=" text-yellow-400 fa-solid fa-star"></i>
      <i className=" text-yellow-400 fa-regular fa-star-half-stroke"></i>
      <i className=" text-yellow-400 fa-regular fa-star"></i>
    </div>
  );
}

export default Rating;
