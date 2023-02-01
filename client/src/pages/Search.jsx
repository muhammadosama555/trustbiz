import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Business from "../components/Business";
import { getBusinesses } from "../redux/apiCalls/businessApiCalls";
import Pagination from 'react-js-pagination'

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { businessData, loading, error } = useSelector(
    (state) => state.businessSlice
  );
  const businesses = businessData.business;


  const dispatch = useDispatch();

  useEffect(() => {
    getBusinesses(dispatch,currentPage,keyword);
    if (error) {
      alert.error("My Error");
    }
  }, [dispatch, error, currentPage,keyword]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  let count = businessData.businessCount;
console.log(keyword);
  // const averageRating = businesses.reduce((acc,item)=>acc + item.rating, 0)/businesses.length
  // console.log(averageRating);

  return (
    <div className="search-content flex">
      <div className="left w-2/12">
        <div className="filters">
          <h1 className="text-4xl text-center py-3">Filters</h1>
        </div>
        <div className="category pl-6 pb-4 border-t border-gray-200">
          <h1 className="text-2xl py-3">Category</h1>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
          </div>
        </div>
        <div className="rating pl-6 py-4 border-t border-b border-gray-200 flex-col">
          <h1 className="text-2xl pb-3">Rating</h1>

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(5 / 5) * 100}%` }}
            ></div>
          </div>
          <hr />
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(4 / 5) * 100}%` }}
            ></div>
          </div>
          <hr />
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(3 / 5) * 100}%` }}
            ></div>
          </div>
          <hr />
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(2 / 5) * 100}%` }}
            ></div>
          </div>
          <hr />
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(1 / 5) * 100}%` }}
            ></div>
          </div>

          {/* <Rating ratingSize={'2xl'}/> */}
        </div>
        <div className="sort pl-6 py-4">
          <h1 className="text-2xl py-3">Sort</h1>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Category 1</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="right box-border pr-20 pl-10 pt-4 w-5/6">
        <div className="search-bar w-full px-20 flex">
          <input
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Businesses"
            onChange={(e)=>setKeyword(e.target.value)}
          />
        </div>
        <div className="businessCard flex flex-wrap gap-10 justify-center mt-10">
          {businesses && businesses.map((business) => (
            <Business key={business._id} business={business} />
          ))}
        </div>
        {businessData.count <= count && (
              <div className="flex justify-center my-5">
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
    </div>
  );
}

export default Search;
