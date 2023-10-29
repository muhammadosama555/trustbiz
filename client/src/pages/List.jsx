import React, { useRef, useState } from "react";
import { useCreateBusiness } from "../apiCalls/businessApiCalls";
import Select from 'react-select';

function List() {
  const titleInputElement = useRef();
  const descInputElement = useRef();
  const categoriesInputElement = useRef([]);
  const imagesInputElement = useRef(null);
  const addressInputElement = useRef();
  const cityInputElement = useRef();
  const countryInputElement = useRef();
  const [selectedImages, setSelectedImages] = useState([]);

  const { mutate: createBusinessMutate } = useCreateBusiness();

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    imagesInputElement.current = selectedFiles;
    setSelectedImages(selectedFiles); // Update the selected images state
  };

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
      images: selectedImages,
      address: addressInputElement.current.value,
      city: cityInputElement.current.value,
      country: countryInputElement.current.value,
    };
    console.log(data)

    createBusinessMutate(data);
  };

  const allCategories = ["Sports","Education","Art","Media"]

  const options = allCategories.map(category => ({ value: category, label: category }));

  return (
    <div className="list-a-business mx-32 mt-10 flex flex-col items-center pb-10">
      <h1 className="w-full text-4xl">List a business</h1>
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
              placeholder="Vision Tech"
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
              onChange={handleCategoriesChange}
            />
             
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="images">
              Images
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="file"
              id="images"
              name="images"
              multiple // Allows selecting multiple files
              onChange={handleImageChange}
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
              <option value="">select city</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Karachi">Karachi</option>
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
               <option value="">select country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
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
  );
}

export default List;
