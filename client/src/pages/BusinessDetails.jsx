import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import { getBusinessesDetails } from "../redux/apiCalls/businessApiCalls";

function BusinessDetails() {
  const { businessDetails, loading } = useSelector(
    (state) => state.businessSlice
  );
  const businessesDetails = businessDetails.business;
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  const dispatch = useDispatch();

  useEffect(() => {
    getBusinessesDetails(dispatch,id);
  }, [dispatch]);
  console.log(businessesDetails);

  return (
    <>
      <div className="hero mx-10 overflow-hidden">
        <div
          className="hero relative rounded-2xl bg-cover bg-center h-[750px]"
          Style="background-image: url('assets/ferrari.jpg');"
        >
          <div className="h-full w-full bg-black absolute z-10 rounded-2xl bg-opacity-40"></div>
          <div className="hero-content text-white z-20 absolute flex w-full items-end justify-between bottom-20 px-14">
            <div className="left flex flex-col gap-4">
              <h1 className="text-5xl font-bold">{businessesDetails.title}</h1>
              <h3 className="text-3xl font-light">{businessesDetails.categories[0]}</h3>
            </div>
            <div className="right flex flex-col gap-3 pr-5 pb-5">
              <h1 className="text-xl font-light">3500 reviews</h1>
              <Rating ratingSize="2xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="description mx-24 my-14 flex">
        <div className="left flex flex-col gap-2">
          <h1 className="text-2xl">Description</h1>
          <p className="text-base font-light pr-8">
           {businessesDetails.desc}
          </p>
        </div>
        <div className="right map-image w-full flex justify-end rounded-xl overflow-hidden">
          <img className="h-64 w-full" src="assets/map.jpg" alt="" />
        </div>
      </div>
      <Reviews />
    </>
  );
}

export default BusinessDetails;
