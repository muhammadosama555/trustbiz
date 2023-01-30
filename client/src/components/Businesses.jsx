import React from "react";
import Business from "./Business";
import { useEffect } from "react";
import { getBusinesses } from "../redux/apiCalls/businessApiCalls";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

function Businesses() {
  const { businessData, loading } = useSelector(
    (state) => state.businessSlice
  );
  const businesses = businessData.business;

  const dispatch = useDispatch();

  useEffect(() => {
    getBusinesses(dispatch);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="businesses my-10 py-10">
            <h1 className="text-5xl text-center">Featured Businesses</h1>
            <div className="mx-10 mt-10 flex gap-10 items-center justify-center">
              {businesses.map((business) => (
                <Business key={business._id} business={business} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Businesses;
