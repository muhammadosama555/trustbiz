import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Business from '../components/Business'
import { getBusinesses } from '../redux/apiCalls/businessApiCalls';

function Search() {

    const { businessData } = useSelector(
        (state) => state.businessSlice
      );
      const businesses = businessData.business;
    
      const dispatch = useDispatch();
    
      useEffect(() => {
        getBusinesses(dispatch);
      }, [dispatch]);
    
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
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                </div>
            </div>
            <div className="rating pl-6 py-4 border-t border-b border-gray-200 flex-col">
                <h1 className="text-2xl pb-3">Rating</h1>
                
                    <div className="rating-outer">
                   <div className="rating-inner" style={{width: `${(5/5)*100}%`}}></div>
                   </div>
                   <hr/>
                    <div className="rating-outer">
                   <div className="rating-inner" style={{width: `${(4/5)*100}%`}}></div>
                   </div>
                   <hr/>
                    <div className="rating-outer">
                   <div className="rating-inner" style={{width: `${(3/5)*100}%`}}></div>
                   </div>
                   <hr/>
                    <div className="rating-outer">
                   <div className="rating-inner" style={{width: `${(2/5)*100}%`}}></div>
                   </div>
                   <hr/>
                    <div className="rating-outer">
                   <div className="rating-inner" style={{width: `${(1/5)*100}%`}}></div>
                   </div>
             
                {/* <Rating ratingSize={'2xl'}/> */}
            </div>
            <div className="sort pl-6 py-4">
                <h1 className="text-2xl py-3">Sort</h1>
                <div className="flex flex-col gap-2 py-2">
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                    <div className="flex gap-4 items-center pl-5"><input type="checkbox"/>
                        <h2>Category 1</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="right box-border pr-20 pl-10 pt-4 w-5/6">
            <div className="search-bar w-full px-20 flex">
                <input className="px-6 py-3 w-full text-lg bg-slate-100 rounded-l-full " type="text"
                    placeholder="Search for Businesses" />
                    <button className="px-6 py-3 text-lg bg-slate-100 rounded-r-full "><i className="text-gray-400 hover:text-gray-600 fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="businessCard flex flex-wrap gap-10 justify-center mt-10">
            {businesses.map((business)=>(
                <Business key={business._id} business={business} />
                ))}
            </div>
            <div className="w-full text-center py-10">
                <button className="text-base text-center nav-link font-normal bg-slate-200 px-5 py-2 rounded-lg  hover:drop-shadow-sm">Load more</button>
            </div>
        </div>
    </div>
  )
}

export default Search