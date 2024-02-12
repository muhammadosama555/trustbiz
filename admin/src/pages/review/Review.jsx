import { useParams } from "react-router-dom";
import "./review.css";
import { Publish } from "@material-ui/icons";
import {
  useGetBusinessDetails,
  useUpdateBusiness,
} from "../../apiCalls/businessApiCalls";
import { useRef, useState } from "react";
import Select from "react-select";
import Loader from "../../components/Loader";
import { useGetReviewDetails, useUpdateReview } from "../../apiCalls/reviewApiCalls";

export default function Review() {
  const titleInputElement = useRef();
  const textInputElement = useRef();
  const ratingInputElement = useRef();

  const { reviewId } = useParams();

  const { isLoading: isReviewLoading, data: reviewDetails } =
    useGetReviewDetails(reviewId);

  console.log(reviewDetails?.data);
  const {
    mutate: updateReviewMutate,
    isLoading: isUpdateReviewLoading,
    isError: isUpdateReviewError,
    error: updateReviewError,
  } = useUpdateReview();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: titleInputElement.current?.value,
      text: textInputElement.current?.value,
      rating: ratingInputElement.current?.value,
      reviewId: reviewId,
    };

    console.log(data);
    updateReviewMutate(data);
  };


  return (
    <>
      {isReviewLoading ? (
        <Loader />
      ) : (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Review</h1>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="productInfoImg"
                />
                <span className="productName"> {reviewDetails.data.data.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">
                    {reviewDetails.data.data._id}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">comment:</span>
                  <span className="productInfoValue">
                    {reviewDetails.data.data.text}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">rating:</span>
                  <span className="productInfoValue">
                    {reviewDetails.data.data.rating}
                  </span>
                </div>
                
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form onSubmit={handleSubmit} className="productForm">
              <div className="productFormLeft">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={reviewDetails.data.data.title}
                  ref={titleInputElement}
                />
                <label>Description</label>
                <input
                  type="text"
                  name="text"
                  defaultValue={reviewDetails.data.data.text}
                  ref={textInputElement}
                />

                <label>rating</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={reviewDetails.data.data.rating}
                  ref={ratingInputElement}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="productUploadImg"
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
