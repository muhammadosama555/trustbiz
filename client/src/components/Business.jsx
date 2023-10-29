import React from "react";
import { Link } from "react-router-dom";

function Business({ business }) {


  return (
    //<div className="card hover:scale-105 ease-in-out duration-300 w-56 h-[300px] border border-gray-100 rounded-xl p-2 shadow hover:shadow-lg">
      <Link to={`/businessdetails/${business._id}`} className="relative card hover:scale-105 ease-in-out duration-300 w-56 h-[300px] border border-gray-100 rounded-xl p-2 shadow hover:shadow-lg">
        <div className="w-full h-1/2 overflow-hidden rounded-lg">
          <img className="object-cover" src={business.img[0]?.url} alt="" />
        </div>
        <div className="card-content space-y-1 bottom-4 absolute">
          <h2 className="text-xl font-semibold">{business.title}</h2>
          <h4 className="text-lg font-medium">{business.categories[0]}</h4>
          {business.averageRating > 0 ?
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(business.averageRating / 5) * 100}%` }}
            ></div>
          </div>:null}
        </div>
      </Link>
    //</div>
  );
}

export default Business;
