import React from 'react'
import Review from './Review'

function Reviews() {
  return (
    <div className="reviews mx-24">
        <h1 className="text-2xl pb-5">Reviews</h1>
        <Review/>
        <div className="w-full text-center py-10">
                <button className="text-base text-center nav-link font-normal bg-slate-200 px-5 py-2 rounded-lg  hover:drop-shadow-sm">Load more</button>
        </div>
    </div>
  )
}

export default Reviews