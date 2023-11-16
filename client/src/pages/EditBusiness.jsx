import React, { useRef, useState } from "react";
import Select from 'react-select';
import { useGetBusinessDetails, useUpdateBusiness, useUpdateBusinessImages } from "../apiCalls/businessApiCalls";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

function EditBusiness() {
  const titleInputElement = useRef();
  const descInputElement = useRef();
  const categoriesInputElement = useRef([]);
  const addressInputElement = useRef();
  const cityInputElement = useRef();
  const countryInputElement = useRef();
  const imagesInputElement = useRef();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {businessId} = useParams()

  const { isLoading: isBusinessLoading, data: businessDetails } =
    useGetBusinessDetails(businessId);

  console.log(businessDetails?.data);
  const {
    mutate: updateBusinessMutate,
    isLoading: isUpdateBusinessLoading,
    isError: isUpdateBusinessError,
    error: updateBusinessError,
  } = useUpdateBusiness();

  const { mutate: updateBusinessImagesMutate, isLoading: isUpdateBusinessImagesLoading, isError: isUpdateBusinessImagesError, error: updateBusinessImagesError, } = useUpdateBusinessImages();


  const handleCategoriesChange = (selectedOptions) => {
    const categoryValues = selectedOptions.map(option => option.value);
    categoriesInputElement.current = categoryValues;
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();


    const data = {
      title: titleInputElement.current.value,
      desc: descInputElement.current.value,
      categories: categoriesInputElement.current,
      address: addressInputElement.current.value,
      city: cityInputElement.current.value,
      country: countryInputElement.current.value,
      businessId: businessId,
    };
    console.log(data)

    updateBusinessMutate(data);
  };

  const handleImagesChange = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('businessId', businessId);
    
    // Append each selected file to FormData
    const files = imagesInputElement.current?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
  
      // Call the mutation function to update business images
      updateBusinessImagesMutate(formData);
    } else {
      // Handle the case where no files are selected
      console.error('No files selected.');
    }
  };
  

  const allCategories = ["Sports","Education","Art","Media"]
  const countryOptions = ["Pakistan", "USA", "UK"];
  const cityOptions = ["Islamabad", "Rawalpindi", "Karachi"];

  const options = allCategories.map(category => ({ value: category, label: category }));

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % businessDetails.data.business.img.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + businessDetails.data.business.img.length) % businessDetails.data.business.img.length);
  };

  return (
    <>
    {isBusinessLoading ? <Loader/> :
    <div className="list-a-business mx-32 mt-10 flex flex-col items-center pb-10">

      <h1 className="w-full text-4xl">Edit a business</h1>

          {/* Carousel and Description Layout */}
    
            {/* Carousel (60% width) */}
            <div className="w-40  relative">
              {/* Previous Button */}
              <button
                className="absolute top-1/2   bg-gray-800 p-2  rounded-full text-white"
                onClick={prevImage}
              >
                &lt;
              </button>

              {/* Image */}
              <img
                src={businessDetails.data.business.img[currentImageIndex].url}
                alt="Business Image"
                className="mx-auto max-w-full h-56 rounded-lg"
              />

              {/* Next Button */}
              <button
                className="absolute top-1/2 right-0 bg-gray-800 p-2 rounded-full text-white"
                onClick={nextImage}
              >
                &gt;
              </button>
            </div>

            {/* File Input for Updating Images */}
          <form >
            <div className="mb-5">
              <label className="text-xl pl-1">
                Update Images
              </label>
              <input
                type="file"
                id="file"
                multiple
                accept="image/*"
                ref={imagesInputElement}
                onChange={handleImagesChange} 
              />
            </div>
            <div className="w-full flex justify-end py-5">
              <button className="text-base text-center font-normal nav-link bg-slate-200 px-6 py-2 rounded-lg btn hover:drop-shadow-sm" type="submit">
                Update Images
              </button>
            </div>
          </form>


          
      


      <form className="mt-14 w-2/3" onSubmit={handleSubmit}>
        <div className="flex gap-10 mb-5">
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="title">
              Title
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="title"
              name="title"
              defaultValue={businessDetails.data.business.title}
              ref={titleInputElement}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="categories">
              Categories
            </label>
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
         
        </div>
        <div className="mb-5">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl pl-1" htmlFor="desc">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              id="desc"
              name="desc"
              defaultValue={businessDetails.data.business.desc}
              ref={descInputElement}
            ></textarea>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl pl-1" htmlFor="address">
              Address
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="address"
              name="address"
              defaultValue={businessDetails.data.business.address}
              ref={addressInputElement}
            />
          </div>
        </div>
        <div className="flex gap-10 mb-5">
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="city">
              City
            </label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50"
              id="city"
              name="city"
              ref={cityInputElement}
            >
              <option value={businessDetails.data.business.city}>{businessDetails.data.business.city}</option>
             
              {cityOptions.map(city => (
                <>
                 {businessDetails.data.business.city !== city && 
                    <option key={city} value={city}>
                      {city}
                    </option> }
                    </>
                  ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="country">
              Country
            </label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50"
              id="country"
              name="country"
              ref={countryInputElement}
            >
               <option value={businessDetails.data.business.country}>{businessDetails.data.business.country}</option>
               {countryOptions.map(country => (
                <>
                 {businessDetails.data.business.country !== country && 
                    <option key={country} value={country}>
                      {country}
                    </option> }
                    </>
                  ))}
            </select>
          </div>
         
        </div>
        <div className="w-full flex justify-end py-5">
          <button className="text-base text-center font-normal nav-link bg-slate-200 px-6 py-2 rounded-lg btn hover:drop-shadow-sm" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
    }
    </>
  );
}

export default EditBusiness;
