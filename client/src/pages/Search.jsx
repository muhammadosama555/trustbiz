import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Business from "../components/Business";
import { getBusinesses } from "../redux/apiCalls/businessApiCalls";
import Pagination from 'react-js-pagination'
import { useAlert } from "react-alert";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [rating,setRating] = useState(0)
  const [cat,setCat] = useState("")
  const { businessData, loading, error } = useSelector(
    (state) => state.businessSlice
  );
  const businesses = businessData.business;


  const dispatch = useDispatch();
  const alert = useAlert()
  useEffect(() => {
    getBusinesses(dispatch,currentPage,keyword,rating,cat,8);
    if (error) {
      alert.error("My Error");
    }
  }, [dispatch, error, currentPage,keyword,rating,cat]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  let count = businessData.filteredBusinessCount;

  const categories = [
    "electronics",
    "garments",
    "food",
  ]
  
console.log(keyword);
 
  // if (keyword) {
  //   count = businessData.filteredBusinessCount
  // }

  return (
    <div className="search-content flex">
      <div className="left w-2/12">
        <div className="filters">
          <h1 className="text-2xl text-center py-3">Filters</h1>
        </div>
        <div className="category pl-6 pb-4 border-t border-gray-200">
          <h1 className="text-xl py-3">Category</h1>
          <div className="flex flex-col gap-2 py-2">
          {categories.map((category)=>(
           <li style={{cursor:'pointer',listStyleType:'none'}} key={category} onClick={()=> setCat(category)}>
            {category}
           </li>
          ))}
          </div>
        </div>
        <div className="rating pl-6 py-4 border-t border-b border-gray-200 flex-col">
          <h1 className="text-xl pb-3">Rating</h1>

          <ul className='pl-0'>
          {[5,4,3,2,1].map((star)=>(
           <li style={{cursor:'pointer',listStyleType:'none'}} key={star} onClick={()=> setRating(star)}>
            <div className='rating-outer'>
              <div className='rating-inner' style={{width: `${star * 20}%`}}>
              </div>
            </div>
           </li>
          ))}
        </ul>

          {/* <Rating ratingSize={'2xl'}/> */}
        </div>
        <div className="sort pl-6 py-4">
          <h1 className="text-xl py-3">Sort</h1>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Name (Ascending)</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Name (Descending)</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Rating (High to Low)</h2>
            </div>
            <div className="flex gap-4 items-center pl-5">
              <input type="checkbox" />
              <h2>Rating (Low to High)</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="right box-border pr-12 pl-4 pt-4 w-5/6">
        <div className="search-bar w-full px-20 flex">
          <input
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Businesses"
            onChange={(e)=>setKeyword(e.target.value)}
          />
        </div>
        <div className="businessCard flex flex-wrap gap-4 justify-center mt-10">
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
