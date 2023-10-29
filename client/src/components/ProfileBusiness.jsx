import React from 'react'
import { Link } from 'react-router-dom'

function ProfileBusiness({business}) {

  // Function to render stars based on the rating
const renderStars = (rating) => {
  const starCount = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i className="fas fa-star text-yellow-500" key={i}></i>);
  }

  if (halfStar) {
    stars.push(<i className="fas fa-star-half-alt text-yellow-500" key="half"></i>);
  }

  const emptyStars = starCount - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i className="far fa-star text-yellow-500" key={`empty-${i}`}></i>);
  }

  return stars;
};

  return (
    <div className="card flex h-60 relative shadow rounded-xl overflow-hidden">
    <div
      className="contact rounded-l-lg bg-cover w-56 h-60 "
      Style="background-image: url('assets/profile1.jpg');"
    ></div>
    <div className="flex flex-col pl-10">
      <div className="desc">
        <h1 className="title text-3xl pt-6 font-medium">{business.title}</h1>
        <h3 className="category pt-3">{business.categories[0]}</h3>
        <h3 className="address pt-1">{business.address}</h3>
        {business.averageRating > 0 ?
        <div className="rating">
           {renderStars(business.averageRating)}
        </div>:null}
      </div>
      
    </div>
    <div className="buttons right-10 absolute bottom-4 flex gap-5">
    <Link to={`/editBusiness/${business._id}`}>
      <button className="text-base text-center  font-normal nav-link px-10 py-2 rounded-lg bg-[#EEF6FF] hover:drop-shadow-sm">
        Edit
      </button>
      </Link>
      <Link to={`/businessdetails/${business._id}`}>
      <button className="text-base text-center  font-normal nav-link px-6 py-2 rounded-lg btn hover:drop-shadow-sm">
        Preview
      </button>
      </Link>
    </div>
  </div>
  )
}

export default ProfileBusiness