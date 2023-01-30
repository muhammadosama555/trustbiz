import React from 'react'
import Rating from './Rating'

function Review() {
  return (
    <div className="review-card flex gap-5 border-b pb-5 border-slate-200">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex flex-grow flex-col">
                <div className="flex justify-between "><h1 className="text-lg">Lorem Impsum</h1><h2 className="text-gray-300 text-sm">01:20 AM  24/08/2020 </h2></div>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
                <Rating/>
                <p className="font-light text-gray-600 pt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni dolorum sed obcaecati esse assumenda, veritatis voluptate mollitia perferendis aliquam quia?</p>
            </div>
        </div>
  )
}

export default Review