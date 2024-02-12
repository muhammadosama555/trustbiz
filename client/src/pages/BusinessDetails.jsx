import React, { useState } from "react";
import Loader from "../components/Loader";
import { useGetBusinessDetails } from "../apiCalls/businessApiCalls";
import { useParams } from "react-router-dom";
import { usePostReview } from "../apiCalls/reviewApiCalls";
import StarRating from "../components/StarRating";
import { useSelector } from "react-redux";
import moment from 'moment';
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#e79703", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#e79703", borderRadius: "50%"}}
      onClick={onClick}
    />
  );
}


function BusinessDetails() {
 
  const { businessId } = useParams()
  const [displayedReviews, setDisplayedReviews] = useState(3);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {currentUser} = useSelector(state=>state.userSlice)
  const userId = currentUser?.data._id

 
  const { isLoading: isBusinessLoading, data: businessDetails } = useGetBusinessDetails(businessId)
  const { mutate:postReviewMutate, isLoading:isPostReviewLoading, isError:isPostReviewError , error:postReviewError } = usePostReview()

  console.log(businessDetails?.data.business)

 

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

const totalReviews = businessDetails?.data.business?.reviews?.length;

const submitReview = (event) => {
  event.preventDefault();
  const data = {businessId,rating,title,text};
  postReviewMutate(data);
  console.log(data);
  // Reset form fields and hide the review form
  setRating(0);
  setTitle("");
  setText("");
  setReviewFormVisible(false);
};

 // Function to handle "Load more" button click
 const handleLoadMore = () => {
  setDisplayedReviews(totalReviews);
};




const nextImage = () => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % businessDetails.data.business.img.length);
};

const prevImage = () => {
  setCurrentImageIndex((prevIndex) => (prevIndex - 1 + businessDetails.data.business.img.length) % businessDetails.data.business.img.length);
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const fallbackImage = '/assets/avatar.jpg';

  return (
    <>
    {isBusinessLoading ? <Loader/> : (
      <>
 <div className="hero mx-10 overflow-hidden">
        <div
          className="hero relative rounded-2xl bg-cover bg-center h-[750px]"
          style={{backgroundImage: `url(${businessDetails.data.business.img[businessDetails.data.business.img.length-1].url})`}}
        >
          <div className="h-full w-full bg-black absolute z-10 rounded-2xl bg-opacity-40"></div>
          <div className="hero-content text-white z-20 absolute flex w-full items-end justify-between bottom-20 px-14">
            <div className="left flex flex-col gap-4">
              <h1 className="text-5xl font-bold">{businessDetails.data.business.title}</h1>
              <h3 className="text-3xl font-light">{businessDetails.data.business.categories[0]}</h3>
            </div>


            
      {businessDetails.data.business?.reviews.length > 0 ? 

            <div className="right flex flex-col gap-3 pr-5 pb-5">
              <h1 className="text-xl font-light">{businessDetails.data.business.reviews.length} {businessDetails.data.business.reviews.length === 1 ? "review" : "reviews"}</h1>
              <div className="rating-outer">
               <div className="rating-inner" style={{width: `${(businessDetails.data.business.averageRating/5)*100}%`}}></div>
              </div>
            </div> : null }
          </div>
        </div>
      </div>



     {/* Carousel and Description Layout */}
     <div className="flex mx-24 my-14 gap-16">
            {/* Carousel (60% width) */}
            {/* <div className="w-2/3  relative">
       
              <button
                className="absolute top-1/2 left-52  bg-gray-800 p-2  rounded-full text-white"
                onClick={prevImage}
              >
                &lt;
              </button>

       
              <img
                src={businessDetails.data.business.img[currentImageIndex].url}
                alt="Business Image"
                className="mx-auto max-w-full h-96 rounded-lg"
              />

         
              <button
                className="absolute top-1/2 right-52  bg-gray-800 p-2 rounded-full text-white"
                onClick={nextImage}
              >
                &gt;
              </button>
            </div> */}

            <div className="w-2/4  relative ">
                <Slider {...settings}>
                  {businessDetails.data.business.img.map((image, index) => (
                  
                  <img
                  src={image.url}
                  alt={index}
                  className="mx-auto max-w-full h-96 rounded-lg"
                />
                   
                  ))}
                </Slider>
              </div>

            {/* Description (40% width) */}
            <div className="w-1/3 justify-center my-auto">
              <h1 className="text-2xl">Description</h1>
              <p className="text-base font-light">
                {businessDetails.data.business.desc}
              </p>
            </div>
          </div>



      {businessDetails.data.business?.reviews.length > 0 ? 
      <div className="reviews mx-24">
            <h1 className="text-2xl pb-5">Reviews</h1>
            {businessDetails.data.business.reviews.slice(0, displayedReviews).map((review) => (
              <div className="review-card flex gap-5 border-b pb-5 border-slate-200" key={review._id}>
                <div className="w-16 h-16 bg-gray-200 rounded-full"  
                style={{
                          backgroundImage: `url("${review.user.imgUrl}"), url("${fallbackImage}")`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}></div>
                <div className="flex flex-grow flex-col">
                  <div className="flex justify-between">
                    <h1 className="text-lg">{review.title}</h1>
                    <h2 className="text-gray-300 text-sm">{moment(review.createdAt).format('MMMM Do YYYY, h:mm a')}</h2>
                  </div>
                  <p className="font-light text-gray-600 pt-2">{review.text}</p>
                  <div className="rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            ))}
             {totalReviews > 3 && displayedReviews < totalReviews ? (
            <div className="w-full text-center py-10">
              <button onClick={handleLoadMore} className="text-base text-center nav-link font-normal bg-slate-200 px-5 py-2 rounded-lg  hover:drop-shadow-sm">
                Load more
              </button>
            </div>):null}
          </div>:null }

            {/* Review submission form */}
            {isReviewFormVisible ? (
            <div className="review-form mx-24">
              <h1 className="text-2xl pb-5">Submit a Review</h1>
              <form onSubmit={submitReview}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Review Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Review:</label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Your Review"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <button type="submit" className="text-base text-center nav-link font-normal bg-slate-200 px-5 py-2 rounded-lg hover:drop-shadow-sm">
                    {isPostReviewLoading ? "Submitting" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          ) : businessDetails?.data.business.owner !== userId && userId  ? (
            <div className="w-full text-center py-5">
              <button onClick={() => setReviewFormVisible(true)} className="text-base text-center nav-link font-normal bg-slate-200 px-5 py-2 rounded-lg hover:drop-shadow-sm">
                Write a Review
              </button>
            </div>
          ): null}
      </>
    )}
    </>
  );
}

export default BusinessDetails;
