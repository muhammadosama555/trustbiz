import { useParams } from "react-router-dom";
import "./business.css";
import { Publish } from "@material-ui/icons";
import {
  useGetBusinessDetails,
  useUpdateBusiness,
} from "../../apiCalls/businessApiCalls";
import { useRef, useState } from "react";
import Select from "react-select";
import Loader from "../../components/Loader";

export default function Business() {
  const titleInputElement = useRef();
  const descInputElement = useRef();
  const addressInputElement = useRef();
  const cityInputElement = useRef();
  const countryInputElement = useRef();
  const categoriesInputElement = useRef([]);

  const { businessId } = useParams();

  const { isLoading: isBusinessLoading, data: businessDetails } =
    useGetBusinessDetails(businessId);

  console.log(businessDetails?.data);
  const {
    mutate: updateBusinessMutate,
    isLoading: isUpdateBusinessLoading,
    isError: isUpdateBusinessError,
    error: updateBusinessError,
  } = useUpdateBusiness();

  const handleCategoriesChange = (selectedOptions) => {
    const categoryValues = selectedOptions.map((option) => option.value);
    categoriesInputElement.current = categoryValues;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title: titleInputElement.current?.value,
      desc: descInputElement.current?.value,
      address: addressInputElement.current?.value,
      city: cityInputElement.current?.value,
      country: countryInputElement.current?.value,
      categories: categoriesInputElement.current,
      businessId: businessId,
    };

    console.log(data);
    updateBusinessMutate(data);
  };

  const allCategories = ["Sports", "Education", "Art", "Media"];

  const options = allCategories.map((category) => ({
    value: category,
    label: category,
  }));



  return (
    <>
      {isBusinessLoading ? (
        <Loader />
      ) : (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Business</h1>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <img
                  src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="productInfoImg"
                />
                <span className="productName"> {businessDetails.data.business.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">
                    {businessDetails.data.business._id}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">description:</span>
                  <span className="productInfoValue">
                    {businessDetails.data.business.desc}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">address:</span>
                  <span className="productInfoValue">
                    {businessDetails.data.business.address}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">city:</span>
                  <span className="productInfoValue">
                    {businessDetails.data.business.city}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">country:</span>
                  <span className="productInfoValue">
                    {businessDetails.data.business.country}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">categories:</span>
                  <span className="productInfoValue">
                  {businessDetails.data.business.categories.join(', ')}
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
                  defaultValue={businessDetails.data.business.title}
                  ref={titleInputElement}
                />
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  defaultValue={businessDetails.data.business.desc}
                  ref={descInputElement}
                />

                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={businessDetails.data.business.address}
                  ref={addressInputElement}
                />

                <label>City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={businessDetails.data.business.city}
                  ref={cityInputElement}
                />

                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  defaultValue={businessDetails.data.business.country}
                  ref={countryInputElement}
                />

                <label>Categories</label>
                <Select
                  isMulti
                  name="categories"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  defaultValue={businessDetails.data.business.categories.map((category) => ({ value: category, label: category }))}
                  onChange={handleCategoriesChange}
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
