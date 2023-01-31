import React, { useState } from "react";
import Business from "./Business";
import { useEffect } from "react";
import { getBusinesses } from "../redux/apiCalls/businessApiCalls";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import Pagination from 'react-js-pagination'
import { useParams } from "react-router-dom";

function Businesses() {
  const [currentPage, setCurrentPage] = useState(1);
  const { businessData, loading, error } = useSelector(
    (state) => state.businessSlice
  );
  const businesses = businessData.business;

  const dispatch = useDispatch();
  const alert = useAlert();
  const {keyword} = useParams();

  useEffect(() => {
    getBusinesses(dispatch,currentPage,keyword);
    if (error) {
      alert.error("My Error");
    }
  }, [dispatch, error, alert, currentPage,keyword]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  let count = businessData.businessCount;
  if (keyword) {
    count = businessData.filteredProductsCount
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="businesses my-10 py-10">
            <h1 className="text-5xl text-center">Featured Businesses</h1>
            <div className="mx-10 mt-10 flex gap-10 items-center justify-center">
              {businesses &&
                businesses.map((business) => (
                  <Business key={business._id} business={business} />
                ))}
            </div>
            {businessData.count <= count && (
              <div className="flex justify-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={businessData.count}
                  totalItemsCount={businessData.businessCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Businesses;
