import React, { useState } from "react";
import Business from "../components/Business";
import Loader from "../components/Loader";
import { useGetBusinesses } from "../apiCalls/businessApiCalls";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("5");
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [maxRating, setMaxRating] = useState(5)
  

  const { isLoading, data } = useGetBusinesses(currentPage, limit, search, categories, sortBy, maxRating);
  console.log(data?.data)

  const handleCategoriesSelection = (selectedCategory) => {
    // Check if the selectedCategory is already in the categories array
    if (categories.includes(selectedCategory)) {
      // If it is, remove it
      setCategories(categories.filter((category) => category !== selectedCategory));
    } else {
      // If it's not, add it
      setCategories([...categories, selectedCategory]);
    }
 
  };

  const handleSortBySelection = (selectedSortBy) => {
    setSortBy(selectedSortBy);
 
  };

  const handleMaxRating = (selectedRating) => {
    setMaxRating(selectedRating)
  }

  const handleClearFilters = () => {
    setSearch("");
    setSortBy("");
    setCurrentPage(1);
    setCategories([])
  };

  return (
    <div className="search-content flex">
      <div className="left w-2/12">
      <div className="filters">
            <h1 className="text-4xl text-center py-3">Filters</h1>
          </div>
          <div className="category pl-6 pb-4 border-t border-gray-200">
            <h1 className="text-2xl py-3">Category</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Sports")} 
                  onChange={() => handleCategoriesSelection("Sports")}
                   />
                <label for="text">Sports</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Education")} 
                  onChange={() => handleCategoriesSelection("Education")}
                  />
                <label for="text">Education</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Art")} 
                  onChange={() => handleCategoriesSelection("Art")}
                  />
                <label for="text">Art</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Media")} 
                  onChange={() => handleCategoriesSelection("Media")}
                  />
                <label for="text">Media</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Entertainment")} 
                  onChange={() => handleCategoriesSelection("Entertainment")}
                  />
                <label for="text">Entertainment</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Fashion")} 
                  onChange={() => handleCategoriesSelection("Fashion")}
                  />
                <label for="text">Fashion</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Athletics")} 
                  onChange={() => handleCategoriesSelection("Athletics")}
                  />
                <label for="text">Athletics</label>
              </div>
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  checked={categories.includes("Food")} 
                  onChange={() => handleCategoriesSelection("Food")}
                  />
                <label for="text">Food</label>
              </div>
            </div>
          </div>
          <div className="rating pl-6 py-4 border-t border-b border-gray-200">
            <h1 className="text-2xl pb-3">Rating</h1>
            <div className="rating 5" onClick={()=>handleMaxRating(5)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i> 
            </div>
            <div className="rating 4"  onClick={()=>handleMaxRating(4)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 3"  onClick={()=>handleMaxRating(3)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 2"  onClick={()=>handleMaxRating(2)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
            <div className="rating 1"  onClick={()=>handleMaxRating(1)}>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-solid fa-star"></i>
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
              <i className="text-2xl cursor-pointer text-yellow-400 fa-regular fa-star"></i> 
            </div>
          </div>
          <div className="sort pl-6 py-4">
            <h1 className="text-2xl py-3">Sort</h1>
            <div className="flex flex-col gap-2 py-2 pl-4">
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sortBy}
                  checked={sortBy === "title"}
                  onChange={() => handleSortBySelection("title")}
                   />
                <label for="text">Alphabetically, A-Z</label>
              </div>
             
              <div className="flex gap-3">
                <input
                 className="w-4"
                  type="checkbox"
                  value={sortBy}
                  checked={sortBy === "-title"}
                  onChange={() => handleSortBySelection("-title")}
                   />
                <label for="text">Alphabetically, Z-A</label>
              </div>
              <button
            onClick={handleClearFilters}
              className="mt-1 px-4 py-2 font-base tracking-wide hover:scale-105 transition-all bg-white btn-shadow hover:shadow-custom hover:bg-stone-50 border border-gray-100 rounded-lg"
            >
              Clear
            </button>
            </div>
          </div>
      </div>
      <div className="right box-border pr-12 pl-4 pt-4 w-5/6">
        <div className="search-bar w-full px-20 flex">
          <input
            className="px-6 py-3 w-full text-lg bg-slate-100 rounded-full "
            type="text"
            placeholder="Search for Businesses"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoading ? (
        <Loader />
      ) : (
        <>
        <div className="businessCard flex flex-wrap gap-4 justify-center mt-10">
          {
                data?.data?.businesses.map((business) => (
                  <Business key={business._id} business={business} />
                ))}
        </div>
       
               {data.data.pagination ? 
                  <div>
                    {data.data.pagination.previous && (
                      <button
                        onClick={() =>
                          setCurrentPage(data.data.pagination.previous?.page)
                        }
                      >
                        previous
                      </button>
                    )}
                    <div>{currentPage}</div>
                    {data.data.pagination.next && (
                      <button
                        onClick={() =>
                          setCurrentPage(data.data.pagination.next?.page)
                        }
                      >
                        next
                      </button>
                    )}
                  </div>:null}
                  </>)}
             
      </div>
    </div>
  );
}

export default Search;
