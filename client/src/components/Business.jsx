import React from 'react'
import {Link} from 'react-router-dom';
import Rating from './Rating';

function Business({business}) {

  return (
    <div
    className="card hover:scale-105 ease-in-out duration-300 w-96 h-[385px] rounded-xl overflow-hidden shadow hover:shadow-lg">
    <Link to = {`/businessdetails/${business._id}`}>
        <img className="h-60 w-96 object-cover" src="assets/Card1.jpg" alt=""/>
        <div className="card-content pl-5 py-5 space-y-1">
            <h2 className="text-4xl font-semibold">{business.title}</h2>
            <h4 className="text-2xl font-medium">{business.categories}</h4>
            <Rating/>
        </div>
    </Link>
</div>
  )
}

export default Business